"use client";
import Link from "next/link";
import { useSession, signIn, signOut } from "next-auth/react";

function AuthButton() {
  const { data: session } = useSession();
  console.log(session);

  if (session) {
    return (
      <>
      <h1>hi {session?.user?.name}</h1>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}

export default function NavMenu(){
    return(
        <div>
            <AuthButton/>
        </div>
    );
}
