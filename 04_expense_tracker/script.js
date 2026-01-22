document.addEventListener('DOMContentLoaded', () => {
  const expenseForm = document.getElementById("expense-form");
  const expenseNameInput = document.getElementById("expense-name");
  const expenseAmountInput = document.getElementById("expense-amount");
  const expenseList = document.getElementById("expense-list");
  const totalAmountDisplay = document.getElementById("total-amount");
  const total = document.getElementById("total");

  let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
  let totalAmount = calculateTotal();

  renderExpenses();
  updateTotal();

  expenseForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = expenseNameInput.value.trim();
    const amount = parseFloat(expenseAmountInput.value.trim());

    if(name !== "" && !isNaN(amount) && amount > 0){
      const newExpense = {
        id: Date.now(),
        name: name,
        amount: amount
      }

      expenses.push(newExpense);
      saveExpensesToLocal();
      renderExpenses();
      updateTotal();

      // Clear Input

      expenseNameInput.value= "";
      expenseAmountInput.value = "";
    }
  })

  function renderExpenses(){
    expenseList.innerHTML = "";

    if(expenses.length > 0){

      total.classList.remove('hidden');

      expenses.forEach(expense => {
      const li = document.createElement('li');
      li.innerHTML = `
      <span>${expense.name} - $${expense.amount}</span>
      <button data-id="${expense.id}">Delete</button>`;

      expenseList.appendChild(li);
    })
    }
    else{
      totalAmountDisplay.textContent = `$0.00`;
    }
  }
  function calculateTotal(){
    return expenses.reduce((sum, expense) => (sum + expense.amount), 0);
  }

  function updateTotal(){
    totalAmount = calculateTotal();
    totalAmountDisplay.textContent = totalAmount.toFixed(2);
  }

  expenseList.addEventListener('click', (e) => {
    if(e.target.tagName === 'BUTTON'){
      const expenseId = parseInt(e.target.getAttribute('data-id'));

      expenses = expenses.filter(expense => expense.id !== expenseId);

      saveExpensesToLocal();
      renderExpenses();
      updateTotal();
    }
  })

  function saveExpensesToLocal(){
    localStorage.setItem(`expenses`, JSON.stringify(expenses));
  }
})