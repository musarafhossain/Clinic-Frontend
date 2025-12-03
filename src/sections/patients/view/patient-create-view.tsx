'use client';
import { Box } from '@mui/material';
import PatientForm from '../patient-from';

const PatientCreateView = () => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <PatientForm />
        </Box>
    );
};

export default PatientCreateView;
