
import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const showComingSoon = () => {
    toast({
      title: "Coming Soon",
      description: "This feature is under development and will be available soon!",
    });
  };

  const isActive = (path: string) => {
    return location.pathname === path ? "text-purple-800 font-medium" : "text-gray-700 hover:text-purple-800";
  };

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-xl font-bold text-purple-900">EliteBuilders</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/challenges" className={`${isActive("/challenges")} transition-colors`}>
              Challenges
            </Link>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); showComingSoon(); }}
              className="text-gray-700 hover:text-purple-800 transition-colors"
            >
              Leaderboard
            </a>
            <a 
              href="#" 
              onClick={(e) => { e.preventDefault(); showComingSoon(); }}
              className="text-gray-700 hover:text-purple-800 transition-colors"
            >
              For Sponsors
            </a>
          </nav>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            <Button 
              variant="ghost" 
              onClick={showComingSoon}
            >
              Log In
            </Button>
            <Button 
              variant="default"
              onClick={showComingSoon}
            >
              Sign Up
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu"
            >
              {mobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="container mx-auto px-4 py-4 space-y-4">
            <Link 
              to="/challenges" 
              className="block py-2 font-medium"
              onClick={() => setMobileMenuOpen(false)}
            >
              Challenges
            </Link>
            <a 
              href="#" 
              className="block py-2"
              onClick={(e) => { e.preventDefault(); showComingSoon(); setMobileMenuOpen(false); }}
            >
              Leaderboard
            </a>
            <a 
              href="#" 
              className="block py-2"
              onClick={(e) => { e.preventDefault(); showComingSoon(); setMobileMenuOpen(false); }}
            >
              For Sponsors
            </a>
            <div className="pt-2 space-y-3">
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => { showComingSoon(); setMobileMenuOpen(false); }}
              >
                Log In
              </Button>
              <Button 
                className="w-full"
                onClick={() => { showComingSoon(); setMobileMenuOpen(false); }}
              >
                Sign Up
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
