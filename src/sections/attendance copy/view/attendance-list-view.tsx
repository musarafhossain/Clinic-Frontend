"use client";

import { useEffect, useState } from 'react'
import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import AttendanceListRow from '../attendance-list-row'
import AttendanceListRowSkeleton from '../attendance-list-row-skeleton'
import { AttendanceService } from '@/services'
import { PatientModel } from '@/models'
import { Attendance } from '@/models/Patient.Models'
import EventAvailableIcon from '@mui/icons-material/EventAvailable';
import { useQueryClient } from '@tanstack/react-query';
import {
  Box,
  Button,
  IconButton,
} from '@mui/material'
import { PATIENT_STATUS } from '@/helpers/enum'
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";
import Grid from '@mui/material/Grid'
import toast from 'react-hot-toast'
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import Divider from '@mui/material/Divider';

const AttendanceListView = () => {
  const queryClient = useQueryClient();
  const [date, setDate] = useState<Dayjs>(dayjs());
  const [attendances, setAttendances] = useState<Attendance[]>([])
  const [initialAttendances, setInitialAttendances] = useState<Attendance[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setAttendances([]);
    setInitialAttendances([]);
  }, [date]);

  useEffect(() => {
    (async () => {
      const res = await AttendanceService.getList({
        date: date.format("YYYY-MM-DD"),
        page: 1,
        status: PATIENT_STATUS.ONGOING
      });

      if (!res?.data) return;

      const defaults = res.data.items.map((p: PatientModel) => ({
        patient_id: p.id,
        is_present: p.attendance?.is_present || false,
        disease: p.attendance?.disease || p.disease?.name,
        amount: p.attendance?.amount || p.disease?.amount
      }));

      setAttendances(defaults);
      setInitialAttendances(defaults);
    })();
  }, [date]);

  const onToggle = (patientId: string, updatedData: Partial<Attendance>) => {
    setAttendances(prev =>
      prev.map(item =>
        item.patient_id === patientId
          ? { ...item, ...updatedData }
          : item
      )
    );
  };

  const handleSubmit = async () => {
    if (attendances.length === 0) {
      toast.error("No attendance data to submit");
      return;
    }
    setLoading(true);
    try {
      await AttendanceService.postAttendance({
        date: date.format("YYYY-MM-DD"),
        records: attendances
      });

      queryClient.invalidateQueries({
        queryKey: ["attendance", date.format("YYYY-MM-DD")]
      });

      toast.success("Attendance submitted successfully!");
      setInitialAttendances(attendances);
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong while submitting");
    }
    setLoading(false);
  };

  const handleDateChange = (value: Dayjs | null) => {
    if (!value) return;
    setDate(value);
  };

  const handleReset = () => {
    setAttendances(initialAttendances);
  };

  return (
    <>
      <Box sx={{position: 'sticky', top: 0, left: 0}}>
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

        <Grid container spacing={1.5} sx={{ mt: 1, px: 5 }}>
          <Grid size={6}>
            <Button variant="outlined" color="info" onClick={handleReset} disabled={loading} fullWidth>
              Reset
            </Button>
          </Grid>

          <Grid size={6}>
            <Button variant="contained" color="info" onClick={handleSubmit} disabled={loading} fullWidth>
              {loading ? "Submitting..." : "Submit"}
            </Button>
          </Grid>
        </Grid>
      </Box>

      <Divider sx={{ mt: 1.5, mx: 1.5 }} />

      <InfiniteListWrapper
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
            key={row.id}
            row={row}
            attendance={attendances.find(a => a.patient_id === row.id)}
            onToggle={onToggle}
          />
        )}
        SkeletonComponent={AttendanceListRowSkeleton}
        placeholderMessage="No attendance found for selected date"
        placeholderIcon={<EventAvailableIcon sx={{ fontSize: 48, opacity: 0.6 }} />}
      />
    </>
  )
}

export default AttendanceListView;
