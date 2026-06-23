const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

form.addEventListener('submit', function(e) {
  e.preventDefault();

  const note = document.getElementById('note').value;
  const amount = document.getElementById('amount').value;
  const category = document.getElementById('category').value;
  const date = document.getElementById('date').value;

  const expense = { note, amount, category, date };
  expenses.push(expense);

  renderExpenses();
  form.reset();
});

function renderExpenses() {
  expenseList.innerHTML = '';
  localStorage.setItem('expenses', JSON.stringify(expenses));

  let total = 0;

  expenses.forEach(function(exp, index) {
    const li = document.createElement('li');
    li.textContent = `${exp.note} - ₹${exp.amount} (${exp.category}) on ${exp.date}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      expenses.splice(index, 1);
      renderExpenses();
    });

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    total += Number(exp.amount);
  });

  document.getElementById('total').textContent = total;
}
renderExpenses();