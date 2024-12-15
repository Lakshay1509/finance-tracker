import { UserButton, useUser } from "@clerk/nextjs";
import HeaderLogo from "./ui/HeaderLogo";
import { Navigation } from "./ui/navigation";
import WelcomeMssg from "./ui/WelcomeMssg";


const Header = () => {
   
  return (
    <header
      className="bg-gradient-to-b from-gray-900 to-black

px-4 py-8 lg:px-14 pb-36"
    >
      <div className="max-w-screen-2xl mx-auto">
        <div
          className="w-full flex items-center justify-between
mb-14"
        >
          
            <HeaderLogo />
            
            <div className="flex items-center gap-x-4">
          <Navigation/>
          <UserButton afterSignOutUrl="/"/>
          </div>
        </div>
        <div className="w-full flex justify-center items-center">
        <WelcomeMssg/>
        </div>
        
      </div>
    </header>
  );
};

export default Header;
