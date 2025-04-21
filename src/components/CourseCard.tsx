
import { ArrowRight } from 'lucide-react';
import { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();

  return (
    <div className="glass-card p-5 cursor-pointer hover:border-tutor-purple/40 transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
          <p className="text-sm text-gray-400">{course.description}</p>
        </div>
        <div className="h-14 w-14 rounded-md overflow-hidden">
          <div className="h-full w-full flex items-center justify-center text-xl font-bold bg-gradient-to-r from-tutor-purple to-tutor-blue text-white">
            {course.title.charAt(0)}
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <Button 
          size="sm" 
          className="gap-1 bg-tutor-purple hover:bg-tutor-dark-purple"
          onClick={() => navigate(`/course/${course.id}`)}
        >
          Continue <ArrowRight size={16} />
        </Button>
      </div>
    </div>
  );
};

export default CourseCard;
