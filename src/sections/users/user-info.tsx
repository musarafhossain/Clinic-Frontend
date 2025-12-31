import { Avatar, Typography, Stack } from '@mui/material'

interface Props {
    name: string;
    id: string;
}

const UserInfo = ({ name, id }: Props) => {
    const initial = name ? name.charAt(0).toUpperCase() : "?";

    return (
        <Stack mx="auto" alignItems="center">
            <Avatar
                sx={{
                    width: 100,
                    height: 100,
                    bgcolor: "primary.lighter",
                    color: "primary.main",
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
                User ID: {id || '-'}
            </Typography>
        </Stack>
    );
};

export default UserInfo;
