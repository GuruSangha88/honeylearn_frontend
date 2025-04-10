
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, UserPlus, LineChart, PieChart, BarChart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { mockParent } from '@/data/mockData';

const ParentDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('overview');
  
  return (
    <div className="min-h-screen bg-tutor-dark text-white">
      <div className="container max-w-6xl mx-auto py-6 px-4">
        {/* Header */}
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold gradient-text">Parent Dashboard</h1>
            <p className="text-gray-400">Welcome back, {mockParent.name}</p>
          </div>
          <Button
            variant="ghost"
            className="flex items-center gap-1 text-gray-300 hover:text-white"
            onClick={() => navigate('/')}
          >
            <ChevronLeft size={20} />
            Back to Student View
          </Button>
        </div>
        
        {/* Main Content */}
        <div className="mt-8">
          <Tabs defaultValue="overview" onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="reports">Reports</TabsTrigger>
            </TabsList>
            
            {/* Overview Tab */}
            <TabsContent value="overview">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6 mt-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <PieChart size={18} className="text-tutor-purple" />
                      Daily Progress
                    </CardTitle>
                    <CardDescription>Today's learning goals</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockParent.students.map((student) => {
                        const todayGoal = student.dailyGoals[student.dailyGoals.length - 1];
                        const progress = todayGoal 
                          ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
                          : 0;
                        
                        return (
                          <div key={student.id} className="space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-sm">{student.name}</span>
                              <span className="text-xs text-gray-400">
                                {todayGoal?.completedMinutes || 0}/{todayGoal?.targetMinutes || 15} min
                              </span>
                            </div>
                            <Progress value={progress} className="h-1.5" />
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <LineChart size={18} className="text-tutor-purple" />
                      Weekly Streaks
                    </CardTitle>
                    <CardDescription>Consecutive learning days</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockParent.students.map((student) => (
                        <div key={student.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{student.name}</span>
                            <span className="text-xs text-tutor-purple font-medium">
                              {student.streakDays} days
                            </span>
                          </div>
                          <div className="flex gap-1">
                            {Array.from({ length: 7 }).map((_, i) => (
                              <div 
                                key={i}
                                className={`h-1.5 flex-1 rounded-full ${
                                  i < student.streakDays ? 'bg-gradient-to-r from-tutor-purple to-tutor-blue' : 'bg-gray-700'
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <BarChart size={18} className="text-tutor-purple" />
                      Total Progress
                    </CardTitle>
                    <CardDescription>Overall learning time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {mockParent.students.map((student) => (
                        <div key={student.id} className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">{student.name}</span>
                            <span className="text-xs text-gray-400">
                              {student.totalTimeSpent} minutes
                            </span>
                          </div>
                          <Progress 
                            value={(student.totalTimeSpent / 500) * 100} 
                            className="h-1.5" 
                          />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
              
              {/* Recent Activity */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest learning sessions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="glass-card p-3">
                      <p className="text-sm font-medium">Alex Johnson completed "Introduction to Addition"</p>
                      <p className="text-xs text-gray-400 mt-1">Today, 10:30 AM</p>
                    </div>
                    <div className="glass-card p-3">
                      <p className="text-sm font-medium">Maya Smith started "Subtraction Basics"</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday, 3:15 PM</p>
                    </div>
                    <div className="glass-card p-3">
                      <p className="text-sm font-medium">Alex Johnson achieved a 7-day streak!</p>
                      <p className="text-xs text-gray-400 mt-1">Yesterday, 9:00 AM</p>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button variant="link" className="text-tutor-purple w-full">View All Activity</Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Students Tab */}
            <TabsContent value="students">
              <div className="mt-6">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold">Students</h2>
                  <Button className="bg-tutor-purple hover:bg-tutor-dark-purple gap-1">
                    <UserPlus size={16} />
                    Add Student
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mockParent.students.map((student) => (
                    <Card key={student.id}>
                      <CardHeader>
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-3">
                            <div className="h-12 w-12 rounded-full bg-tutor-purple flex items-center justify-center">
                              {student.avatar ? (
                                <img src={student.avatar} alt={student.name} className="h-full w-full object-cover rounded-full" />
                              ) : (
                                <span className="text-white text-lg font-semibold">{student.name[0]}</span>
                              )}
                            </div>
                            <div>
                              <CardTitle>{student.name}</CardTitle>
                              <CardDescription>{student.streakDays} day streak</CardDescription>
                            </div>
                          </div>
                          <Button variant="outline" size="sm">Edit</Button>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Daily goal</span>
                              <span className="text-xs text-gray-400">
                                {student.dailyGoals[student.dailyGoals.length - 1]?.completedMinutes || 0}/
                                {student.dailyGoals[student.dailyGoals.length - 1]?.targetMinutes || 15} min
                              </span>
                            </div>
                            <Progress 
                              value={
                                student.dailyGoals[student.dailyGoals.length - 1]
                                  ? (student.dailyGoals[student.dailyGoals.length - 1].completedMinutes / 
                                     student.dailyGoals[student.dailyGoals.length - 1].targetMinutes) * 100
                                  : 0
                              } 
                              className="h-1.5" 
                            />
                          </div>
                          
                          <div>
                            <div className="flex justify-between mb-1">
                              <span className="text-sm">Total time spent</span>
                              <span className="text-xs text-gray-400">{student.totalTimeSpent} minutes</span>
                            </div>
                          </div>
                          
                          {/* Course Progress */}
                          <div>
                            <p className="text-sm mb-2">Course Progress</p>
                            {Object.entries(student.progress.topicsProgress).flatMap(([topicId, topicProgress]) => 
                              Object.entries(topicProgress.coursesProgress).map(([courseId, courseProgress]) => {
                                const topic = mockParent.students[0].progress.topicsProgress[topicId];
                                const courseName = mockTopics
                                  .find(t => t.id === topicId)
                                  ?.courses.find(c => c.id === courseId)?.title || 'Unknown Course';
                                
                                return (
                                  <div key={courseId} className="mb-2">
                                    <div className="flex justify-between mb-1">
                                      <span className="text-xs">{courseName}</span>
                                      <span className="text-xs text-gray-400">
                                        {courseProgress.lessonsCompleted}/{courseProgress.totalLessons} lessons
                                      </span>
                                    </div>
                                    <Progress 
                                      value={(courseProgress.lessonsCompleted / courseProgress.totalLessons) * 100} 
                                      className="h-1" 
                                    />
                                  </div>
                                );
                              })
                            )}
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex justify-between">
                        <Button 
                          variant="link" 
                          className="text-tutor-purple"
                          onClick={() => {
                            // In a real app, you'd switch to the student's view
                            navigate('/');
                          }}
                        >
                          Switch to Student View
                        </Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>
            
            {/* Reports Tab */}
            <TabsContent value="reports">
              <div className="glass-card p-8 mt-6 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-xl font-medium mb-2">Detailed Reports Coming Soon</h3>
                  <p className="text-gray-400">
                    Advanced analytics and downloadable reports will be available in a future update.
                  </p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
