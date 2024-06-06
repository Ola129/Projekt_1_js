"use strict";

let incomes = JSON.parse(localStorage.getItem("incomes")) || [];
let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let currentItem = null;
update();

const form = document.querySelector("#btn").closest("form");
form.addEventListener("submit", function (event) {
  event.preventDefault();
  const nameInput = document.getElementById("name");
  const amountInput = document.getElementById("amount");
  const type = document.getElementById("type").value;
  const amount = parseFloat(amountInput.value);
  if (amount > 0) {
    if (type === "income") {
      incomes.push({
        name: nameInput.value,
        amount: amount,
      });
    } else {
      expenses.push({
        name: nameInput.value,
        amount: amount,
      });
    }
    localStorage.setItem("incomes", JSON.stringify(incomes));
    localStorage.setItem("expenses", JSON.stringify(expenses));
    update();
    nameInput.value = "";
    amountInput.value = "";
  } else {
    alert("Kwota musi być większa od 0!");
  }
});

document
  .getElementById("modalForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const newName = document.getElementById("modalName").value;
    const newAmount = parseFloat(document.getElementById("modalAmount").value);
    if (newName !== null && newAmount > 0) {
      currentItem.name = newName;
      currentItem.amount = newAmount;
      update();
      document.getElementById("modal").style.display = "none";
    } else {
      alert("Kwota musi być większa od 0");
    }
  });

function update() {
  updateList("incomeList", incomes, "totalIncome");
  updateList("expenseList", expenses, "totalExpense");
  updateBalance();
  if (incomes.length > 0 || expenses.length > 0) {
    document.getElementById("accountBalance").style.display = "block";
  }
}
function updateList(id, items, totalId) {
  const list = document.getElementById(id);
  list.innerHTML = "";
  let total = 0;
  items.forEach((item, originalIndex) => {
    const li = document.createElement("li");
    li.textContent = `${item.name}: ${item.amount.toFixed(2)} PLN`;
    li.classList.add("list-item");
    const editButton = document.createElement("button");
    editButton.textContent = "Edytuj";
    editButton.classList.add("button");
    editButton.addEventListener("click", function () {
      currentItem = item;
      document.getElementById("modal").style.display = "block";
      document.getElementById("modalName").value = item.name;
      document.getElementById("modalAmount").value = item.amount;
    });
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Usuń";
    deleteButton.classList.add("button");
    deleteButton.addEventListener("click", function () {
      items.splice(originalIndex, 1);
      localStorage.setItem("incomes", JSON.stringify(incomes));
      localStorage.setItem("expenses", JSON.stringify(expenses));
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
