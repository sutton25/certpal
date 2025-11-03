import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { GraduationCap } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-2xl font-bold text-primary">
            <GraduationCap className="h-8 w-8" />
            <span>CertPal</span>
          </Link>
          
          <div className="flex items-center gap-6">
            <Link to="/certifications">
              <Button variant="ghost">Certifications</Button>
            </Link>
            <Link to="/progress">
              <Button variant="ghost">Progress</Button>
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
