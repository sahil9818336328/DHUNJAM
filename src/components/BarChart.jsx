import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts'
import { StyledWrapper } from '../assets/wrappers/BarChart'

// eslint-disable-next-line react/prop-types
const BarChartComponent = ({ data }) => {
  return (
    <StyledWrapper>
      <ResponsiveContainer width='100%' height={300}>
        <BarChart data={data} margin={{ top: 50 }}>
          <CartesianGrid strokeDasharray='3 3 ' />
          <XAxis dataKey='category' />
          <YAxis allowDecimals={false} />
          <Tooltip />
          <Bar dataKey='value' fill='#f8d7da' barSize={75} />
        </BarChart>
      </ResponsiveContainer>
    </StyledWrapper>
  )
}

export default BarChartComponent
