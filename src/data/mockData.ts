
import { Topic, Student, Parent } from '../types';

export const mockTopics: Topic[] = [
  {
    id: '1',
    title: 'Mathematics',
    description: 'Learn foundational math concepts',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    courses: [
      {
        id: '101',
        topicId: '1',
        title: 'Basic Arithmetic',
        description: 'Addition, subtraction, multiplication, and division',
        totalLessons: 4,
        completedLessons: 2,
        lessons: [
          {
            id: '1001',
            courseId: '101',
            title: 'Introduction to Addition',
            description: 'Learn the basics of adding numbers',
            duration: 600, // 10 minutes
            completed: true,
            sections: [
              {
                id: '10001',
                title: 'What is Addition?',
                audioUrl: '/audio/math/addition/intro.mp3',
                completed: true,
                durationInSeconds: 120,
                content: [
                  {
                    id: '100001',
                    type: 'image',
                    timing: 30,
                    data: {
                      url: '/images/math/addition_1.png',
                      alt: 'Addition example'
                    }
                  }
                ]
              },
              {
                id: '10002',
                title: 'Adding Single Digits',
                audioUrl: '/audio/math/addition/single_digits.mp3',
                completed: true,
                durationInSeconds: 180,
                content: [
                  {
                    id: '100002',
                    type: 'quiz',
                    timing: 60,
                    data: {
                      question: 'What is 3 + 4?',
                      options: ['5', '6', '7', '8'],
                      correctAnswerIndex: 2
                    }
                  }
                ]
              }
            ]
          },
          {
            id: '1002',
            courseId: '101',
            title: 'Subtraction Basics',
            description: 'Master the fundamentals of subtraction',
            duration: 720, // 12 minutes
            completed: true,
            sections: [
              {
                id: '10003',
                title: 'Understanding Subtraction',
                audioUrl: '/audio/math/subtraction/intro.mp3',
                completed: true,
                durationInSeconds: 150,
                content: []
              }
            ]
          },
          {
            id: '1003',
            courseId: '101',
            title: 'Multiplication Fundamentals',
            description: 'Learn how to multiply numbers',
            duration: 840, // 14 minutes
            completed: false,
            sections: [
              {
                id: '10004',
                title: 'What is Multiplication?',
                audioUrl: '/audio/math/multiplication/intro.mp3',
                completed: false,
                durationInSeconds: 180,
                content: []
              }
            ]
          },
          {
            id: '1004',
            courseId: '101',
            title: 'Division Made Easy',
            description: 'Understand division step by step',
            duration: 900, // 15 minutes
            completed: false,
            sections: [
              {
                id: '10005',
                title: 'Introduction to Division',
                audioUrl: '/audio/math/division/intro.mp3',
                completed: false,
                durationInSeconds: 200,
                content: []
              }
            ]
          }
        ]
      },
      {
        id: '102',
        topicId: '1',
        title: 'Geometry',
        description: 'Explore shapes and spatial relationships',
        totalLessons: 3,
        completedLessons: 0,
        lessons: [
          {
            id: '1005',
            courseId: '102',
            title: 'Introduction to Shapes',
            description: 'Learn about basic geometric shapes',
            duration: 600,
            completed: false,
            sections: [
              {
                id: '10006',
                title: 'Basic Shapes',
                audioUrl: '/audio/geometry/shapes/intro.mp3',
                completed: false,
                durationInSeconds: 180,
                content: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '2',
    title: 'Language Arts',
    description: 'Develop reading and writing skills',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    courses: [
      {
        id: '201',
        topicId: '2',
        title: 'Phonics',
        description: 'Learn letter sounds and word formation',
        totalLessons: 5,
        completedLessons: 1,
        lessons: [
          {
            id: '2001',
            courseId: '201',
            title: 'Letter Sounds',
            description: 'Learn the sounds of each letter',
            duration: 540,
            completed: true,
            sections: [
              {
                id: '20001',
                title: 'Vowel Sounds',
                audioUrl: '/audio/language/phonics/vowels.mp3',
                completed: true,
                durationInSeconds: 160,
                content: []
              }
            ]
          }
        ]
      }
    ]
  },
  {
    id: '3',
    title: 'Science',
    description: 'Explore the natural world and scientific concepts',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    courses: [
      {
        id: '301',
        topicId: '3',
        title: 'Biology Basics',
        description: 'Introduction to living organisms',
        totalLessons: 4,
        completedLessons: 0,
        lessons: [
          {
            id: '3001',
            courseId: '301',
            title: 'Plants and Animals',
            description: 'Learn about different living things',
            duration: 660,
            completed: false,
            sections: [
              {
                id: '30001',
                title: 'What Are Living Things?',
                audioUrl: '/audio/science/biology/living_things.mp3',
                completed: false,
                durationInSeconds: 200,
                content: []
              }
            ]
          }
        ]
      }
    ]
  }
];

export const mockStudents: Student[] = [
  {
    id: '1',
    name: 'Alex Johnson',
    avatar: '/images/avatars/alex.png',
    streakDays: 7,
    totalTimeSpent: 340, // minutes
    dailyGoals: [
      {
        date: '2025-04-04',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-05',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-06',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-07',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-08',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-09',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-10',
        targetMinutes: 15,
        completedMinutes: 12
      }
    ],
    progress: {
      topicsProgress: {
        '1': {
          coursesProgress: {
            '101': {
              lessonsCompleted: 2,
              totalLessons: 4,
              lastAccessedLessonId: '1003'
            }
          }
        },
        '2': {
          coursesProgress: {
            '201': {
              lessonsCompleted: 1,
              totalLessons: 5,
              lastAccessedLessonId: '2001'
            }
          }
        }
      }
    }
  },
  {
    id: '2',
    name: 'Maya Smith',
    avatar: '/images/avatars/maya.png',
    streakDays: 3,
    totalTimeSpent: 210, // minutes
    dailyGoals: [
      {
        date: '2025-04-08',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-09',
        targetMinutes: 15,
        completedMinutes: 15
      },
      {
        date: '2025-04-10',
        targetMinutes: 15,
        completedMinutes: 5
      }
    ],
    progress: {
      topicsProgress: {
        '1': {
          coursesProgress: {
            '101': {
              lessonsCompleted: 1,
              totalLessons: 4,
              lastAccessedLessonId: '1002'
            }
          }
        }
      }
    }
  }
];

export const mockParent: Parent = {
  id: '1',
  name: 'Jamie Parker',
  email: 'jamie.parker@example.com',
  students: mockStudents
};

// Get current student (for demo purposes)
export const currentStudent = mockStudents[0];
