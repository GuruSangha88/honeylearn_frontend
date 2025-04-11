
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { mockTopics } from "@/data/mockData";
import { ChevronRight } from "lucide-react";

const CourseDetail = () => {
  const { topicId } = useParams<{ topicId: string }>();
  const topic = mockTopics.find((topic) => topic.id === topicId);

  if (!topic) {
    return <div>Topic not found</div>;
  }

  const totalLessons = topic.lessons.length;
  const completedLessons = topic.lessons.filter((lesson) => lesson.completed).length;
  const progressPercentage = totalLessons > 0 ? (completedLessons / totalLessons) * 100 : 0;

  return (
    <div className="container max-w-4xl mx-auto px-4 py-8">
      <div className="flex items-center space-x-4 mb-6">
        <div className="h-16 w-16 bg-tutor-dark-gray rounded-full overflow-hidden border-2 border-tutor-purple/30">
          {topic.imageUrl ? (
            <img src={topic.imageUrl} alt={topic.title} className="h-full w-full object-cover" />
          ) : (
            <div className="h-full w-full flex items-center justify-center text-3xl font-bold text-tutor-purple">
              {topic.title.charAt(0)}
            </div>
          )}
        </div>
        <div>
          <h1 className="text-2xl font-bold">{topic.title}</h1>
          <p className="text-gray-400">{topic.description}</p>
        </div>
      </div>

      <div className="mb-8">
        <div className="flex justify-between mb-2">
          <span>Progress</span>
          <span>{completedLessons}/{totalLessons} lessons</span>
        </div>
        <Progress value={progressPercentage} className="h-2" />
      </div>

      <div className="space-y-4">
        <h2 className="text-xl font-semibold">Lessons</h2>
        {topic.lessons.map((lesson) => (
          <div
            key={lesson.id}
            className="glass-card p-4 flex justify-between items-center"
          >
            <div>
              <h3 className="font-medium">{lesson.title}</h3>
              <p className="text-sm text-gray-400">{lesson.description}</p>
              <div className="flex items-center space-x-2 mt-2">
                <span className="text-xs">{lesson.duration / 60} min</span>
                {lesson.completed && (
                  <span className="text-xs text-green-500">Completed</span>
                )}
              </div>
            </div>
            <Button variant="ghost" size="icon">
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseDetail;
