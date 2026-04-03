import React, { useState } from "react";
import Layout from "../components/Layout";
import transactionsData from "../data/dummyData";
import "../style/Transaction.css";

const Transactions = () => {
 
  const [role, setRole] = useState("viewer"); 

const [transactions, setTransactions] = useState(transactionsData);
  const [form, setForm] = useState({
    date: "",
    amount: "",
    category: "",
    type: "expense",
  });

  const [filter, setFilter] = useState("all");

  // Handle input
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Add transaction
  const addTransaction = () => {
    if (!form.amount || !form.category || !form.date) return;

    const newTx = {
      id: Date.now(),
      ...form,
      amount: Number(form.amount),
    };

    setTransactions([newTx, ...transactions]);

    setForm({
      date: "",
      amount: "",
      category: "",
      type: "expense",
    });
  };

  // Filter logic
  const filteredData =
    filter === "all"
      ? transactions
      : transactions.filter((tx) => tx.type === filter);

  // JSON Export
  const exportJSON = () => {
    const dataStr = JSON.stringify(transactions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.json";
    a.click();
  };

  // CSV Export
  const exportCSV = () => {
    const headers = ["Date", "Amount", "Category", "Type"];

    const rows = transactions.map((tx) => [
      tx.date,
      tx.amount,
      tx.category,
      tx.type,
    ]);

    const csvContent = [
      headers.join(","),
      ...rows.map((row) => row.join(",")),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "transactions.csv";
    a.click();
  };

  return (
    <Layout>
      <div className="transactions">

        <h2>Transactions</h2>

<div style={{ marginBottom: "10px" }}>
  <select value={role} onChange={(e) => setRole(e.target.value)}>
    <option value="viewer">Viewer</option>
    <option value="admin">Admin</option>
  </select>
</div>
        {/* FORM */}
        {role == "admin" && (
        <div className="form">
          <input type="date" name="date" value={form.date} onChange={handleChange} />
          <input type="number" name="amount" placeholder="Amount" value={form.amount} onChange={handleChange} />
          <input type="text" name="category" placeholder="Category" value={form.category} onChange={handleChange} />

          <select name="type" value={form.type} onChange={handleChange}>
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>

          <button onClick={addTransaction}>Add</button>
        </div>
        )}
        {/* FILTER */}
        <div className="filter">
          <button onClick={() => setFilter("all")}>All</button>
          <button onClick={() => setFilter("income")}>Income</button>
          <button onClick={() => setFilter("expense")}>Expense</button>
        </div>

        {/* 🔥 TABLE WRAPPER */}
        <div className="table-container">
          <div className="table-inner">

            <div className="table-header">
              <h3>All Transactions</h3>

              <div className="export-buttons">
                <button onClick={exportJSON}>JSON</button>
                <button onClick={exportCSV}>CSV</button>
              </div>
            </div>
<div className="table-scroll">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Type</th>
                </tr>
              </thead>

              <tbody>
                {filteredData.map((tx) => (
                  <tr key={tx.id}>
                    <td>{tx.date}</td>

                    <td className={tx.type === "income" ? "income" : "expense"}>
                      {tx.type === "income" ? "+" : "-"} ₹{tx.amount}
                    </td>

                    <td>
                      <span className="category-badge">{tx.category}</span>
                    </td>

                    <td>
                      <span className={tx.type === "income" ? "type income" : "type expense"}>
                        {tx.type}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
</div>
          </div>
        </div>

      </div>
    </Layout>
  );
};

export default Transactions;