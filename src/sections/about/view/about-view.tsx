'use client';
import { Box, Typography, Container, Divider, Avatar } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';

const APP_VERSION = "v1.0.3";

const AboutView = () => {
    return (
        <Container maxWidth="sm" sx={{ py: 4 }}>
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
                <Typography variant="h4" component="h1" fontWeight='bold' gutterBottom>
                    About Phyzo
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ px: 1 }}>
                    Phyzo is a simple and modern physiotherapy management system that helps clinics manage patients, track treatments, and monitor progress efficiently.
                </Typography>
            </Box>

            <Divider />

            <Box sx={{ textAlign: 'center', mt: 6 }}>
                <Typography variant="body2" color="text.secondary">
                    App Version: {APP_VERSION}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    &copy; {new Date().getFullYear()} Phyzo. All rights reserved.
                </Typography>
            </Box>
        </Container>
    );
};

export default AboutView;