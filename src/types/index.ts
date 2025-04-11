
// Data models for the tutor platform

export interface Topic {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  lessons: Lesson[];
  totalLessons?: number;
  completedLessons?: number;
  courses?: Course[]; // Adding courses property
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  lessons: Lesson[];
  totalLessons: number;
  completedLessons: number;
}

export interface Lesson {
  id: string;
  topicId: string;
  title: string;
  description: string;
  imageUrl?: string;
  duration: number; // in seconds
  completed: boolean;
  sections: LessonSection[];
  nextLessonId?: string; // Add support for next lesson navigation
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
  onComplete?: () => void; // Add the onComplete callback property
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
    [topicId: string]: TopicProgress;
  };
}

export interface TopicProgress {
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessedLessonId?: string;
  coursesProgress?: {
    [courseId: string]: CourseProgress;
  };
}

export interface CourseProgress {
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessedLessonId?: string;
}

export interface Parent {
  id: string;
  name: string;
  email: string;
  students: Student[];
}
