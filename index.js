class HouseBudget {
  constructor() {
    this.income = [];
    this.expense = [];
  }
  addItem() {
    const name = document.getElementsByClassName("input1").value;
    const amount = document
      .getElementsByClassName("input2")
      .income.push({ name, amount: Number(amount) });
    updateList();
  }
  updateList() {
    const ul = document.getElementById("itemList");
    ul.innerHTML = "";
    items.forEach((item) => {
      const li = document.createElement("li");
      li.textContent = "${item.name}:${item.amount} PLN";
      ul.appendChild(li);
    });
  }
}

if (balance > 0) {
  return "Możesz jeszcze wydać ${balance} złotych";
} else if (balance < 0) {
  return "Bilans jest ujemny. Jesteś na minusie ${Math.abs(balance)} złotych";
} else {
  return "Bilans wynosi zero";
}
