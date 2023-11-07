import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: "350c8a6939f4675a7fa7",
      clientSecret: "faafbdb8ff02f7c1a9bb890c4a82369ab26a7cc5",
    }),

    CredentialsProvider({
      name: "Credentials",

      credentials: {
        username: {
          label: "Username",
          type: "text",
          placeholder: "Enter Username...",
        },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter Password...",
        },
      },
      async authorize(credentials, req) {
        const response = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });

        if (response.ok) {
          const res = await response.json();
          console.log(res);

          return res;
        } else {
          console.log("HTTP error! Status:", response.status);
          // Handle non-successful response here, return an appropriate JSON response.
          return { error: "Authentication failed" };
        }
        return null;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, account, user }) {
      if (user) {
        token.user = user;
        token.accessToken = user.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.access_token;
      session.user = token.user;
      return session;
    },
  },
};

export default NextAuth(authOptions);
