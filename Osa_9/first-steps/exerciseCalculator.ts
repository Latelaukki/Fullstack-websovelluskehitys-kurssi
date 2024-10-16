interface exerciseArgs {
    target: number;
    hours: number[];
  }

interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

export const parseArguments = (args: string[]): exerciseArgs => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const strHours: string[] = args.slice(3);

  if (!isNaN(Number(args[2])) && !isNaN(Number(strHours))) {
    const target: number = Number(args[2]);
    const strHours: string[] = args.slice(3);
    const hours: number[] = strHours.map(Number);
    return {
      target: target,
      hours: hours
    };
  } else {
    throw new Error('Target and hours must be numbers.');
  }
};

export const calculateExercises = (target: number, hours: number[]): Result => {

  const dayCount = hours.filter((h) => h !== 0).length;

  const sum = hours.reduce((h1, h2) => h1 + h2, 0);
  const avg = sum / hours.length;

  let rating = 0;
  let description = '';
  if (avg >= target) {
    rating = 3;
    description = 'good job';
  } else if (avg >= target - 0.5) {
    rating = 2;
    description = 'decent';
  } else {
    rating = 1;
    description = 'poor job';
  }
  return {
    periodLength : hours.length,
    trainingDays: dayCount,
    success: avg >= target,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: avg
  };
};

if (require.main === module) {
  try {
      const { target, hours } = parseArguments(process.argv);
      console.log(calculateExercises(target, hours));
  } catch (error: unknown) {
      let errorMessage = 'Something went wrong.';
      if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
      }
      console.log(errorMessage);
    }
}

