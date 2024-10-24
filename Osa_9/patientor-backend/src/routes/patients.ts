import express from 'express';
import patientServise from '../services/patientServise';

const router = express.Router();

router.get('/', (_req, res)  => {
    res.send(patientServise.getNonSensitivePatientData());
})

router.post('/', (_req, res) => {
    const { name, dateOfBirth, ssn, gender, occupation } = _req.body;
    const addedPatient = patientServise.addPatient({
        name,
        dateOfBirth,
        ssn,
        gender,
        occupation
    });
    res.json(addedPatient);
});

export default router;