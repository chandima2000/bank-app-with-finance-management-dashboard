// Server side rendering
// Server actions

"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { encryptId, extractCustomerIdFromUrl, parseStringify } from "../utils";
import { redirect } from "next/navigation";
import { CountryCode, ProcessorTokenCreateRequest, ProcessorTokenCreateRequestProcessorEnum, Products } from "plaid";
import { plaidClient } from "../plaid";
import { revalidatePath } from "next/cache";
import { addFundingSource, createDwollaCustomer } from "./dwolla.actions";


// Environment Variables

const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USER_COLLECTION_ID: USER_COLLECTION_ID,
  APPWRITE_BANK_COLLECTION_ID: BANK_COLLECTION_ID,
} = process.env;


// Type Alias
declare type SignUpParams = {
  firstName: string;  //Make Optional
  lastName: string;
  address: string;
  city: string;
  state: string;
  postalCode: string;
  dateOfBirth: string;
  ssn: string;
  email: string;
  password: string;
};

//  Interface
declare interface signInProps {
  email: string;
  password: string;
}

declare interface createBankAccountProps {
  accessToken: string;
  userId: string;
  accountId: string;
  bankId: string;
  fundingSourceUrl: string;
  shareableId: string;
}



export const signIn = async ({email,password} : signInProps) => {
  try {
    // Mutation , Database , Fetch

    // Extract the account from the "createAdminClient"
    const { account } = await createAdminClient();

    const session = await account.createEmailPasswordSession(email, password);

    // Get the response in JSON format
    const response = await parseStringify(session)

    // send response to the client
    return response;

  } catch (error) {
    console.log("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {

  let newUserAccount;

  const {email, password, firstName, lastName} = userData;

  try {

    // Extract the account from the "createAdminClient"
    const { account, database } = await createAdminClient();

    // create a new user account
    newUserAccount =  await account.create(ID.unique(), 
      email, 
      password,
      `${firstName} ${lastName}`
    );

    if(!newUserAccount) throw new Error("Error, while creating user!")
    
      const dwollaCustomerUrl = await createDwollaCustomer({
        ...userData,
        type: 'personal',
        address1: ""
      })
  
      if(!dwollaCustomerUrl) throw new Error('Error, while creating Dwolla customer')
  
      const dwollaCustomerId = extractCustomerIdFromUrl(dwollaCustomerUrl);
  
      const newUser = await database.createDocument(
        DATABASE_ID!,
        USER_COLLECTION_ID!,
        ID.unique(),
        {
          ...userData,
          userId: newUserAccount.$id,
          dwollaCustomerId,
          dwollaCustomerUrl
        }
      )

      
    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUser);

  } catch (error) {
    console.log("Error", error);
  }
};

// A utility function to get the logged in user from Appwrite
export async function getLoggedInUser() {
  try {

    // Extract the account from the "createSessionClient"
    const { account } = await createSessionClient();

    const user = await account.get();
    return parseStringify(user)

  } catch (error) {
    return null;
  }
}

// Logout Account Function (read Appwrite Documentation, SSR section)
export const logoutAccount = async () => {

    try {
      const { account } = await createSessionClient();
      cookies().delete("appwrite-session");
      await account.deleteSession("current");
      redirect("/sign-up")

    } catch (error) {
      console.log("Error",error)
    }
}

// Create a Token for Plaid
export const createLinkToken = async (user: User) => {
  try {
    const tokenParams = {
      user: {
        client_user_id: user.$id
      },
      client_name: `${user.firstName} ${user.lastName}`,
      products: ['auth'] as Products[],
      language: 'en',
      country_codes: ['US'] as CountryCode[],
    }

    const response = await plaidClient.linkTokenCreate(tokenParams);

    return parseStringify({ linkToken: response.data.link_token })
  } catch (error) {
    console.log(error);
  }
}



export const exchangePublicToken = async ({
  publicToken,
  user,
}: exchangePublicTokenProps) => {
  try {
       // Exchange public token for access token and item ID
      const response = await plaidClient.itemPublicTokenExchange({
      public_token: publicToken,
    });

    const accessToken = response.data.access_token;
    const itemId = response.data.item_id;
    
    // Get account information from Plaid using the access token
    const accountsResponse = await plaidClient.accountsGet({
      access_token: accessToken,
    });

    const accountData = accountsResponse.data.accounts[0];

    // Create a processor token for Dwolla using the access token and account ID
    const request: ProcessorTokenCreateRequest = {
      access_token: accessToken,
      account_id: accountData.account_id,
      processor: "dwolla" as ProcessorTokenCreateRequestProcessorEnum,
    };

    const processorTokenResponse = await plaidClient.processorTokenCreate(request);
    const processorToken = processorTokenResponse.data.processor_token;

     // Create a funding source URL for the account using the Dwolla customer ID, processor token, and bank name
     const fundingSourceUrl = await addFundingSource({
      dwollaCustomerId: user.dwollaCustomerId,
      processorToken,
      bankName: accountData.name,
    });

      // If the funding source URL is not created, throw an error
      if (!fundingSourceUrl) throw Error;

      // Create a bank account using the user ID, item ID, account ID, access token, funding source URL, and shareableId ID
      await createBankAccount({
        userId: user.$id,
        bankId: itemId,
        accountId: accountData.account_id,
        accessToken,
        fundingSourceUrl,
        shareableId: encryptId(accountData.account_id),
      });
  
      // Revalidate the path to reflect the changes
      revalidatePath("/");
  
      // Return a success message
      return parseStringify({
        publicTokenExchange: "complete",
      });

  } catch (error) {
    console.log("An error occurred while creating exchanging-token.", error)
  }
}



export const createBankAccount = async ({
  userId,
  bankId,
  accountId,
  accessToken,
  fundingSourceUrl,
  shareableId,
}: createBankAccountProps) => {
  try {
    const { database } = await createAdminClient();

    const bankAccount = await database.createDocument(
      DATABASE_ID!,
      BANK_COLLECTION_ID!,
      ID.unique(),
      {
        userId,
        bankId,
        accountId,
        accessToken,
        fundingSourceUrl,
        shareableId,
      }
    )

    return parseStringify(bankAccount);
  } catch (error) {
    console.log(error);
  }
}