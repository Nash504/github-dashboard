"use client";
import { useState ,useEffect} from "react";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend,ResponsiveContainer } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// Config for the chart
const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "#c2f245",
  },
};

// Helper to clean the user contributions
function formatUsers(usersObj) {
  const entries = Object.entries(usersObj || {});
  return entries.map(([name, [raw]]) => {
    const number = parseInt(raw.replace(/[^0-9]/g, ""));
    return { name, contributions: number };
  });
}

export default function ExampleChart() {
  const [users] = useState(['deiondz', 'Nash504', 'srijankulal','VinshMachado','shadow1951']);
  const [data, setData] = useState({});

  useEffect(() => {
    users.forEach(user => {
      fetch(`/api/github/?user=${user}`)
        .then((response) => {
          if (!response.ok) throw new Error('Network response was not ok');
          return response.json();
        })
        .then((userData) => {
          setData(prev => ({ ...prev, [user]: userData.contributions || [] }));
        })
        .catch((err) => {
          console.error(err);
          setData(prev => ({ ...prev, [user]: { error: err.message } }));
        });
    });
  }, [users]);

  const chartData = formatUsers(data);

  return (
    <ChartContainer config={chartConfig} className="h-60 w-full ">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip
            contentStyle={{
              backgroundColor: "#1f2937",
              border: "none",
              color: "#c2f245",
            }}
            itemStyle={{ color: "#c2f245" }}
            cursor={{ fill: "#c2f245", opacity: 0.3 }}
          />
          <Legend />
          <Bar
            dataKey="contributions"
            fill="#c2f245"
            radius={[10, 10, 0, 0]}
            isAnimationActive={true}
            animationDuration={1000}
            animationEasing="ease-out"
            label={{ position: "top", fill: "#c2f245", fontSize: 12 }}
          />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  );
}
