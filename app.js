// public/app.js
$(document).ready(() => {
  const expenseForm = $('#expenseForm');
  const expenseList = $('#expenseList');

  // Load expenses on page load
  fetchExpenses();

  // Form submit event
  expenseForm.submit((event) => {
    event.preventDefault();
    const description = $('#description').val();
    const amount = $('#amount').val();

    // Add expense to the server
    $.post('/expenses', { description, amount }, () => {
      // Clear form fields
      $('#description').val('');
      $('#amount').val('');

      // Refresh the expense list
      fetchExpenses();
    });
  });

  // Function to fetch expenses from the server
  function fetchExpenses() {
    $.get('/expenses', (expenses) => {
      // Clear previous list items
      expenseList.empty();

      // Populate the list with new data
      expenses.forEach((expense) => {
        const listItem = $('<li>').text(`${expense.description}: $${expense.amount}`);
        expenseList.append(listItem);
      });
    });
  }
});
