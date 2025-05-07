import { Home, UserRound, MenuIcon } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger } from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { supabase } from "@/integrations/supabase/client";

const TopNav = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  
  useEffect(() => {
    const checkSession = async () => {
      const { data } = await supabase.auth.getSession();
      setIsLoggedIn(!!data.session);
      setUserEmail(data.session?.user?.email || null);
    };
    
    checkSession();
    
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setIsLoggedIn(!!session);
      setUserEmail(session?.user?.email || null);
    });
    
    return () => subscription.unsubscribe();
  }, []);
  
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
          
          {/* Parents Dashboard Link - Only show if logged in */}
          {isLoggedIn && (
            <Link to="/parents" className={cn("px-4 py-2 text-sm font-medium rounded-md", isActive("/parents") ? "text-tutor-purple" : "text-gray-300 hover:text-white")}>
              Parents
            </Link>
          )}

          {!isLoggedIn && (
            <div className="flex items-center space-x-4">
              <Link to="/login">
                <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button size="sm" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black text-base font-bold">
                  Try for free &gt;
                </Button>
              </Link>
            </div>
          )}

          {/* Student Profile Button - Only show if logged in */}
          {isLoggedIn && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Avatar className="h-8 w-8 bg-tutor-dark-purple text-white border-none cursor-pointer">
                  <AvatarFallback className="bg-tutor-purple">
                    {userEmail ? userEmail[0].toUpperCase() : <UserRound className="w-5 h-5" />}
                  </AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-48 bg-gray-800 border border-gray-700 text-white">
                <DropdownMenuItem asChild>
                  <Link to="/parents" className="text-gray-300 hover:text-white focus:text-white">
                    Parent Dashboard
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <button
                    onClick={async () => {
                      await supabase.auth.signOut();
                      window.location.href = '/';
                    }}
                    className="w-full text-left text-gray-300 hover:text-white focus:text-white"
                  >
                    Sign Out
                  </button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
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
            
            {!isLoggedIn && (
              <>
                <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex items-center px-4 py-3 text-sm font-medium text-gray-300 hover:text-white">
                  Login
                </Link>
                <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                  <Button size="sm" className="bg-[#FCE20B] hover:bg-[#FCE20B]/90 text-black w-full mt-2 text-base font-bold">
                    Try for free &gt;
                  </Button>
                </Link>
              </>
            )}
            
            {/* Parents Link - Only show if logged in */}
            {isLoggedIn && (
              <>
                <Link to="/parents" onClick={() => setMobileMenuOpen(false)} className={cn("flex items-center px-4 py-3 text-sm font-medium rounded-md", isActive("/parents") ? "text-tutor-purple" : "text-gray-300 hover:text-white")}>
                  Parents
                </Link>
                <button
                  onClick={async () => {
                    await supabase.auth.signOut();
                    window.location.href = '/';
                  }}
                  className="flex w-full items-center px-4 py-3 text-sm font-medium rounded-md text-gray-300 hover:text-white"
                >
                  Sign Out
                </button>
              </>
            )}
            
            {/* Profile - Only show if logged in */}
            {isLoggedIn && (
              <div className="flex items-center px-4 py-3">
                <Avatar className="h-8 w-8 bg-tutor-dark-purple text-white border-none mr-2">
                  <AvatarFallback className="bg-tutor-purple">
                    {userEmail ? userEmail[0].toUpperCase() : <UserRound className="w-5 h-5" />}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm font-medium text-gray-300">{userEmail}</span>
              </div>
            )}
          </div>
        </div>}
    </header>;
};
export default TopNav;
