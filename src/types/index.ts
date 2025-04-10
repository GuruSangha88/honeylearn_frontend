
// Data models for the tutor platform

export interface Topic {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  courses: Course[];
}

export interface Course {
  id: string;
  topicId: string;
  title: string;
  description: string;
  imageUrl?: string;
  totalLessons: number;
  completedLessons: number;
  lessons: Lesson[];
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  duration: number; // in seconds
  completed: boolean;
  sections: LessonSection[];
}

export interface LessonSection {
  id: string;
  title: string;
  audioUrl?: string;
  content?: ContentItem[];
  completed: boolean;
  durationInSeconds: number;
}

export type ContentType = 'text' | 'image' | 'video' | 'quiz' | 'question';

export interface ContentItem {
  id: string;
  type: ContentType;
  timing: number; // when to show content (seconds into audio)
  data: any; // content data, depends on type
}

export interface Quiz {
  id: string;
  question: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Student {
  id: string;
  name: string;
  avatar?: string;
  streakDays: number;
  totalTimeSpent: number; // in minutes
  dailyGoals: DailyGoal[];
  progress: StudentProgress;
}

export interface DailyGoal {
  date: string; // YYYY-MM-DD
  targetMinutes: number; // default 15
  completedMinutes: number;
}

export interface StudentProgress {
  topicsProgress: {
    [topicId: string]: {
      coursesProgress: {
        [courseId: string]: {
          lessonsCompleted: number;
          totalLessons: number;
          lastAccessedLessonId?: string;
        };
      };
    };
  };
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  students: Student[];
}
