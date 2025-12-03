import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import DiseaseListRow from '../disease-list-row'
import DiseaseListRowSkeleton from '../disease-list-row-skeleton'
import { DiseaseService } from '@/services'
import { DiseaseModel } from '@/models'
import AddIcon from '@mui/icons-material/Add'
import HealingOffIcon from '@mui/icons-material/Healing';
import { useRouter } from 'next/navigation'
import { paths } from '@/routes/paths'

const DiseaseListView = () => {
  const router = useRouter()

  return (
    <InfiniteListWrapper
      queryKey="diseases"
      queryFn={({ pageParam, search }) =>
        DiseaseService.getList({ page: pageParam, search, limit: 10 })
      }
      renderItem={(disease: DiseaseModel) => <DiseaseListRow key={disease.id} row={disease} />}
      SkeletonComponent={DiseaseListRowSkeleton}
      placeholderMessage="No diseases found"
      placeholderIcon={<HealingOffIcon sx={{ fontSize: 48, opacity: 0.6 }} />}
      fabProps={{
        onClick: () => router.push(paths.disease.new),
        icon: <AddIcon />,
        color: 'primary',
      }}
    />
  )
}

export default DiseaseListView
