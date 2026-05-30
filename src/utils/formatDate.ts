export const formatTime = (ts: number) => {
  const d = new Date(ts * 1000);
  return d.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
};

export const formatDate = (ts: number) => {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString([], { weekday: "short", month: "short", day: "numeric" });
};

export const formatDay = (ts: number) => {
  const d = new Date(ts * 1000);
  return d.toLocaleDateString([], { weekday: "long" });
};

export const formatHour = (dtTxt: string) => {
  const d = new Date(dtTxt);
  return d.toLocaleTimeString([], { hour: "numeric" });
};
