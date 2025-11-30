'use client';

import { Box, Button, Typography } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import RefreshIcon from '@mui/icons-material/Refresh';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

interface RetryProps {
    onRetry: () => void;
    onBack?: () => void;
    message?: string;
}

const Retry = ({ onRetry, onBack, message = "Failed to load items" }: RetryProps) => {
    return (
        <Box sx={{ textAlign: 'center', py: 5, color: 'error.main' }}>
            <ErrorOutlineIcon sx={{ fontSize: 48, mb: 1 }} />

            <Typography variant="body1" fontWeight={600} sx={{ mb: 2 }}>
                {message}
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                {onBack && (
                    <Button
                        variant="outlined"
                        color="inherit"
                        startIcon={<ArrowBackIcon />}
                        onClick={onBack}
                    >
                        Back
                    </Button>
                )}
                <Button
                    variant="outlined"
                    color="error"
                    startIcon={<RefreshIcon />}
                    onClick={onRetry}
                >
                    Retry
                </Button>
            </Box>
        </Box>
    );
};

export default Retry;
