
import { HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  student: {
    name: string;
    avatar?: string;
    streakDays: number;
  };
  dailyGoalPercentage: number;
}

const Header = ({ student, dailyGoalPercentage }: HeaderProps) => {
  const navigate = useNavigate();
  
  return (
    <div className="flex flex-col w-full">
      <div className="flex justify-between items-center mb-2">
        <div className="flex flex-col">
          <p className="text-xs text-tutor-purple font-medium">{student.streakDays} Day Streak</p>
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="outline" 
            size="sm" 
            className="bg-blue-600 text-white hover:bg-blue-700 border-none"
            onClick={() => navigate('/curriculum')}
          >
            Curriculum
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <HelpCircle className="h-5 w-5" />
          </Button>
        </div>
      </div>
      <div className="h-2 bg-gray-700 rounded-full overflow-hidden w-full">
        <div 
          className="h-full bg-tutor-purple rounded-full"
          style={{ width: `${dailyGoalPercentage}%` }}
        ></div>
      </div>
      <p className="text-xs text-gray-400 mt-1">{dailyGoalPercentage}% of daily goal completed</p>
    </div>
  );
};

export default Header;
