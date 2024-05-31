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
  updateList("incomeList", incomes);
  updateList("expenseList", expenses);
  updateBalance();
}
function updateList(id, items) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  items.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.amount.toFixed(2)} PLN`;
    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
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
    deleteButton.addEventListener("click", function () {
      items.splice(index, 1);
      update();
    });
    li.appendChild(editButton);
    li.appendChild(deleteButton);
    list.appendChild(li);
  });
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
  document.getElementById("balance").textContent = balanceText;
}
