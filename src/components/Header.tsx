
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  student: {
    name: string;
    avatar?: string;
  };
}

const Header = ({ student }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex justify-between items-center mb-6">
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="sm" 
          className="bg-gray-700 text-white hover:bg-gray-600 border-none flex items-center gap-1"
          onClick={() => navigate(-1)}
        >
          <ChevronLeft size={16} />
          Back
        </Button>
      </div>
    </div>
  );
};

export default Header;
