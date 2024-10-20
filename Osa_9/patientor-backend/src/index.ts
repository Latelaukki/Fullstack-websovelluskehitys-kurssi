import express from 'express';
import diagnosesRouter from './routes/diagnoses';
import patientsRouter from './routes/patients'

const app = express();
const cors = require('cors')

app.use(express.json());
app.use(cors())

const corsOptions = {
    origin: 'http://localhost:5173',
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
  }

const PORT = 3001;

app.get('/api/ping', cors(corsOptions), (_req, res) => {
  console.log('someone pinged here');
  res.send('pong');
});

app.use('/api/diagnoses', diagnosesRouter);
app.use('/api/patients', patientsRouter)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});