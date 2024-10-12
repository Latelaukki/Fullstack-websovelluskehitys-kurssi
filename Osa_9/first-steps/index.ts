import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.get('/hello', (_req, res) => {
    res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const height: number = Number(req.query.height);
  const weight: number = Number(req.query.weight);

  const bmi = calculateBmi(height, weight);
  res.send(
    {
      weight: weight,
      height: height,
      bmi: bmi
    }
  );
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { target, daily_exercises } = req.body;

  const result = calculateExercises(target, daily_exercises);
  res.send({ result });
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
