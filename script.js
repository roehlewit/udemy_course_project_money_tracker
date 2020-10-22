const balance = document.getElementById('balance');
const money_plus = document.getElementById('money-plus');
const money_minus = document.getElementById('money-minus');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');

// const dummyTransactions = [
//     {id: 1, text: 'Flowers', amount: -20},
//     {id: 2, text: 'Salary', amount: 300},
//     {id: 3, text: 'Book', amount: -10},
//     {id: 4, text: 'Camera', amount: 150}
// ];

const localStorageTransactions = JSON.parse(localStorage.getItem('transactions'));

let transactions = localStorage.getItem('transactions') !== null ? localStorageTransactions : [];

//Add transaction 
function addTransaction(e) {
    e.preventDefault();

    if(text.value.trim() === '' || amount.value.trim() === ''){
        alert('Please add a text and amount');
    } else {
        const transaction = {
            id: generateID(),
            text: text.value,
            amount: +amount.value
        };
        transactions.push(transaction);
        addTransactionDOM(transaction);
        updateValues();
        updateLocalStorage();

        text.value = '';
        amount.value = '';

        console.log(transaction);
    }
}

// generate random ID
function generateID() {
    return Math.floor(Math.random() * 1000000);
}





// Add transactions to DOM list
function addTransactionDOM(transaction) {
    //get sign
    const sign = transaction.amount < 0 ? '-' :'+';

    const item = document.createElement('li')

    //add class based on value
    item.classList.add(transaction.amount < 0 ? '-' : '+');
    item.innerHTML = `
    ${transaction.text} <span>${sign}${Math.abs(transaction.amount)}</span> <button class="delete-btn" onclick="removeTransaction(${transaction.id})">x</button>
    `;

    list.appendChild(item);
}

//Update balance, income and expense
function updateValues() {
    //put amounts from list in DOM into array
    const amounts = transactions.map(transaction => transaction.amount);
    //adds all items together
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);
    //get income
    const income = amounts
        .filter(item => item > 0 )
        .reduce((acc, item) => (acc+=item), 0);

    //get expenses
    const expense = (amounts.filter(item => item < 0)
    .reduce((acc, item) => (acc += item), 0) * -1).toFixed(2);

    //insert values into dom
    balance.innerText = `$${total}`;
    money_plus.innerText = `$${income}`;
    money_minus.innerText = `$${expense}`;
    console.log(expense);
}


// Init app
function init() {
    list.innerHTML = '';

    transactions.forEach(addTransactionDOM);
    updateValues();
}

//remove transaction by id
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);

    updateLocalStorage();
    init();
}

//update ls transactions
function updateLocalStorage() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

init();

//event listener

form.addEventListener('submit', addTransaction);