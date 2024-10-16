import express from 'express';
import { calculateBmi } from "./bmiCalculator";
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

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
  
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
  if (Object.keys(req.body).length < 2)  {
    res.status(400).send({ error: "parameters missing"});
  }
 
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-explicit-any
  const { target, daily_exercises } : any = req.body;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call
  if (isNaN(Number(target)) || daily_exercises.some(isNaN)) {
    res.status(400).send({ error: "malformatted parameters" });
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const result = calculateExercises(Number(target), daily_exercises);
    res.send({ result });
  }
});

const PORT = 3003;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
