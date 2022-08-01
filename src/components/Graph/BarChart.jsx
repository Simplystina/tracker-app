import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import "./BarChart.css"
import graph from '../../images/graph.png'

const BarChartComponent = ({ data }) => {
  return (
    <>
    <h2 className='chart-heading'>Monthly Applications</h2>
    <div className="chart-container">
    <ResponsiveContainer  width='100%' height={300}>
      <BarChart data={data} margin={{ top: 50 }}>
        <CartesianGrid strokeDasharray='10 10 ' />
        <XAxis dataKey='date' />
        <YAxis allowDecimals={false} />
        <Tooltip />
        <Bar dataKey='count' fill='#3b82f6' barSize={75} />
      </BarChart>
    </ResponsiveContainer>
    </div>
    </>
  );
};
export default BarChartComponent;
