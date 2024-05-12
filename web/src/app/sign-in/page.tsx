"use client";

import LogoScreen from "@/components/LogoScreen";
import SignInForm from "./components/SignInForm";

export default function SignInPage() {
  return (
    <div className="flex flex-row w-screen h-screen">
      <LogoScreen />
      <SignInForm />
    </div>
  );
}
