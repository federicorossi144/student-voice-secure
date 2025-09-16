import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Shield, Vote } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const location = useLocation();

  return (
    <header className="relative bg-trust-gradient border-b border-border shadow-soft">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
            <div className="bg-primary-foreground/10 backdrop-blur-sm p-2 rounded-lg">
              <Vote className="h-8 w-8 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary-foreground">
                Student Voices
              </h1>
              <p className="text-primary-foreground/80 text-sm">
                Private Ballots
              </p>
            </div>
          </Link>
          
          <nav className="hidden md:flex items-center gap-6">
            <Link 
              to="/" 
              className={`text-primary-foreground/90 hover:text-primary-foreground transition-colors ${
                location.pathname === '/' ? 'text-primary-foreground font-medium' : ''
              }`}
            >
              Home
            </Link>
            <Link 
              to="/elections" 
              className={`text-primary-foreground/90 hover:text-primary-foreground transition-colors ${
                location.pathname === '/elections' ? 'text-primary-foreground font-medium' : ''
              }`}
            >
              Elections
            </Link>
            <Link 
              to="/register" 
              className={`text-primary-foreground/90 hover:text-primary-foreground transition-colors ${
                location.pathname === '/register' ? 'text-primary-foreground font-medium' : ''
              }`}
            >
              Register
            </Link>
          </nav>
          
          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 bg-primary-foreground/10 backdrop-blur-sm px-3 py-2 rounded-lg">
              <Shield className="h-4 w-4 text-primary-foreground" />
              <span className="text-sm text-primary-foreground">
                Encrypted & Anonymous
              </span>
            </div>
            
            <div className="bg-primary-foreground/95 backdrop-blur-sm rounded-lg p-1">
              <ConnectButton />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;