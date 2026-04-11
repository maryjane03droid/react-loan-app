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
  ResponsiveContainer
} from "recharts";

export default function Dashboard() {
  const [loans, setLoans] = useState([]);

  useEffect(() => {
    setLoans(getLoans());
  }, []);

  // 📊 summary
  const totalAmount = loans.reduce((sum, l) => sum + Number(l.amount || 0), 0);

  const pending = loans.filter(l => l.status === "Pending").length;
  const approved = loans.filter(l => l.status === "Approved").length;

  // 🥧 pie data
  const pieData = [
    { name: "Pending", value: pending },
    { name: "Approved", value: approved }
  ];

  const COLORS = ["#facc15", "#22c55e"];

  // 📊 bar data
  const barData = loans.map((l, i) => ({
    name: `Loan ${i + 1}`,
    amount: Number(l.amount)
  }));

  return (
    <div style={{ padding: "20px" }}>
      <h2>Analytics Dashboard</h2>

      {/* 📌 STATS CARDS */}
      <div className="card">
        <h3>Overview</h3>
        <p><b>Total Loans:</b> {loans.length}</p>
        <p><b>Total Amount:</b> KES {totalAmount}</p>
      </div>

      {/* 📊 CHARTS SECTION */}
      <div style={{ display: "flex", gap: "20px", flexWrap: "wrap" }}>

        {/* PIE CHART */}
        <div className="card" style={{ flex: 1, minWidth: "300px" }}>
          <h3>Loan Status</h3>

          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={index} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>

          <p>🟡 Pending vs 🟢 Approved loans</p>
        </div>

        {/* BAR CHART */}
        <div className="card" style={{ flex: 1, minWidth: "300px" }}>
          <h3>Loan Amounts</h3>

          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={barData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="amount" fill="#4da3ff" />
            </BarChart>
          </ResponsiveContainer>

          <p>Each loan amount comparison</p>
        </div>

      </div>
    </div>
  );
}