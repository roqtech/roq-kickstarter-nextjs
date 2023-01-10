import NextAuth, { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { serverConfig } from "config/server.config";
import * as bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { roqClient } from "server/roq";

import { prisma } from "server/db";

export const authOptions: NextAuthOptions = {
  secret: serverConfig.nextAuth.secret,
  session: serverConfig.nextAuth.session,
  jwt: serverConfig.nextAuth.jwt,
  pages: {
    signIn: "/login",
    error: "/login",
  },
  callbacks: {
    async jwt({ token, user }) {
      // Check if we have a valid roq accessToken
      let { roqAccessToken } = token;
      let shouldRefreshRoqToken = false;

      // No ROQ token, create a new one
      if (!!!roqAccessToken) {
        shouldRefreshRoqToken = true;
      } else {
        // Expired ROQ token, create a new one
        const tokenJson = jwt.decode(roqAccessToken as string) as any;
        if (tokenJson.exp * 1000 <= Date.now()) {
          shouldRefreshRoqToken = true;
        }
      }

      // Create a new ROQ token
      if (shouldRefreshRoqToken) {
        const user = await prisma.user.findFirst({
          where: { id: token.id },
        });

        const roqAccessToken = await roqClient.authorization.createUserToken(
          user.roqUserId
        );

        // Add the ROQ Access token into the jwt generated for your application,
        // so that it can be read easily on the frontend
        token.roqAccessToken = roqAccessToken;
      }

      // On Sign in, add the user's name to the token for use in the client
      if (token && user) {
        let tokenData = {
          ...token,
          id: user.id,
          name: user.name,
          roqAccessToken,
        };
        return tokenData;
      }

      return token;
    },

    session({ session, token }) {
      session.user = token;
      return session;
    },
  },
  providers: [
    CredentialsProvider({
      id: "password",
      credentials: {
        email: { type: "email" },
        password: { type: "password" },
      },
      authorize: async ({ email, password }) => {
        const user = await prisma.user.findFirst({
          where: { email: email },
        });

        if (!user) {
          throw new Error("User not found");
        }

        const isPasswordValid = bcrypt.compareSync(password, user.password);

        if (!isPasswordValid) {
          throw new Error("Invalid credentials");
        }

        delete user.password;
        return user;
      },
    }),
  ],
};
export default NextAuth(authOptions);
