import { useDispatch, useSelector } from 'react-redux'
import { Admin, Loading } from '../components'
import { adminDetails } from '../redux/features/user/userSlice'
import { useEffect } from 'react'

const Dashboard = () => {
  // GET ID FROM REDUX
  const { id: userId, isLoading } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(adminDetails(userId))
  }, [])

  const { data } = useSelector((state) => state.user)

  return isLoading ? (
    <Loading />
  ) : (
    <Admin
      amount={data?.amount}
      charge_customers={data?.charge_customers}
      id={data?.id}
      location={data?.location}
      name={data?.name}
    />
  )
}

export default Dashboard
