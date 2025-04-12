
import { loginUser } from "@/app/actions/auth/loginUser";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import dbConnect, { collectionNameObj } from "./dbConnect";
import { Account, User } from "next-auth";

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text", placeholder: "Enter your email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are missing");
        }

        const result = await loginUser(credentials);
        console.log("Login result:", result); // Keep your logging for debugging

        if (result.error) {
          throw new Error(result.error); // Throw specific error (e.g., "Account is locked")
        }

        if (result) {
          return {
            id: result.id || "", // Ensure id is always a string
            name: result.name,
            email: result.email,
            image: result.image,
          };
        }

        return null; // No user found or invalid credentials
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login", // Redirect to login page to display errors
  },
  callbacks: {
    async signIn({ user, account }: { user: User; account: Account | null }) {
      if (!user.email) {
        return false; // Prevent sign-in if email is missing
      }

      if (account?.provider !== "credentials") {
        // Handle social logins (Google, GitHub)
        const userCollection = dbConnect(collectionNameObj.userCollection);
        const isExisted = await userCollection.findOne({
          providerAccountId: account?.providerAccountId,
        });

        if (!isExisted) {
          await userCollection.insertOne({
            providerAccountId: account?.providerAccountId,
            provider: account?.provider,
            email: user.email,
            image: user.image,
            name: user.name,
            failedLoginAttempts: 0, // Initialize lockout fields
            loginAction: "unblock",
            lastFailedLogin: null,
          });
        }
      }

      return true; // Allow sign-in
    },
  },
};