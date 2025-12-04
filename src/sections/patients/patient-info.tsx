import { Avatar, Typography, Stack } from '@mui/material'

interface Props {
    name: string;
    id: string;
}

const PatientInfo = ({ name, id }: Props) => {
    const initial = name ? name.charAt(0).toUpperCase() : "?";

    return (
        <Stack mx="auto" alignItems="center">
            <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "#c9e7f5",
                    color: "#13a4ec",
                    fontWeight: "bold",
                    fontSize: 35,
                }}
            >
                {initial}
            </Avatar>

            <Typography variant="h5" fontWeight="bold" mt={2}>
                {name || "Unknown"}
            </Typography>

            <Typography variant="body2" color="text.secondary" mt={0.1}>
                Patient ID: {id || '-'}
            </Typography>
        </Stack>
    );
};

export default PatientInfo;
