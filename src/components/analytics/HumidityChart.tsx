import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function HumidityChart({ forecast }: { forecast: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const data = (forecast?.list || []).slice(0, 16).map((d: any) => ({
    time: new Date(d.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    humidity: d.main.humidity,
  }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <LineChart data={data}>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
        />
        <XAxis
          dataKey="time"
          stroke={isDark ? "#94a3b8" : "#475569"}
          fontSize={11}
        />
        <YAxis
          stroke={isDark ? "#94a3b8" : "#475569"}
          fontSize={11}
          domain={[0, 100]}
        />
        <Tooltip
          contentStyle={{
            background: isDark ? "rgba(15,23,42,0.95)" : "white",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: "12px",
            color: isDark ? "white" : "black",
          }}
        />
        <Line
          type="monotone"
          dataKey="humidity"
          stroke="#22d3ee"
          strokeWidth={3}
          dot={{ fill: "#22d3ee", r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
