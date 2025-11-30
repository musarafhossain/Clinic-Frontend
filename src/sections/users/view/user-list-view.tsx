import InfiniteListWrapper from '@/components/InfiniteListWrapper'
import UserListRow from '../user-list-row'
import UserListRowSkeleton from '../user-list-row-skeleton'
import { UserService } from '@/services'
import { UserModel } from '@/models'
import AddIcon from '@mui/icons-material/Add'
import { useRouter } from 'next/navigation'
import { paths } from '@/routes/paths'

const UserListView = () => {
  const router = useRouter()

  return (
    <InfiniteListWrapper
      queryKey="users"
      queryFn={({ pageParam, search }) =>
        UserService.getList({ page: pageParam, search })
      }
      renderItem={(user: UserModel) => <UserListRow key={user.id} row={user} />}
      SkeletonComponent={UserListRowSkeleton}
      placeholderMessage="No users found"
      fabProps={{
        onClick: () => router.push(paths.user.new),
        icon: <AddIcon />,
        color: 'primary',
      }}
    />
  )
}

export default UserListView
