
import { ArrowRight } from 'lucide-react';
import { Course } from '@/types';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useNavigate } from 'react-router-dom';

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const navigate = useNavigate();
  const progress = (course.completedLessons / course.totalLessons) * 100;

  return (
    <div className="glass-card p-5 cursor-pointer hover:border-tutor-purple/40 transition duration-200">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg mb-1">{course.title}</h3>
          <p className="text-sm text-gray-400">{course.description}</p>
        </div>
        <div className="h-14 w-14 bg-tutor-dark-gray rounded-md overflow-hidden">
          {course.imageUrl ? (
            <img 
              src={course.imageUrl} 
              alt={course.title} 
              className="h-full w-full object-cover"
              onError={(e) => {
                // If image fails to load, display first letter of course title
                e.currentTarget.style.display = 'none';
                e.currentTarget.parentElement.innerHTML = `<div class="h-full w-full flex items-center justify-center text-xl font-bold text-tutor-purple">${course.title.charAt(0)}</div>`;
              }}
            />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-xl font-bold text-tutor-purple">
              {course.title.charAt(0)}
            </div>
          )}
        </div>
      </div>
      <div>
        <div className="flex justify-between items-center text-sm mb-1">
          <span>{Math.round(progress)}% complete</span>
          <span>{course.completedLessons}/{course.totalLessons} lessons</span>
        </div>
        <Progress value={progress} className="h-1.5" />
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
