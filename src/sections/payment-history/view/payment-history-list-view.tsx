"use client";
import { useState } from 'react'
import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import PaymentHistoryListRow from '../payment-history-list-row'
import PaymentHistoryRowSkeleton from '../payment-history-list-row-skeleton'
import { PaymentHistoryService } from '@/services'
import { PaymentHistoryModel } from '@/models'
import CurrencyRupeeIcon from "@mui/icons-material/CurrencyRupee";
import {
  Box,
  IconButton,
} from '@mui/material'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';

const PaymentHistoryListView = () => {
  const [date, setDate] = useState<Dayjs>(dayjs());

  const handleDateChange = (value: Dayjs | null) => {
    if (!value) return;
    setDate(value);
  };

  return (
    <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ display: "flex", justifyContent: 'space-between', mt: 2 }}>
          <IconButton color="primary" onClick={() => setDate(prev => prev.subtract(1, "day"))}>
            <ArrowBackIosNewIcon />
          </IconButton>

          <DatePicker
            label="Select Date"
            value={date}
            onChange={handleDateChange}
            format="YYYY-MM-DD"
            slotProps={{
              textField: { size: "small", fullWidth: true }
            }}
          />

          <IconButton color="primary" onClick={() => setDate(prev => prev.add(1, "day"))}>
            <ArrowForwardIosIcon />
          </IconButton>
        </Box>
      </Box>

      <Divider sx={{ mt: 1.5, mx: 1.5 }} />

      <InfiniteListWrapper
        sx={{ flex: 1, height: 'auto', minHeight: 0 }}
        queryKey={["payment-history", date.format("YYYY-MM-DD")]}
        queryFn={({ pageParam, search }) =>
          PaymentHistoryService.getList({ page: pageParam, search, limit: 10, paymentDate: date.format("YYYY-MM-DD") as string })
        }
        renderItem={(row: PaymentHistoryModel) => (
          <PaymentHistoryListRow
            key={row.id + "-" + date.format("YYYY-MM-DD")}
            row={row}
            date={date.format("YYYY-MM-DD")}
            patientId={row.patient?.id || ""}
          />
        )}
        SkeletonComponent={PaymentHistoryRowSkeleton}
        placeholderMessage={`No payment history found for ${date.format("YYYY-MM-DD")}`}
        placeholderIcon={<CurrencyRupeeIcon sx={{ fontSize: 48, opacity: 0.6 }} />}
      />
    </Box>
  )
}

export default PaymentHistoryListView;
