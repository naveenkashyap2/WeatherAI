export const getWeatherGradient = (main: string, isDay = true) => {
  const m = (main || "").toLowerCase();
  if (m.includes("thunder")) return "from-slate-900 via-indigo-900 to-purple-900";
  if (m.includes("rain") || m.includes("drizzle")) return "from-slate-700 via-blue-800 to-cyan-700";
  if (m.includes("snow")) return "from-sky-400 via-blue-400 to-indigo-400";
  if (m.includes("mist") || m.includes("fog") || m.includes("haze")) return "from-slate-500 via-slate-600 to-slate-700";
  if (m.includes("cloud")) return isDay ? "from-slate-600 via-slate-700 to-blue-800" : "from-slate-800 via-slate-900 to-indigo-900";
  if (m.includes("clear")) return isDay ? "from-cyan-500 via-blue-500 to-indigo-600" : "from-indigo-900 via-purple-900 to-slate-900";
  return "from-blue-600 via-indigo-600 to-purple-700";
};

export const getWeatherEmoji = (main: string) => {
  const m = (main || "").toLowerCase();
  if (m.includes("thunder")) return "⛈️";
  if (m.includes("rain") || m.includes("drizzle")) return "🌧️";
  if (m.includes("snow")) return "❄️";
  if (m.includes("mist") || m.includes("fog")) return "🌫️";
  if (m.includes("cloud")) return "☁️";
  if (m.includes("clear")) return "☀️";
  return "🌤️";
};

export const generateAIInsight = (weather: any) => {
  if (!weather) return "Loading weather intelligence...";
  const temp = weather.main?.temp ?? 20;
  const main = weather.weather?.[0]?.main ?? "Clear";
  const humidity = weather.main?.humidity ?? 50;
  const wind = weather.wind?.speed ?? 0;

  const tips: string[] = [];
  if (temp > 32) tips.push("🔥 Extreme heat detected. Stay hydrated and avoid direct sunlight between 11 AM and 4 PM.");
  else if (temp > 25) tips.push("☀️ Warm and pleasant. Perfect for outdoor activities — consider a light hat and sunglasses.");
  else if (temp > 15) tips.push("🌤️ Comfortable conditions. Great time for a walk or outdoor exercise.");
  else if (temp > 5) tips.push("🧥 Cool weather. A light jacket should keep you comfortable outside.");
  else tips.push("🥶 Cold weather alert. Bundle up with layers, gloves, and a warm hat before heading out.");

  if (main.toLowerCase().includes("rain")) tips.push("☔ Rain is expected. Carry an umbrella and plan indoor alternatives for outdoor events.");
  if (main.toLowerCase().includes("thunder")) tips.push("⚡ Thunderstorm alert. Stay indoors, avoid open areas, and unplug sensitive electronics.");
  if (main.toLowerCase().includes("snow")) tips.push("❄️ Snow in the forecast. Drive carefully and allow extra travel time.");
  if (humidity > 75) tips.push("💧 High humidity levels — expect muggy conditions and stay extra hydrated.");
  if (wind > 8) tips.push("💨 Strong winds detected. Secure loose objects and be cautious while driving.");
  if (temp > 28 && humidity < 40) tips.push("🧴 High UV risk. Apply sunscreen (SPF 30+) and wear protective clothing.");

  return tips.join(" ");
};

export const getAlert = (weather: any): { level: "info" | "warn" | "danger"; message: string } | null => {
  if (!weather) return null;
  const main = (weather.weather?.[0]?.main || "").toLowerCase();
  const wind = weather.wind?.speed ?? 0;
  const temp = weather.main?.temp ?? 20;

  if (main.includes("thunder")) return { level: "danger", message: "⚡ Thunderstorm warning in effect — seek shelter immediately." };
  if (main.includes("snow")) return { level: "warn", message: "❄️ Snow advisory — travel conditions may be hazardous." };
  if (temp >= 38) return { level: "danger", message: "🔥 Extreme heat wave — limit outdoor exposure." };
  if (wind >= 10) return { level: "warn", message: "💨 High wind warning — secure loose items." };
  if (main.includes("rain")) return { level: "info", message: "🌧️ Rain expected — carry an umbrella." };
  return null;
};
