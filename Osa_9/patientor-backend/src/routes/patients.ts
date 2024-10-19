import express from 'express';
import patientServise from '../services/patientServise';

const router = express.Router();

router.get('/', (_req, res)  => {
    res.send(patientServise.getNonSensitivePatientData());
})

export default router;