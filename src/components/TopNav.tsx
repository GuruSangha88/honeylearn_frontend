
import { Home, UserRound, MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const isActive = (path: string) => {
    return location.pathname === path;
  };
  const menuItems = [{
    name: "Home",
    icon: <Home className="w-5 h-5 mr-2" />,
    path: "/"
  }];
  return <header className="bg-tutor-dark border-b border-gray-800 sticky top-0 z-50">
      <div className="container max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <Link to="/" className="flex items-center">
            <img src="/lovable-uploads/ea337c81-3a2b-4dfb-8f64-733dca433902.png" alt="HoneyLearn" className="h-10" />
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center space-x-2">
          <NavigationMenu>
            <NavigationMenuList>
              {menuItems.map(item => <NavigationMenuItem key={item.path}>
                  <Link to={item.path}>
                    <NavigationMenuLink className={cn("flex items-center px-4 py-2 text-sm font-medium rounded-md", isActive(item.path) ? "text-tutor-purple" : "text-gray-300 hover:text-white")}>
                      {item.icon}
                      {item.name}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>)}
            </NavigationMenuList>
          </NavigationMenu>
          
          {/* Parents Dashboard Link */}
          <Link to="/parents" className={cn("px-4 py-2 text-sm font-medium rounded-md", isActive("/parents") ? "text-tutor-purple" : "text-gray-300 hover:text-white")}>
            Parents
          </Link>

          <Button size="sm" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black text-base font-bold">
            Try for free &gt;
          </Button>

          {/* Student Profile Button */}
          <Link to="/" className="ml-2">
            <Avatar className="h-8 w-8 bg-tutor-dark-purple text-white border-none">
              <AvatarFallback className="text-indigo-600">
                <UserRound className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="md:hidden text-blue-600">
          <Button variant="ghost" size="icon" className="text-gray-300 hover:text-white" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <MenuIcon className="h-6 w-6" />
          </Button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && <div className="md:hidden bg-tutor-dark-gray border-t border-gray-800">
          <div className="container max-w-6xl mx-auto px-4 py-2">
            {menuItems.map(item => <Link key={item.path} to={item.path} onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center px-4 py-3 text-sm font-medium rounded-md", isActive(item.path) ? "text-tutor-purple" : "text-gray-300 hover:text-white")}>
                {item.icon}
                {item.name}
              </Link>)}
            
            <Button size="sm" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black w-full mt-2 text-base font-bold">
              Try for free &gt;
            </Button>
            
            <Link to="/parents" onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center px-4 py-3 text-sm font-medium rounded-md", isActive("/parents") ? "text-tutor-purple" : "text-gray-300 hover:text-white")}>
              Parents
            </Link>
            
            <div className="flex items-center px-4 py-3">
              <Avatar className="h-8 w-8 bg-tutor-dark-purple text-white border-none mr-2">
                <AvatarFallback>
                  <UserRound className="w-5 h-5" />
                </AvatarFallback>
              </Avatar>
              <span className="text-sm font-medium text-gray-300">Alex</span>
            </div>
          </div>
        </div>}
    </header>;
};
export default TopNav;

