'use strict';

// VARIABLES

let money = +prompt('Ваш месячный доход?');
let income = 'Фриланс';
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');

let deposit = confirm('Есть ли у Вас депозит в банке?');

let mission = 30000;
let period = 6;

let expenses1 = prompt('Введите обязательную статью расходов');
let amount1 = +prompt('Во сколько это обойдётся?');

let expenses2 = prompt('Введите обязательную статью расходов');
let amount2 = +prompt('Во сколько это обойдётся?');


// MODAL WINDOW

// FUNCTION

const getStatusIncome = function (budget) {
   return (budget >= 1200) ? 'У Вас высокий уровень дохода' :
      (budget >= 600 && budget < 1200) ? 'У Вас средний уровень дохода' :
         (budget >= 0 && budget < 600) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
            'Что-то пошло не так';
};

const getExpensesMonth = function () {
   if (!amount1) {
      amount1 = 0;
   }
   if (!amount2) {
      amount2 = 0;
   }

   return amount1 + amount2;
};

const getAccumulatedMonth = function (moneyM, expensesM) {
   if (!moneyM) {
      moneyM = 0;
   }
   if (!expensesM) {
      expensesM = 0;
   }

   return moneyM - expensesM;
};

const getTargetMonth = function (myMission, budgetMonth) {
   return Math.ceil(myMission / budgetMonth);
};

const showTypeOf = function (data) {
   console.log(data, typeof (data));
};
// FUNCTION CALL

const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());
const budgetDay = accumulatedMonth / 30;

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// CONSOLE OUTPUT

console.log(addExpenses.length);

console.log('Период равен', Math.ceil(period), 'месяцев');
console.log('Цель заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Цель будет достигнута', getTargetMonth(mission, accumulatedMonth), 'месяцев(-а)');
console.log('Бюджет на день:', Math.floor(budgetDay));

console.log('Сумма обязательных расходов: ', getExpensesMonth());

console.log('Накопления за месяц: ', getAccumulatedMonth(money, getExpensesMonth()));

console.log(getStatusIncome(budgetDay));