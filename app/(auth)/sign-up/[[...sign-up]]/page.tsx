import { SignUp, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#023e8a] to-[#03045e] overflow-hidden">
      <div className="bg-white p-4 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-4">
          <Image src="/logo.svg" alt="Logo" width={80} height={80} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-2">
          Welcome Back!
        </h1>
        <p className="text-lg text-gray-600 text-center mb-4">
          Log in or create an account to get back to your dashboard!
        </p>
        <div className="flex justify-center">
          <ClerkLoaded>
            <SignUp path="/sign-up" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-gray-500 mx-auto" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}
