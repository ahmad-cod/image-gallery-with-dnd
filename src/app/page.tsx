"use client";

import { useContext } from "react";
import { UserContext } from "./(userContext)/user";
import ImagesGallery from "./(components)/ImagesGallery";
import Header from "./(components)/Header";
import Login from "./login/page";
import Signup from "./signup/page";

export default function Home() {
  //@ts-ignore
  const { user } = useContext(UserContext);

  return (
    <main className=''>
      {user ? (
        <>
          <ImagesGallery />
        </>
      ) : (
        <>
          <Login />
          <Signup />
        </>
      )}
    </main>
  );
}
