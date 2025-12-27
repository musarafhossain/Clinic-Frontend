import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import PaymentHistoryListRowSkeleton from '../attendance-history-list-row-skeleton'
import { PaymentHistoryService } from '@/services'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import PaymentHistoryListRow from '../payment-history-list-row';
import { PaymentHistoryModel } from '@/models';

const PaymentHistoryListView = (patientId: string) => {

  return (
    <InfiniteListWrapper
      queryKey={['payment-history', patientId]}
      queryFn={({ pageParam, search }) =>
        PaymentHistoryService.getList({ page: pageParam, search, limit: 10, patientId })
      }
      renderItem={(paymentHistory: PaymentHistoryModel) => <PaymentHistoryListRow key={paymentHistory.id} row={paymentHistory} patientId={patientId} />}
      SkeletonComponent={PaymentHistoryListRowSkeleton}
      placeholderMessage="No payment history found"
      placeholderIcon={<CurrencyRupeeIcon sx={{ fontSize: 48, opacity: 0.6 }} />} 
    />
  )
}

export default PaymentHistoryListView
