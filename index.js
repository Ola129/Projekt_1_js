"use strict";

let incomes = [];
let expenses = [];

document.getElementById("form").addEventListener("submit", function (event) {
  event.preventDefault();
  const name = document.getElementById("name").value;
  const amount = parseFloat(document.getElementById("amount").value);
  const type = document.getElementById("type").value;
  if (type === "income") {
    incomes.push({ name, amount });
  } else {
    expenses.push({ name, amount });
  }
  update();
});

function update() {
  updateList("incomeList", incomes, "totalIncome");
  updateList("expenseList", expenses, "totalExpense");
  updateBalance();
  if (incomes.length > 0 || expenses.length > 0) {
    document.querySelector("h2.accountBalance").style.display = "block";
  }
}
function updateList(id, items, totalId) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  let total = 0;
  items
    .slice()
    .reverse()
    .forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.name}: ${item.amount.toFixed(2)} PLN`;
      li.classList.add("list-item");
      const editButton = document.createElement("button");
      editButton.textContent = "Edytuj";
      editButton.classList.add("edit-button");
      editButton.addEventListener("click", function () {
        const newName = prompt("Podaj nową nazwę:", item.name);
        const newAmount = parseFloat(prompt("Podaj nową kwotę:", item.amount));
        if (newName !== null && !isNaN(newAmount)) {
          item.name = newName;
          item.amount = newAmount;
          update();
        }
      });
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Usuń";
      deleteButton.classList.add("delete-button");
      deleteButton.addEventListener("click", function () {
        items.splice(index, 1);
        update();
      });
      li.appendChild(editButton);
      li.appendChild(deleteButton);
      list.appendChild(li);
      total += item.amount;
    });
  document.getElementById(totalId).textContent = `Suma: ${total.toFixed(
    2
  )} PLN`;
}

function updateBalance() {
  const incomeTotal = incomes.reduce(
    (total, income) => total + income.amount,
    0
  );
  const expenseTotal = expenses.reduce(
    (total, expense) => total - expense.amount,
    0
  );
  const balance = incomeTotal + expenseTotal;
  let balanceText = "";
  if (balance > 0) {
    balanceText = `Możesz jeszcze wydać ${balance.toFixed(2)} złotych`;
  } else if (balance < 0) {
    balanceText = `Bilans jest ujemny. Jesteś na minusie ${(-balance).toFixed(
      2
    )} złotych`;
  } else {
    balanceText = "Bilans wynosi zero";
  }
  document.getElementById("accountBalance").textContent = balanceText;
}
