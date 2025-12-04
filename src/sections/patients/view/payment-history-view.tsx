import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import AttendanceHistoryListRowSkeleton from '../attendance-history-list-row-skeleton'
import { PatientService } from '@/services'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentHistoryListRow from '../payment-history-list-row';

const PaymentHistoryListView = (patientId: string) => {

  return (
    <InfiniteListWrapper
      queryKey={['payment-history', patientId]}
      queryFn={({ pageParam, search }) =>
        PatientService.getPatientPaymentHistory({ page: pageParam, search, limit: 10, patientId })
      }
      renderItem={(attendance: any) => <PaymentHistoryListRow key={attendance.id} row={attendance} patientId={patientId} />}
      SkeletonComponent={AttendanceHistoryListRowSkeleton}
      placeholderMessage="No payment history found"
      placeholderIcon={<CurrencyRupeeIcon sx={{ fontSize: 48, opacity: 0.6 }} />} 
    />
  )
}

export default PaymentHistoryListView
