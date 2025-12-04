import { Stack, Typography, Box } from "@mui/material";

interface RowProps {
    icon: React.ReactNode;
    label: string;
    value: string | number | null | undefined;
    allowWrap?: boolean;
}

function InfoRow({ icon, label, value, allowWrap }: RowProps) {
    return (
        <Stack direction="row" spacing={2} alignItems="center">
            {icon}
            <Box>
                <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", fontSize: "0.85rem" }}
                >
                    {label}
                </Typography>

                <Typography
                    variant="body1"
                    sx={{
                        color: "text.primary",
                        whiteSpace: allowWrap ? "normal" : "nowrap",
                        overflowWrap: "break-word",
                        wordBreak: "break-word",
                    }}
                >
                    {value || "-"}
                </Typography>
            </Box>
        </Stack>
    );
}

export default InfoRow;