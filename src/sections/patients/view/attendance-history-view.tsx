import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import AttendanceHistoryListRow from '../attendance-history-list-row'
import AttendanceHistoryListRowSkeleton from '../attendance-history-list-row-skeleton'
import { AttendanceService } from '@/services'
import EventNoteIcon from '@mui/icons-material/EventNote';

const AttendanceHistoryListView = (patientId: string) => {

  return (
    <InfiniteListWrapper
      queryKey={['attendance-history', patientId]}
      queryFn={({ pageParam, search }) =>
        AttendanceService.getListByPatientId(patientId, { page: pageParam, search, limit: 10 })
      }
      renderItem={(attendance: any) => <AttendanceHistoryListRow key={attendance.id} row={attendance} />}
      SkeletonComponent={AttendanceHistoryListRowSkeleton}
      placeholderMessage="No attendance history found"
      placeholderIcon={<EventNoteIcon sx={{ fontSize: 48, opacity: 0.6 }} />} 
    />
  )
}

export default AttendanceHistoryListView
