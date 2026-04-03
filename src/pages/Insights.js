import React from "react";
import Layout from "../components/Layout";
import "../style/Insights.css";

const Insights = () => {
  // Dummy data (baad me context se ayega)
  const transactions = [
    { amount: 5000, category: "Salary", type: "income" },
    { amount: 200, category: "Food", type: "expense" },
    { amount: 1000, category: "Travel", type: "expense" },
    { amount: 800, category: "Food", type: "expense" },
  ];

  // Total income
  const income = transactions
    .filter((t) => t.type === "income")
    .reduce((acc, t) => acc + t.amount, 0);

  // Total expense
  const expense = transactions
    .filter((t) => t.type === "expense")
    .reduce((acc, t) => acc + t.amount, 0);

  // Category breakdown
  const categoryMap = {};
  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryMap[t.category] =
        (categoryMap[t.category] || 0) + t.amount;
    }
  });

  // Highest spending category
  let maxCategory = "";
  let maxAmount = 0;

  for (let cat in categoryMap) {
    if (categoryMap[cat] > maxAmount) {
      maxAmount = categoryMap[cat];
      maxCategory = cat;
    }
  }

  return (
    <Layout>
      <div className="insights">

        <h2>Insights</h2>

        {/* Cards */}
        <div className="insight-cards">

          <div className="insight-card income" >
            <h4>Total Income</h4>
            <h2>₹{income}</h2>
          </div>

          <div className="insight-card expense">
            <h4>Total Expense</h4>
            <h2>₹{expense}</h2>
          </div>

          <div className="insight-card category">
            <h4>Top Spending Category</h4>
            <h2>{maxCategory} (₹{maxAmount})</h2>
          </div>

        </div>

        {/* Observations */}
        <div className="insight-box">
          <h3>Observations</h3>

          <p>
            You spent more on <b>{maxCategory}</b>. Try reducing it to save money.
          </p>

          <p>
            Your expenses are {expense > income ? "higher" : "under control"} compared to income.
          </p>
        </div>

      </div>
    </Layout>
  );
};

export default Insights;