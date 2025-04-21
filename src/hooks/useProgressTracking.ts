
import { useEffect } from 'react';
import { Student } from '@/types';

export const useProgressTracking = (
  isSecondPartPlayed: boolean,
  secondPartFinished: boolean,
  isThirdPartPlayed: boolean,
  thirdPartFinished: boolean,
  videoCompleted: boolean,
  isSixthPartPlayed: boolean,
  quizDisplayed: boolean,
  lessonCompleted: boolean,
  setProgressPercentage: (value: number) => void,
  currentStudent: Student
) => {
  useEffect(() => {
    if (isSecondPartPlayed && !secondPartFinished) {
      setProgressPercentage(40);
    } else if (secondPartFinished && isThirdPartPlayed && !thirdPartFinished) {
      setProgressPercentage(60);
    } else if (thirdPartFinished && videoCompleted && !isSixthPartPlayed) {
      setProgressPercentage(70);
    } else if (isSixthPartPlayed && !quizDisplayed) {
      setProgressPercentage(75);
    } else if (lessonCompleted) {
      setProgressPercentage(100);
    }
  }, [
    isSecondPartPlayed,
    secondPartFinished,
    isThirdPartPlayed,
    thirdPartFinished,
    videoCompleted,
    isSixthPartPlayed,
    quizDisplayed,
    lessonCompleted,
  ]);

  const todayGoal = currentStudent.dailyGoals[currentStudent.dailyGoals.length - 1];
  const dailyGoalPercentage = lessonCompleted ? 100 : (
    todayGoal 
      ? Math.min(Math.round((todayGoal.completedMinutes / todayGoal.targetMinutes) * 100), 100)
      : 0
  );

  return { dailyGoalPercentage };
};
