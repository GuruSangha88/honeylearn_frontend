
import { Topic, Student, Parent } from '../types';

export const mockTopics: Topic[] = [
  {
    id: '1',
    title: 'Mathematics',
    description: 'Learn foundational math concepts',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    totalLessons: 7,
    completedLessons: 2,
    lessons: [
      {
        id: '1001',
        topicId: '1',
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
        topicId: '1',
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
        topicId: '1',
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
        topicId: '1',
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
      },
      {
        id: '1005',
        topicId: '1',
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
  },
  {
    id: '2',
    title: 'Language Arts',
    description: 'Develop reading and writing skills',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    totalLessons: 5,
    completedLessons: 1,
    lessons: [
      {
        id: '2001',
        topicId: '2',
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
  },
  {
    id: '3',
    title: 'Science',
    description: 'Explore the natural world and scientific concepts',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    totalLessons: 4,
    completedLessons: 0,
    lessons: [
      {
        id: '3001',
        topicId: '3',
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
  },
  {
    id: '4',
    title: 'Money Explorers',
    description: 'Learn about money, work, and economics for kids',
    imageUrl: '/lovable-uploads/9453ab3a-e6c0-4cc3-802b-8f0de7e8ef01.png',
    totalLessons: 3,
    completedLessons: 0,
    lessons: [
      {
        id: '4001',
        topicId: '4',
        title: 'What Is Work?',
        description: 'Understanding jobs, work, and earning money',
        duration: 720, // 12 minutes
        completed: false,
        sections: [
          {
            id: '40001',
            title: 'Introduction to Work',
            audioUrl: '/audio/money/work/intro.mp3',
            completed: false,
            durationInSeconds: 180,
            content: [
              {
                id: '400001',
                type: 'image',
                timing: 10,
                data: {
                  url: '/images/money/work_intro.png',
                  alt: 'People working at different jobs'
                }
              },
              {
                id: '400002',
                type: 'text',
                timing: 60,
                data: {
                  text: "Work is how people use their skills to help others and earn money. Everyone has different talents they can share!"
                }
              },
              {
                id: '400003',
                type: 'quiz',
                timing: 120,
                data: {
                  question: 'Why do people work?',
                  options: [
                    'To have fun only', 
                    'To earn money and help others', 
                    'Because they have to', 
                    'To get toys'
                  ],
                  correctAnswerIndex: 1
                }
              }
            ]
          },
          {
            id: '40002',
            title: 'Different Types of Jobs',
            audioUrl: '/audio/money/work/job_types.mp3',
            completed: false,
            durationInSeconds: 240,
            content: [
              {
                id: '400004',
                type: 'image',
                timing: 30,
                data: {
                  url: '/images/money/job_types.png',
                  alt: 'Different types of jobs'
                }
              },
              {
                id: '400005',
                type: 'text',
                timing: 90,
                data: {
                  text: "There are many different jobs! Doctors help sick people. Teachers help students learn. Farmers grow food. Artists make beautiful things. What job sounds interesting to you?"
                }
              },
              {
                id: '400006',
                type: 'question',
                timing: 180,
                data: {
                  question: "What job would you like to have when you grow up?",
                  responseType: "open"
                }
              }
            ]
          },
          {
            id: '40003',
            title: 'Earning and Saving',
            audioUrl: '/audio/money/work/earning.mp3',
            completed: false,
            durationInSeconds: 210,
            content: [
              {
                id: '400007',
                type: 'text',
                timing: 30,
                data: {
                  text: "When people work, they earn money. They can use this money to buy things they need, like food and clothes. They can also save some money for later."
                }
              },
              {
                id: '400008',
                type: 'image',
                timing: 120,
                data: {
                  url: '/images/money/piggy_bank.png',
                  alt: 'Child putting coins in a piggy bank'
                }
              },
              {
                id: '400009',
                type: 'quiz',
                timing: 180,
                data: {
                  question: 'What can you do with money you earn?',
                  options: [
                    'Only spend it right away', 
                    'Only save it forever', 
                    'Spend some and save some', 
                    'Give it all away'
                  ],
                  correctAnswerIndex: 2
                }
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
          lessonsCompleted: 2,
          totalLessons: 5,
          lastAccessedLessonId: '1003'
        },
        '2': {
          lessonsCompleted: 1,
          totalLessons: 5,
          lastAccessedLessonId: '2001'
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
          lessonsCompleted: 1,
          totalLessons: 5,
          lastAccessedLessonId: '1002'
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
