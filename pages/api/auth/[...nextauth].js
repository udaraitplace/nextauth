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
        const res = await fetch("http://127.0.0.1:8000/api/login", {
          method: "POST",
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const user = await res.json();
        await console.log(user);

        if (res.ok && user) {
          return user;
        }
        return null;
      },
    }),
  ],
};

export default NextAuth(authOptions);
