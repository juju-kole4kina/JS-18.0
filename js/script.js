'use strict';

// VARIABLES

let money = +prompt('Ваш месячный доход?');
let income = 'Муж даёт';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');



let deposit = confirm('Есть ли у Вас депозит в банке?');

let mission = 30000;
let period = 6;

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдётся?');

let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдётся?');

let budgetMonth = (money - (amount1 + amount2));
let budgetDay = (budgetMonth / 30);

let period2 = (mission / budgetMonth);




// MODAL WINDOW


// CONSOLE OUTPUT


console.log(typeof money);
console.log(typeof income);
console.log(typeof deposit);

console.log(addExpenses.length);



console.log('Период равен', Math.ceil(period), 'месяцев');
console.log('Цель заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase());
console.log(addExpenses.split(', '));

//console.log(deposit);
//console.log(money);
// console.log(addExpenses);

// console.log(expenses1);
// console.log(amount2);

// console.log(amount1);
// console.log(expenses2);

console.log('Бюджет на месяц:', budgetMonth);
console.log('Цель будет достигнута', Math.ceil(period2), 'месяцев(-а)');
console.log('Бюджет на день:', Math.floor(budgetDay));

// IF/ELSE
if (budgetDay >= 1200) {
   console.log('У Вас высокий уровень дохода');
} else if (600 <= budgetDay & budgetDay < 1200) {
   console.log('У Вас средний уровень дохода');
} else if (0 <= budgetDay & budgetDay < 600) {
   console.log('К сожалению, у Вас уровень дохода ниже среднего');
} else {
   console.log('Что-то пошло не так');
}

