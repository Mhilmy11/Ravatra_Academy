export default function KpiCard({ title, value, icon, color }) {
  return (
    <div
      className={`p-5 rounded-2xl shadow-lg text-white
      bg-gradient-to-r ${color} flex items-center justify-between`}
    >
      <div>
        <p className="text-sm opacity-80">{title}</p>
        <h2 className="text-2xl font-bold">{value}</h2>
      </div>

      <div className="text-3xl opacity-80">{icon}</div>
    </div>
  );
}
