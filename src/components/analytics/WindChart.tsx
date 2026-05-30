import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function WindChart({ forecast }: { forecast: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const data = (forecast?.list || []).slice(0, 16).map((d: any) => ({
    time: new Date(d.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    wind: +d.wind.speed.toFixed(1),
  }));
  return (
    <ResponsiveContainer width="100%" height={260}>
      <BarChart data={data}>
        <defs>
          <linearGradient id="windGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#a78bfa" />
            <stop offset="100%" stopColor="#6366f1" />
          </linearGradient>
        </defs>
        <CartesianGrid
          strokeDasharray="3 3"
          stroke={isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}
        />
        <XAxis
          dataKey="time"
          stroke={isDark ? "#94a3b8" : "#475569"}
          fontSize={11}
        />
        <YAxis stroke={isDark ? "#94a3b8" : "#475569"} fontSize={11} />
        <Tooltip
          contentStyle={{
            background: isDark ? "rgba(15,23,42,0.95)" : "white",
            border: `1px solid ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"}`,
            borderRadius: "12px",
            color: isDark ? "white" : "black",
          }}
        />
        <Bar dataKey="wind" fill="url(#windGrad)" radius={[8, 8, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
