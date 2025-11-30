'use client';
import { Box } from '@mui/material';
import DiseaseForm from '../disease-from';

const DiseaseCreateView = () => {
    return (
        <Box sx={{ maxWidth: 500, mx: 'auto', mt: 2, p: 2 }}>
            <DiseaseForm />
        </Box>
    );
};

export default DiseaseCreateView;
