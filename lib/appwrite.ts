
"use server";
import { Client, Account, Databases, Users } from "node-appwrite";
import { cookies } from "next/headers";


//  create the Appwrite Regular Client and set the project ID and endpoint
export async function createSessionClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!);

  const session = cookies().get("appwrite-session");
  if (!session || !session.value) {
    throw new Error("No session");
  }

  client.setSession(session.value);

  return {
    get account() {
      return new Account(client);
    },
  };
}


// create the Appwrite Admin Client and set the project ID, endpoint and API Key
export async function createAdminClient() {
  const client = new Client()
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)
    .setKey(process.env.APPWRITE_SECRET!);

  return {
    get account() {
      return new Account(client);
    },
    get database() {
        return new Databases(client);
    },
    get user() {
        return new Users(client);
    }
  };
}
