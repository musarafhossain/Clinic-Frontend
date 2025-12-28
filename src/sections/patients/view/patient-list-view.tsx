import { useState } from 'react'
import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import PatientListRow from '../patient-list-row'
import PatientListRowSkeleton from '../patient-list-row-skeleton'
import { PatientService } from '@/services'
import { PatientModel } from '@/models'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'
import { paths } from '@/routes/paths'
import { PATIENT_STATUS } from '@/helpers/enum'
import { Tabs, Tab, Box, Paper, Divider } from '@mui/material'

const tabLabels = [
  { label: 'All', value: '' },
  { label: 'Ongoing', value: PATIENT_STATUS.ONGOING },
  { label: 'Completed', value: PATIENT_STATUS.COMPLETED },
  { label: 'Cancelled', value: PATIENT_STATUS.CANCELLED },
]

const PatientListView = () => {
  const router = useRouter()
  const [status, setStatus] = useState<"" | PATIENT_STATUS>("")

  const handleTabChange = (_: React.SyntheticEvent, newValue: "" | PATIENT_STATUS) => {
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
          {tabLabels.map((tab) => (
            <Tab key={tab.value} label={tab.label} value={tab.value} />
          ))}
        </Tabs>
      </Paper>

      <Divider />

      <InfiniteListWrapper
        sx={{ flex: 1, height: 'auto', minHeight: 0 }}
        queryKey={['patients', status]}
        queryFn={({ pageParam, search }) =>
          PatientService.getList({ page: pageParam, search, status })
        }
        renderItem={(patient: PatientModel) => (
          <PatientListRow key={patient.id} row={patient} status={status} />
        )}
        SkeletonComponent={PatientListRowSkeleton}
        placeholderMessage="No patients found"
        fabProps={{
          onClick: () => router.push(paths.patient.new),
          icon: <AddIcon />,
          color: 'primary',
        }}
      />
    </Box>
  )
}

export default PatientListView
