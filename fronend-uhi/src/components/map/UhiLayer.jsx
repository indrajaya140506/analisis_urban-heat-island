import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

export default function UhiChart({ data }) {
 
 const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const d = payload[0].payload;
    const temp = d.lst;

    let label = temp < 25 ? "Dingin" : temp < 32 ? "Normal" : "Panas";
    let color = temp < 25 ? "text-blue-500" : temp < 32 ? "text-green-500" : "text-red-500";
    let desc = temp < 25 ? "Vegetasi tinggi" : temp < 32 ? "Stabil" : "Indikasi UHI Tinggi";

    return (
      <div className="bg-white/95 backdrop-blur-md shadow-xl border border-slate-100 rounded-xl p-4 w-64">

        {}
        <div className="mb-2 border-b pb-2">
          <p className="text-[10px] text-slate-400 uppercase tracking-widest">
            Analisis Suhu Wilayah
          </p>

          <p className="font-bold text-slate-800 text-sm">
            {d.region || "Selected Region"}
          </p>
        </div>

        {}
        <div className="flex justify-between items-center">
          <span className="text-xs text-slate-500">Tahun</span>
          <span className="font-bold text-slate-800">{d.year}</span>
        </div>

        {}
        <div className="mt-2">
          <p className="text-slate-500 text-xs">Land Surface Temperature</p>
          <p className="text-orange-500 font-extrabold text-xl">
            {temp} °C
          </p>
        </div>

        {}
        <div className="mt-2 flex items-center justify-between">
          <span className={`font-bold text-sm ${color}`}>
            {label}
          </span>
        </div>

        <p className="text-xs text-slate-500 mt-1">{desc}</p>

      </div>
    );
  }
  return null;
};

  return (
    
    <div className="w-full h-64 sm:h-80 md:h-96">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart 
          data={data} 
         
          margin={{ top: 10, right: 20, left: -15, bottom: 10 }}
        >
          <CartesianGrid
            stroke="#cbd5e1"
            strokeWidth={1.5}
            vertical={true}
            horizontal={true}
          />

          <XAxis
            dataKey="year"
            
            interval="preserveStartEnd"
            tick={{ fontSize: 10, fill: "#1e293b", fontWeight: 700 }}
            axisLine={{ stroke: "#0f172a", strokeWidth: 2.5 }}
            tickLine={{ stroke: "#0f172a", strokeWidth: 2 }}
            dy={8}
          />

          <YAxis
           
            tick={{ fontSize: 10, fill: "#1e293b", fontWeight: 700 }}
            axisLine={{ stroke: "#0f172a", strokeWidth: 2.5 }}
            tickLine={{ stroke: "#0f172a", strokeWidth: 2 }}
            domain={["dataMin - 0.5", "dataMax + 0.5"]}
          />

          {}
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: '#94a3b8', strokeWidth: 1 }}
          />

          <Line
            type="monotone"
            dataKey="lst"
            stroke="#16a34a"
            strokeWidth={2.5} 
            dot={false}
            activeDot={{
              r: 5,
              fill: "#ef4444",
              stroke: "#fff",
              strokeWidth: 2,
            }}
            animationDuration={1200}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}