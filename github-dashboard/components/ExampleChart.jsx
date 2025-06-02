"use client";

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, Legend } from "recharts";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

// Config for the chart
const chartConfig = {
  contributions: {
    label: "Contributions",
    color: "#60a5fa",
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

export default function ExampleChart({ users }) {
  const chartData = formatUsers(users);

  return (
    <ChartContainer config={chartConfig} className="min-h-[20px] w-80">
      <BarChart width={400} height={300} data={chartData}>
        <CartesianGrid vertical={true} />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="contributions" fill="#60a5fa" radius={20} />
      </BarChart>
    </ChartContainer>
  );
}
