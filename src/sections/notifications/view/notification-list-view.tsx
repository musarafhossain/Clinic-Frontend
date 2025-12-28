import { useState } from 'react'
import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import NotificationListRow from '../notification-list-row'
import NotificationListRowSkeleton from '../notification-list-row-skeleton'
import { NotificationService } from '@/services'
import { NotificationModel } from '@/models'
import { Tabs, Tab, Box, Paper, Divider } from '@mui/material'
import NotificationsIcon from '@mui/icons-material/Notifications';

const tabLabels = [
  { label: 'Unread', value: 'unread' },
  { label: 'Read', value: 'read' },
  { label: 'All', value: 'all' },
]

const NotificationListView = () => {
  const [status, setStatus] = useState<string>('unread')

  const handleTabChange = (_: React.SyntheticEvent, newValue: string) => {
    setStatus(newValue)
  }

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Paper
        elevation={0}
        sx={{
          borderRadius: 2,
          backgroundColor: 'background.paper',
        }}
      >
        <Tabs
          value={status}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          sx={{
            height: 28,
            p: 0.5,
            '& .MuiTab-root': {
              textTransform: 'none',
              fontSize: '0.875rem',
              fontWeight: 600,
              borderRadius: 2,
              transition: 'background-color 0.3s',
            },
            '& .MuiTab-root.Mui-selected': {
              backgroundColor: 'rgba(25, 118, 210, 0.1)',
              color: 'primary.main',
            },
          }}
        >
          {tabLabels.map((tab, index) => (
            <Tab key={index} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Paper>

      <Divider />

      <InfiniteListWrapper
        sx={{ flex: 1, height: 'auto', minHeight: 0 }}
        queryKey={['notifications', status]}
        queryFn={({ pageParam, search }) =>
          NotificationService.getList({
            page: pageParam,
            search,
            read: status === 'all' ? '' : status === 'read' ? true : false
          })
        }
        renderItem={(notification: NotificationModel) => (
          <NotificationListRow key={notification.id} row={notification} />
        )}
        SkeletonComponent={NotificationListRowSkeleton}
        placeholderMessage="No notifications found"
        placeholderIcon={<NotificationsIcon />}
      />
    </Box>
  )
}

export default NotificationListView
