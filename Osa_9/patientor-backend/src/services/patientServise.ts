import patients from '../../data/patients'
import { nonSensitivePatientData, Patient, NewPatient } from '../types';
import { v1 as uuid } from 'uuid';

const id = uuid();

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

const addPatient = ( patient: NewPatient): Patient => {
    const newPatient = {
        id : id,
        ...patient
    };
    
    patients.push(newPatient);
    return newPatient;
}

export default {
    getPatients,
    getNonSensitivePatientData,
    addPatient
};