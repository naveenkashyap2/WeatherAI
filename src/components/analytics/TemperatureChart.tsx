import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
} from "recharts";
import { useTheme } from "../../context/ThemeContext";

export default function TemperatureChart({ forecast }: { forecast: any }) {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const data = (forecast?.list || []).slice(0, 16).map((d: any) => ({
    time: new Date(d.dt * 1000).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    temp: Math.round(d.main.temp),
  }));

  return (
    <ResponsiveContainer width="100%" height={260}>
      <AreaChart data={data}>
        <defs>
          <linearGradient id="tempGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#f97316" stopOpacity={0.9} />
            <stop offset="100%" stopColor="#ef4444" stopOpacity={0.1} />
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
        <Area
          type="monotone"
          dataKey="temp"
          stroke="#f97316"
          strokeWidth={3}
          fill="url(#tempGrad)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
