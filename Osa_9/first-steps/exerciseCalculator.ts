interface Result {
    periodLength: number,
    trainingDays: number,
    success: boolean,
    rating: number,
    ratingDescription: string,
    target: number,
    average: number
}

const calculateExercises = (hours: number[], target: number): Result => {
    const dayCount = hours.filter((h) => h !== 0).length;

    const sum = hours.reduce((h1, h2) => h1 + h2, 0)
    const avg = sum / hours.length;

    let rating = 0;
    let description = ''
    if (avg >= target) {
        rating = 3;
        description = 'good job'
    } else if (avg >= target - 0.5) {
        rating = 2;
        description = 'decent'
    } else {
        rating = 1;
        description = 'poor job'
    }
    return {
        periodLength : hours.length,
        trainingDays: dayCount,
        success: avg >= target,
        rating: rating,
        ratingDescription: description,
        target: target,
        average: avg
    }
}

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 2))
