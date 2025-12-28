"use client";
import { useState } from 'react'
import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import AttendanceListRow from '../attendance-list-row'
import AttendanceListRowSkeleton from '../attendance-list-row-skeleton'
import { AttendanceService } from '@/services'
import { PatientModel } from '@/models'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import {
  Box,
  IconButton,
} from '@mui/material'
import { PATIENT_STATUS } from '@/helpers/enum'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';

const AttendanceListView = () => {
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
        queryKey={["attendance", date.format("YYYY-MM-DD")]}
        queryFn={({ pageParam, search }) =>
          AttendanceService.getList({
            date: date.format("YYYY-MM-DD"),
            page: pageParam,
            search,
            status: PATIENT_STATUS.ONGOING
          })
        }
        renderItem={(row: PatientModel) => (
          <AttendanceListRow
            key={row.id + "-" + date.format("YYYY-MM-DD")}
            row={row}
            date={date.format("YYYY-MM-DD")}
          />
        )}
        SkeletonComponent={AttendanceListRowSkeleton}
        placeholderMessage="No patient found for attendace"
        placeholderIcon={<EventAvailableIcon sx={{ fontSize: 48, opacity: 0.6 }} />}
      />
    </Box>
  )
}

export default AttendanceListView;
