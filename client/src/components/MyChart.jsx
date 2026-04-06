
import ReactFrappeChart from "react-frappe-charts";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function MyChart({data}) {

  // const labels = data.map(item=>item.date);
  // const rates = data.map(item => item.rate);

  const result = data.map(item => {
  const d = new Date(item.date);

  return {
    day: d.toLocaleDateString("en-US", { weekday: "short", day: "numeric" }),
    value: item.rate
  };

  
})
// console.log(result)
// Mock data for the chart
  return (
    <div>

     <div style={{ height: 200,width:"100%"}}>
                <ResponsiveContainer >
                  <LineChart data={result}>
                    <CartesianGrid vertical={false} stroke="#f1f3f5" />
                    <XAxis dataKey="day"  />
                    <YAxis YAxis domain={['dataMin - 5', 'dataMax + 5']} tickCount={5} />
                    <Tooltip />
                    <Line type="monotone" dataKey="value" stroke="#10b981" strokeWidth={2} dot={false} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
    </div>
  );
}