import patients from '../../data/patients'
import { nonSensitivePatientData, Patient } from '../types';

const getPatients = (): Patient[] => {
    return(patients);
};

const getNonSensitivePatientData = (): nonSensitivePatientData[] => {
    return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
        id,
        name,
        dateOfBirth,
        gender,
        occupation
    }));
};

export default {
    getPatients,
    getNonSensitivePatientData
};