"use client"

import WebApp from "@twa-dev/sdk";
import { useEffect, useState } from "react";

interface UserData {
  id: number;
  first_name: string;
  last_name?: string;
  username?: string;
  language_code: string;
  is_premium?: boolean;
}

export default function Home() {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // چک کردن اینکه آیا در محیط مرورگر هستیم
    if (typeof window !== 'undefined' && WebApp.initDataUnsafe.user) {
      setUserData(WebApp.initDataUnsafe.user as UserData);
    }
  }, []);

  return (
    <main className="p-4">
      {
        userData ? (
          <>
            <h1 className="text-2xl font-bold mb-40">User  Data</h1>
            <ul>
              <li>ID: {userData.id}</li>
              <li>First Name: {userData.first_name}</li>
              <li>Last Name: {userData.last_name}</li>
              <li>username: {userData.username}</li>
              <li>is_premium: {userData.is_premium}</li>
              <li>language_code: {userData.language_code}</li>
            </ul>
          </>
        ) : (
          <div>Loading...</div>
        )
      }
    </main>
  );
};
