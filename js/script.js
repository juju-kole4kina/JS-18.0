// VARIABLES

let money = 20000;
let income = 'Муж даёт';
let addExpenses = 'Коммуналка, Еда, Бензин, Интернет, Бытовые мелочи, Развлечения';
let deposit = true;
let mission = 30000;
let period = 6;

let budgetDay = (money / 30);

// MODAL WINDOW

//alert("Hello World!");

// CONSOLE OUTPUT

//console.log("Hi, there!");

console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);

console.log('Период равен', period, 'месяцев');
console.log('Цель заработать', mission, 'рублей/долларов/гривен/юани');

console.log();
console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

console.log(budgetDay);

