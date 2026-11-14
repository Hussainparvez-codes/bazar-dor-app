import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.DATABASE_URI);
const db = client.db("better-auth-db");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL,

  trustedOrigins: [
    "http://localhost:3000",
    "https://bazar-dor-app001.vercel.app",
  ],

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },

    github: {
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
    },
  },

  database: mongodbAdapter(db, {
    client,
  }),
});
// import { betterAuth } from "better-auth";
// import { MongoClient } from "mongodb";
// import { mongodbAdapter } from "@better-auth/mongo-adapter";

// const client = new MongoClient(process.env.DATABASE_URI,);
// const db = client.db("better-auth-db");

// export const auth = betterAuth(
//     {
//   //...other options
//   emailAndPassword: { 
//     enabled: true, 
//     autosignin: false,
//   },
//       socialProviders: {
//         google: { 
//             clientId: process.env.GOOGLE_CLIENT_ID , 
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET , 
//         }, 
//         github: { 
//             clientId: process.env.GITHUB_CLIENT_ID , 
//             clientSecret: process.env.GITHUB_CLIENT_SECRET, 
//         }, 
//     },

//   database: mongodbAdapter(db, {
//     client,
//   }),
// })