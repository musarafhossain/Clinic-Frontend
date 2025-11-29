import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import ListRow from '../list-row'
import ListRowSkeleton from '../list-row-skeleton'
import { UserService } from '@/services'
import { UserModel } from '@/models'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'
import { paths } from '@/routes/paths'

const ListView = () => {
  const router = useRouter()

  return (
    <InfiniteListWrapper
      queryKey="users"
      queryFn={({ pageParam, search }) =>
        UserService.getList({ page: pageParam, search })
      }
      renderItem={(user: UserModel) => <ListRow key={user.id} row={user} />}
      SkeletonComponent={ListRowSkeleton}
      placeholderMessage="No users found"
      fabProps={{
        onClick: () => router.push(paths.user.new),
        icon: <AddIcon />,
        color: 'primary',
      }}
    />
  )
}

export default ListView
