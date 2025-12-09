'use client';
import { Box, Stack, Typography, Divider, Grid } from '@mui/material';
import { BarChart } from '@mui/x-charts/BarChart';
import StatCard from '@/sections/patients/stat-card';
import { useTheme } from '@mui/material';

const HomeView = () => {
  const theme = useTheme();
  const attendanceData = [5, 8, 7, 6, 9, 10, 4];
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const isDark = theme.palette.mode === "dark";

  const colors = {
    attendance: isDark ? "#9a0064ff" : "#f9e5f5",
    revenue: isDark ? "#009b0aff" : "#e5f9e6",
    total: isDark ? "#0055a0ff" : "#e5f3f9",
    ongoing: isDark ? "#8b8600ff" : "#f9f7e5",
    completed: isDark ? "#008f1aff" : "#e6f9e5",
    cancelled: isDark ? "#8f0000ff" : "#f9e5e5",
  };

  const attendanceColors = [
    "#ff6b6b",
    "#ffa94d",
    "#feca57",
    "#48dbfb",
    "#1dd1a1",
    "#5f27cd",
    "#ee5253",
  ];

  const chartSetting = {
    yAxis: [
      {
        label: 'Attendaces',
        width: 25,
      },
    ],
    xAxis: [
      {
        label: 'Days',
        data: labels,
      }
    ],
    height: 200,
    hideLegend: true,
  };

  return (
    <Stack>
      <Box sx={{ p: 1.5 }}>
        <Typography variant='subtitle2' fontWeight={600} color='gray'>
          Today's Stats
        </Typography>
        <Divider sx={{ mb: 1 }} />

        <Grid container spacing={2}>
          <Grid size={6}>
            <StatCard title="Today's Attendance" color={colors.attendance} value={0} />
          </Grid>
          <Grid size={6}>
            <StatCard title="Todays' Revenue" color={colors.revenue} value={`₹ 0`} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 1.5 }}>
        <Typography variant='subtitle2' fontWeight={600} color='gray'>
          Patient's Stats
        </Typography>
        <Divider sx={{ mb: 1 }} />
        <Grid container spacing={2}>
          <Grid size={6}>
            <StatCard title="Total Patient" color={colors.total} value={0} />
          </Grid>
          <Grid size={6}>
            <StatCard title="Ongoing Patient" color={colors.ongoing} value={0} />
          </Grid>
          <Grid size={6}>
            <StatCard title="Completed Patient" color={colors.completed} value={0} />
          </Grid>
          <Grid size={6}>
            <StatCard title="Cancelled Patient" color={colors.cancelled} value={0} />
          </Grid>
        </Grid>
      </Box>

      <Box sx={{ p: 1.5, mt: 1 }}>
        <Typography variant='subtitle2' fontWeight={600} color='gray'>
          Last 7 Days Attendance
        </Typography>
        <Divider sx={{ mb: 2 }} />

        <BarChart
          series={[
            {
              data: attendanceData,
            },
          ]}
          {...chartSetting}
          sx={{
            "& .MuiBarElement-root": {
              rx: 6,
            },
            "& .MuiBarElement-root:nth-of-type(1)": { fill: attendanceColors[0] },
            "& .MuiBarElement-root:nth-of-type(2)": { fill: attendanceColors[1] },
            "& .MuiBarElement-root:nth-of-type(3)": { fill: attendanceColors[2] },
            "& .MuiBarElement-root:nth-of-type(4)": { fill: attendanceColors[3] },
            "& .MuiBarElement-root:nth-of-type(5)": { fill: attendanceColors[4] },
            "& .MuiBarElement-root:nth-of-type(6)": { fill: attendanceColors[5] },
            "& .MuiBarElement-root:nth-of-type(7)": { fill: attendanceColors[6] },
          }}
        />
      </Box>
    </Stack>
  );
};

export default HomeView;
