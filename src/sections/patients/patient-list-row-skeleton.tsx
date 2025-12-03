import Skeleton from "@mui/material/Skeleton";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";

const PatientListRowSkeleton = () => {
    return (
        <ListItem
            divider
            secondaryAction={
                <IconButton disabled>
                    <Skeleton variant="circular" width={28} height={28} />
                </IconButton>
            }
        >
            <ListItemAvatar>
                <Skeleton variant="circular" width={40} height={40} />
            </ListItemAvatar>

            <ListItemText
                primary={<Skeleton width="60%" />}
                secondary={<Skeleton width="40%" />}
            />
        </ListItem>
    );
};

export default PatientListRowSkeleton;
