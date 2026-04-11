import { useEffect, useState } from "react";
import { getLoans } from "../utils/LocalStorage";

import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";

export default function Dashboard() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    try {
      const data = getLoans();
      setLoans(Array.isArray(data) ? data : []);
    } catch (err) {
      console.log("Dashboard error:", err);
      setLoans([]);
    }
  }, []);

  const total = loans.reduce((s, l) => s + Number(l.amount || 0), 0);
  const approved = loans.filter(l => l.status === "Approved").length;
  const rejected = loans.filter(l => l.status === "Rejected").length;
  const pending = loans.filter(l => l.status === "Pending").length;

  const pieData = [
    { name: "Approved", value: approved },
    { name: "Rejected", value: rejected },
    { name: "Pending", value: pending },
  ];

  const COLORS = ["#22c55e", "#ef4444", "#facc15"];

  const barData = loans.map((l, i) => ({
    name: `Loan ${i + 1}`,
    amount: Number(l.amount || 0),
  }));

  const lineData = loans.map((l, i) => ({
    name: i + 1,
    amount: Number(l.amount || 0),
  }));

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🏦 Fintech Dashboard</h2>

      {/* METRICS */}
      <div style={styles.grid}>
        <div style={styles.card}>
          <h3>Total Loans</h3>
          <h1>{loans.length}</h1>
        </div>

        <div style={styles.card}>
          <h3>Total Volume</h3>
          <h1>KES {total}</h1>
        </div>

        <div style={styles.card}>
          <h3>Approved</h3>
          <h1 style={{ color: "#22c55e" }}>{approved}</h1>
        </div>

        <div style={styles.card}>
          <h3>Rejected</h3>
          <h1 style={{ color: "#ef4444" }}>{rejected}</h1>
        </div>
      </div>

      {/* CHARTS */}
      <div style={styles.chartGrid}>

        {/* PIE */}
        <div style={styles.card}>
          <h3>Loan Status Distribution</h3>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={pieData} dataKey="value" outerRadius={80} label>
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* BAR */}
        <div style={styles.card}>
          <h3>Loan Amounts</h3>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#38bdf8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* LINE */}
        <div style={styles.card}>
          <h3>Loan Growth Trend</h3>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={lineData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="amount" stroke="#a78bfa" />
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
}

/* ================= STYLES ================= */
const styles = {
  container: {
    padding: "20px",
    minHeight: "100vh",
    background: "#0b1220",
    color: "#fff",
  },

  title: {
    textAlign: "center",
    marginBottom: "20px",
    color: "#38bdf8",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
  },

  chartGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
    gap: "15px",
    marginTop: "20px",
  },

  card: {
    background: "#111827",
    padding: "15px",
    borderRadius: "12px",
    boxShadow: "0 5px 15px rgba(0,0,0,0.4)",
  },
};