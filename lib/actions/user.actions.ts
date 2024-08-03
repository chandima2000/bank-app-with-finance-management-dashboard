"use server";

import { ID } from "node-appwrite";
import { createAdminClient, createSessionClient } from "../appwrite";
import { cookies } from "next/headers";
import { parseStringify } from "../utils";

declare type SignUpParams = {
  firstName?: string;  //Make Optional
  lastName?: string;
  address?: string;
  city?: string;
  state?: string;
  postalCode?: string;
  dateOfBirth?: string;
  ssn?: string;
  email: string;
  password: string;
};

export const signIn = async () => {
  try {
    // Mutation , Database , Fetch
  } catch (error) {
    console.log("Error", error);
  }
};

export const signUp = async (userData: SignUpParams) => {

  const {email, password, firstName, lastName} = userData;

  try {

    // Extract the account from the "createAdminClient"
    const { account } = await createAdminClient();
    
    // create a new user account
    const newUserAccount =  await account.create(ID.unique(), 
      email, 
      password,
      `${firstName} ${lastName}`
    );

    const session = await account.createEmailPasswordSession(email, password);

    cookies().set("appwrite-session", session.secret, {
      path: "/",
      httpOnly: true,
      sameSite: "strict",
      secure: true,
    });

    return parseStringify(newUserAccount);

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
