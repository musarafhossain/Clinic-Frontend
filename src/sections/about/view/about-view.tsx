'use client';
import { Box, Typography, Container, Divider, Avatar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import { Config } from '@/Config';

const AboutView = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 2, height: '100%', display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
            <Box sx={{ textAlign: 'center', mb: 4 }}>
                <Avatar
                    sx={{
                        bgcolor: 'primary.main',
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                    }}
                >
                    <InfoIcon sx={{ fontSize: 80 }} />
                </Avatar>
                <Typography variant="h5" component="h1" fontWeight='bold' gutterBottom>
                    About {Config.APP.NAME}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ px: 1 }}>
                    {Config.APP.NAME} is a simple and modern physiotherapy management system that helps clinics manage patients, track treatments, and monitor progress efficiently.
                </Typography>
            </Box>

            <Box sx={{ textAlign: 'center' }}>
                <Divider sx={{ mb: 2 }} />
                <Typography variant="body2" color="text.secondary">
                    App Version: {Config.APP.VERSION}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    &copy; {new Date().getFullYear()} {Config.APP.NAME}. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutView;