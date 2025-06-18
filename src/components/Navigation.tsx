// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import {
//   NavigationMenu,
//   NavigationMenuItem,
//   NavigationMenuLink,
//   NavigationMenuList,
// } from "@/components/ui/navigation-menu";
// import { Button } from "@/components/ui/button";
// import { AuthModal } from "./AuthModal";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { LogOut, User } from "lucide-react";
// import { useAuth } from "@/contexts/AuthContext";

// export const Navigation = () => {
//   const [showAuthModal, setShowAuthModal] = useState(false);
//   const navigate = useNavigate();
//   const { user, login, islogin, setIsLogIn, logout } = useAuth();

//   useEffect(() => {
//     setIsLogIn(islogin);
//   }, [islogin]);

//   const handleLogin = () => {
//     setShowAuthModal(true);
//   };

//   const handleLogout = () => {
//     logout();
//     navigate("/");
//   };

//   return (
//     <div className="w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
//       <div className="container flex h-16 items-center px-4">
//         <NavigationMenu className="mx-auto max-w-screen-xl px-4">
//           <NavigationMenuList className="flex items-center gap-6">
//             <NavigationMenuItem>
//               <NavigationMenuLink
//                 className="text-xl font-semibold hover:text-gray-600 transition-colors"
//                 onClick={() => navigate("/")}
//               >
//                 Home
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuLink
//                 className="hover:text-gray-600 transition-colors"
//                 onClick={() => navigate("/parks")}
//               >
//                 Amusement Parks
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuLink
//                 className="hover:text-gray-600 transition-colors"
//                 onClick={() => navigate("/entertainment")}
//               >
//                 Entertainment
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuLink
//                 className="hover:text-gray-600 transition-colors"
//                 onClick={() => navigate("/hotels")}
//               >
//                 Resorts
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//             <NavigationMenuItem>
//               <NavigationMenuLink
//                 className="hover:text-gray-600 transition-colors"
//                 onClick={() => navigate("/staycation")}
//               >
//                 Staycation
//               </NavigationMenuLink>
//             </NavigationMenuItem>
//           </NavigationMenuList>
//         </NavigationMenu>

//         <div className="ml-auto flex items-center space-x-4">
//           {!islogin ? (
//             <Button
//               variant="ghost"
//               className="hover:bg-gray-100"
//               onClick={handleLogin}
//             >
//               Login
//             </Button>
//           ) : (
//             <DropdownMenu>
//               <DropdownMenuTrigger>
//                 <Avatar className="h-8 w-8">
//                   <AvatarImage src="" />
//                   <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
//                 </Avatar>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="w-56">
//                 <DropdownMenuItem onClick={() => navigate("/profile")}>
//                   <User className="mr-2 h-4 w-4" />
//                   Profile
//                 </DropdownMenuItem>
//                 <DropdownMenuSeparator />
//                 <DropdownMenuItem onClick={handleLogout}>
//                   <LogOut className="mr-2 h-4 w-4" />
//                   Log out
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           )}
//         </div>
//       </div>
//       <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
//     </div>
//   );
// };


import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, LogOut, User, Home, Hotel, Palmtree } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";
import { AuthModal } from "./AuthModal";

export const Navigation = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);
  const { user, login, islogin, setIsLogIn, logout } = useAuth();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    setIsLogIn(islogin);
  }, [islogin]);

  const handleLogin = () => {
    setShowAuthModal(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/')
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      {/* Hamburger button */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed top-1 left-1 z-50"
        onClick={toggleSidebar}
      >
        <Menu className="h-7 w-7" />
      </Button>

      {/* Sidebar Navigation */}
      <div
        className={cn(
          "fixed left-0 top-0 h-full w-64 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 border-r transform transition-transform duration-200 ease-in-out z-40",
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex flex-col h-full pt-16">
          <NavigationMenu className="w-full">
            <NavigationMenuList className="flex flex-col space-y-2 w-full px-4">
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/")}
                >
                  <Home className="h-5 w-5" />
                  <span>StayPlay</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/hotels")}
                >
                  <Hotel className="h-5 w-5" />
                  <span>Hotels</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/parks")}
                >
                  <Palmtree className="h-5 w-5" />
                  <span>Amusement Parks</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem className="w-full">
                <NavigationMenuLink
                  className="flex items-center space-x-2 w-full p-2 rounded-md hover:bg-gray-100 transition-colors"
                  onClick={() => navigate("/parks")}
                >
                  <Palmtree className="h-5 w-5" />
                  <span>StayCation</span>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <div className="mt-auto p-4 border-t">
            {!islogin ? (
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={handleLogin}
              >
                Login
              </Button>
            ) : (
              <DropdownMenu>
                <DropdownMenuTrigger className="w-full">
                  <div className="flex items-center space-x-2 p-2">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="" />
                      <AvatarFallback>{user?.name?.[0]}</AvatarFallback>
                    </Avatar>
                    <span>Profile</span>
                  </div>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem onClick={() => navigate("/profile")}>
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout}>
                    <LogOut className="mr-2 h-4 w-4" />
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-30"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <AuthModal open={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </div>
  );
};

