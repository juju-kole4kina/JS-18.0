'use strict';

// FUNCTION IsNaN

let isNumber = function (n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

// FUNCTION IsStr

const isString = function (str, comma = false) {
   const pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
   return pattern.test(str);
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
   income: {},
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   percentDeposit: 0,
   moneyDeposit: 0,
   mission: 50000,
   period: 10,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   asking: function () {

      if (confirm('Есть ли у Вас дополнитьельный заработок?')) {
         let itemIncome = '';
         do {
            itemIncome = prompt('Какой у Вас есть дополнительный заработок?', 'Таксую');
         } while (!isString(itemIncome));
         let cashIncome = 0;
         do {
            cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', '10000');
         } while (!isNumber(cashIncome));

         appData.income[itemIncome] = +cashIncome;
      }

      let addExpenses = '';
      do {
         addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую', 'интернет, коммуналка, еда');
      } while (!isString(addExpenses, true));


      appData.addExpenses = addExpenses.toLowerCase().split(', ').map(val => val.trim());
      console.log('appData.addExpenses: ', appData.addExpenses);
      appData.deposit = confirm('Есть ли у Вас депозит в банке?');



      for (let i = 0; i < 2; i++) {
         let str = '';
         do {
            str = prompt('Введите обязательную статью расходов');
         } while (!isString(str, true));
         appData.expenses[str] = (function () {
            let sum = 0;
            do {
               sum = prompt('Во сколько это обойдётся?');
            } while (!isNumber(sum));
            return +sum;
         })();
      }
   },
   getExpensesMonth: function () {
      appData.expensesMonth = 0;
      for (let key in appData.expenses) {
         appData.expensesMonth += appData.expenses[key];
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
   getInfoDeposit: function () {
      if (appData.deposit) {
         appData.percentDeposit = prompt('Какой годовой процент?', '10');
         appData.moneyDeposit = prompt('Какая сумма заложена?', '10000');
      }
   },
   calcSavedMoney: function () {
      return appData.budgetMonth * appData.period;
   }
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
for (let key in appData) {
   console.log(key, appData[key]);
}

console.log('2) ' + appData.addExpenses.map((val, i) => val[0].toUpperCase() + val.slice(1)).join(', '));

// appData.getInfoDeposit();
// console.log(appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());