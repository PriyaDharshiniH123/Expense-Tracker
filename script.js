const filterCategory = document.getElementById('filter-category');
const form = document.getElementById('expense-form');
const expenseList = document.getElementById('expense-list');
let expenses = JSON.parse(localStorage.getItem('expenses')) || [];
let chart = null;

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

filterCategory.addEventListener('change', function() {
  renderExpenses();
});

function renderExpenses() {
  expenseList.innerHTML = '';
  localStorage.setItem('expenses', JSON.stringify(expenses));

  let total = 0;

  const filtered = filterCategory.value === 'All'
    ? expenses
    : expenses.filter(exp => exp.category === filterCategory.value);

  filtered.forEach(function(exp) {
    const realIndex = expenses.indexOf(exp);

    const li = document.createElement('li');
    li.textContent = `${exp.note} - ₹${exp.amount} (${exp.category}) on ${exp.date}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', function() {
      expenses.splice(realIndex, 1);
      renderExpenses();
    });

    li.appendChild(deleteBtn);
    expenseList.appendChild(li);

    total += Number(exp.amount);
  });

  document.getElementById('total').textContent = total;
  renderChart();
}

function renderChart() {
  const categories = ['Food', 'Travel', 'Shopping', 'Other'];
  const totals = categories.map(cat =>
    expenses
      .filter(exp => exp.category === cat)
      .reduce((sum, exp) => sum + Number(exp.amount), 0)
  );

  if (chart) chart.destroy();

  const ctx = document.getElementById('expense-chart').getContext('2d');
  chart = new Chart(ctx, {
    type: 'doughnut',
    data: {
      labels: categories,
      datasets: [{
        data: totals,
        backgroundColor: ['#fc8181', '#667eea', '#68d391', '#f6ad55']
      }]
    }
  });
}

renderExpenses();