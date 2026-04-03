const transactionsData = [];

const categories = ["Food", "Travel", "Shopping", "Bills", "Salary", "Freelance"];

let id = 1;

for (let month = 1; month <= 12; month++) {
  for (let i = 1; i <= 10; i++) {

    const type = Math.random() > 0.4 ? "income" : "expense";

    const amount =
      type === "income"
        ? Math.floor(Math.random() * 5000 + 2000)
        : Math.floor(Math.random() * 1000 + 100);

    const category =
      type === "income"
        ? ["Salary", "Freelance"][Math.floor(Math.random() * 2)]
        : categories[Math.floor(Math.random() * categories.length)];

    const date = `2026-${String(month).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

    transactionsData.push({
      id: id++,
      date,
      amount,
      category,
      type,
    });
  }
}

export default transactionsData;