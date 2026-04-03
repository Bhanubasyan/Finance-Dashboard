import React, { useState } from "react";
import Layout from "../components/Layout";
import transactionsData from "../data/dummyData";
import "../style/Dashboard.css";

import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  PieChart,
  Pie,
  Cell,
  Legend,
  BarChart,
  Bar,
} from "recharts";

const Dashboard = () => {

  // ✅ Load data (localStorage + fallback)
  const [transactions] = useState(() => {
    const saved = localStorage.getItem("transactions");
    return saved ? JSON.parse(saved) : transactionsData;
  });

  // ================= 💰 CALCULATIONS =================
  const totalIncome = transactions
    .filter(t => t.type === "income")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const totalExpense = transactions
    .filter(t => t.type === "expense")
    .reduce((acc, curr) => acc + curr.amount, 0);

  const balance = totalIncome - totalExpense;

  // ================= 📈 MONTHLY DATA =================
  const monthlyData = Object.values(
    transactions.reduce((acc, tx) => {
      const month = tx.date.slice(0, 7);

      if (!acc[month]) {
        acc[month] = { month, income: 0, expense: 0 };
      }

      if (tx.type === "income") {
        acc[month].income += tx.amount;
      } else {
        acc[month].expense += tx.amount;
      }

      return acc;
    }, {})
  );

  // ================= 📊 PIE CHART =================
  const pieData = Object.values(
    transactions.reduce((acc, tx) => {
      if (!acc[tx.category]) {
        acc[tx.category] = { name: tx.category, value: 0 };
      }
      acc[tx.category].value += tx.amount;
      return acc;
    }, {})
  );

  const COLORS = ["#F29F67", "#3B8FF3", "#34B1AA", "#FF6B6B", "#00C9A7"];

  return (
    <Layout>
      <div className="dashboard">

        {/* 🔥 Cards */}
        <div className="cards">

          <div className="card balance">
            <div className="card-top">
              <p>Total Balance</p>
              <span>💰</span>
            </div>
            <h2>₹{balance}</h2>
          </div>

          <div className="card income">
            <div className="card-top">
              <p>Income</p>
              <span>📈</span>
            </div>
            <h2>₹{totalIncome}</h2>
          </div>

          <div className="card expense">
            <div className="card-top">
              <p>Expense</p>
              <span>📉</span>
            </div>
            <h2>₹{totalExpense}</h2>
          </div>

        </div>

        {/* 🔥 Charts Row */}
        <div className="charts">

          {/* 📈 Line Chart */}
          <div className="chart-left">
            <h3>Monthly Trend</h3>

            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#eee" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />

                <Line
                  type="natural"
                  dataKey="income"
                  stroke="#F29F67"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

                <Line
                  type="natural"
                  dataKey="expense"
                  stroke="#ff4d4d"
                  strokeWidth={3}
                  dot={{ r: 4 }}
                />

              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* 📊 Right Section */}
          <div className="chart-right">

            <div className="status-card">
              <h4>Status Summary</h4>
              <h2>₹{balance}</h2>
            </div>

            <div className="pie-box">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Tooltip />

                  <Pie
                    data={pieData}
                    dataKey="value"
                    innerRadius={50}
                    outerRadius={90}
                    paddingAngle={5}
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>

          </div>

        </div>

        {/* 🔥 Bar Chart Bottom */}
        <div className="bar-chart-section">
          <h3>Monthly Income vs Expense</h3>

          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyData}>

              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />

              <Bar dataKey="income" fill="#00ff9f" radius={[10, 10, 0, 0]} />
              <Bar dataKey="expense" fill="#ff4d4d" radius={[10, 10, 0, 0]} />

            </BarChart>
          </ResponsiveContainer>
        </div>

      </div>
    </Layout>
  );
};

export default Dashboard;