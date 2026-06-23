function renderExpenses() {
  expenseList.innerHTML = '';

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