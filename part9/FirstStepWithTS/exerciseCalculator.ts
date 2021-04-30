interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

interface Rating {
  ratingDescription: string;
  rating: number;
  success: boolean;
}

const calculateExercise = (exerciseLog: number[], target: number): Result => {
  const periodLength = exerciseLog.length;
  const trainingDays = exerciseLog.filter((hour) => hour !== 0).length;
  const average =
    exerciseLog.reduce((accumulator, current) => accumulator + current, 0) /
    periodLength;

  const getRating = (average: number, target: number): Rating => {
    if (average > target) {
      return {
        rating: 5,
        ratingDescription:
          "Congratulations! You reached your number of hours this week.",
        success: true,
      };
    }

    if (average < target) {
      return {
        rating: 3,
        ratingDescription: "Try again next week!",
        success: false,
      };
    }
  };

  return {
    periodLength,
    trainingDays,
    success: getRating(average, target).success,
    rating: getRating(average, target).rating,
    ratingDescription: getRating(average, target).ratingDescription,
    target,
    average,
  };
};

console.log(calculateExercise([3, 5, 2, 4.5, 3, 3, 1], 1));
