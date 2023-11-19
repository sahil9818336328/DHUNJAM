import { useDispatch, useSelector } from 'react-redux'
import { Admin, Loading } from '../components'
import { adminDetails } from '../redux/features/user/userSlice'
import { useEffect } from 'react'

const Dashboard = () => {
  // GET ID AND LOADING FROM REDUX
  const { id, isLoading } = useSelector((state) => state.user)

  const dispatch = useDispatch()

  // CALL ADMIN API TO GET ADMIN DETAILS
  useEffect(() => {
    dispatch(adminDetails(id))
  }, [])

  // ONCE DATA IS UPDATED IN REDUX PASS IT THROUGH THE ADMIN COMPONENT
  const { data } = useSelector((state) => state.user)

  // IF API IS PENDING SHOW LOADING ELSE SHOW THE ADMIN VIEW
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
