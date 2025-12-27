import { stringToColor } from '@/helpers/functions';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import Typography from '@mui/material/Typography';
import dayjs from 'dayjs';

interface Props {
    row: any;
}

const AttendanceHistoryListRow = ({ row }: Props) => {
    return (
        <ListItem
            secondaryAction={
                <Typography variant='h6' sx={{ color: 'green' }}>
                    +{`₹${row.disease_amount}`}
                </Typography>
            }
            divider
        >
            <ListItemAvatar>
                <Avatar
                    sx={{
                        bgcolor: stringToColor(row?.name || 'U'),
                        color: '#fff',
                    }}
                >
                    <CalendarMonthIcon fontSize="medium" />
                </Avatar>
            </ListItemAvatar>

            <ListItemText
                primary={dayjs(row.datetime).format('YYYY-MM-DD | HH:mm A')}
                secondary={row.disease_name}
            />
        </ListItem>
    );
};

export default AttendanceHistoryListRow;
