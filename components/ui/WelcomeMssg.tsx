"use client"

import { useUser } from "@clerk/nextjs";


const WelcomeMssg = () => {
    const { user, isLoaded } = useUser();
  return (
    <div className="space-y-2 mb-4 tracking-wide">
            <h2 className="text-2xl lg:text-4xl text-gray-300
 font-primary font-semibold text-center ">
                Welcome Back {isLoaded ? ",":" "}{user?.fullName}👋
            </h2>
            <p className="text-sm font-primary text-center lg:text-base text-[#89b6fd]">
                This is your Financial Dashboard
            </p>
        </div>
  )
}

export default WelcomeMssg