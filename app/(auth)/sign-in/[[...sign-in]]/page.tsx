import { SignIn, ClerkLoaded, ClerkLoading } from "@clerk/nextjs";
import { Loader2 } from "lucide-react";
import Image from "next/image";

export default function Page() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#023e8a] to-[#03045e]">
      <div className="bg-white p-8 rounded-xl shadow-2xl">
        <div className="flex justify-center mb-6">
          <Image src="/logo.svg" alt="Logo" width={100} height={100} />
        </div>
        <h1 className="text-4xl font-bold text-gray-800 text-center mb-4">
          Welcome Back!
        </h1>
        <p className="text-lg text-gray-600 text-center mb-8">
          Log in or create an account to get back to your dashboard!
        </p>
        <div className="flex justify-center">
          <ClerkLoaded>
            <SignIn path="/sign-in" />
          </ClerkLoaded>
          <ClerkLoading>
            <Loader2 className="animate-spin text-gray-500 mx-auto" />
          </ClerkLoading>
        </div>
      </div>
    </div>
  );
}
