'use strict';

// FUNCTION IsNaN

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};
// START FUNCTION
let money,
   start = function () {
      do {
         money = prompt('Ваш месячный доход?');
      } while (!isNumber(money));

   };
start();

let appData = {
   budget: +money,
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   mission: 50000,
   period: 10,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   asking: function () {
      let
         addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую');
      appData.addExpenses = addExpenses.toLowerCase().split(', ');
      appData.deposit = confirm('Есть ли у Вас депозит в банке?');

      for (let i = 0; i < 2; i++) {
         appData.expenses[prompt('Введите обязательную статью расходов')] = (function () {
            let sum = 0;

            do {
               sum += +prompt('Во сколько это обойдётся?');
            } while (!isNumber(sum));
            return sum;
         })();
      }
   },
   getExpensesMonth: function () {
      appData.expensesMonth = 0;
      for (let item in appData.expenses) {
         appData.expensesMonth += appData.expenses[item];
      }
   },
   getBudget: function () {
      if (!appData.budget) {
         appData.budget = 0;
      }
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
   },
   getTargetMonth: function () {
      return Math.ceil(appData.mission / appData.budgetMonth);
   },
   getStatusIncome: function () {
      return (appData.budget >= 1200) ? 'У Вас высокий уровень дохода' :
         (appData.budget >= 600 && appData.budget < 1200) ? 'У Вас средний уровень дохода' :
            (appData.budget >= 0 && appData.budget < 600) ? 'К сожалению, у Вас уровень дохода ниже среднего' :
               'Что-то пошло не так';
   },
};

// FUNCTION CALL

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

let targetMonth = appData.getTargetMonth();

// CONSOLE OUTPUT

console.log('Расходы за месяц: ', appData.expensesMonth);

console.log(targetMonth > 0 ? `Цель будет достигнута за ${targetMonth} месяцев(а)` :
   'Цель не будет достигнута');

console.log('Уровень дохода: ', appData.getStatusIncome());

console.log('Наша программа включает в себя данные: ');
for (let item in appData) {
   console.log(item, appData[item]);
}