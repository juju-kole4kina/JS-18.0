'use strict';

// FUNCTION IsNaN

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};


// VARIABLES

let money,
   income = 'Фриланс',
   addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую'),

   deposit = confirm('Есть ли у Вас депозит в банке?'),

   mission = 30000,
   period = 6;

let expenses = [];
// MODAL WINDOW

// FUNCTION

let start = function () {
   do {
      money = prompt('Ваш месячный доход?');
   } while (!isNumber(money));

};
start();

let getExpensesMonth = function () {
   let sum = 0;

   for (let i = 0; i < 2; i++) {
      expenses[i] = prompt('Введите обязательную статью расходов');

      do {
         sum += +prompt('Во сколько это обойдётся?');
      } while (!isNumber(sum));

   }
   console.log(expenses);
   return sum;
};
let expensesAmount = getExpensesMonth();


let getAccumulatedMonth = function (moneyM, expensesM) {
   if (!moneyM) {
      moneyM = 0;
   }
   if (!expensesM) {
      expensesM = 0;
   }

   return moneyM - expensesM;
};
let accumulatedMonth = getAccumulatedMonth(money, expensesAmount);

let getTargetMonth = function (myMission, budgetMonth) {
   return Math.ceil(myMission / budgetMonth);
};
let targetMonth = getTargetMonth(mission, accumulatedMonth);

let tMounth = function () {
   return (targetMonth > 0) ? `Цель будет достигнута за ${targetMonth} месяцев(а)` :
      'Цель не будет достигнута';
};

let showTypeOf = function (data) {
   console.log(data, typeof (data));
};

const getStatusIncome = function (budget) {
   return (budget >= 1200) ? 'У Вас высокий уровень дохода' :
      (budget >= 600 && budget < 1200) ? 'У Вас средний уровень дохода' :
         (budget >= 0 && budget < 600) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
            'Что-то пошло не так';
};

// FUNCTION CALL

let budgetDay = accumulatedMonth / 30;

// 

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

// CONSOLE OUTPUT

console.log(addExpenses.length);

console.log('Период равен', Math.ceil(period), 'месяцев');
console.log('Цель заработать', mission, 'рублей');

console.log(addExpenses.toLowerCase().split(', '));

console.log('Бюджет на день:', Math.floor(budgetDay));

console.log('Сумма обязательных расходов: ', expensesAmount);

console.log('Накопления за месяц: ', accumulatedMonth);

console.log(getStatusIncome(budgetDay));

console.log(tMounth());