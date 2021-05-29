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

//VALID

const addEventChangeNumber = function (event) {
   let tmpValue = event.target.value.trim();
   const changeInputNumber = function (event) {
      if (!/^[\d]+$/.test(event.target.value.trim()) && event.target.value.trim() !== '') {
         alert('Доупускается ввод только цифр!');
         event.target.value = tmpValue;
         event.target.removeEventListener('change', changeInputNumber);
      }
      tmpValue = event.target.value.trim();
   };
   event.target.addEventListener('change', changeInputNumber);
};
const addEventChangeText = function (event) {
   let tmpValue = event.target.value;
   const changeInputText = function (event) {
      if (!/^[,. а-яА-ЯёЁ]+$/.test(event.target.value)) {
         alert('Доупускается ввод только русских букв, пробела, точки и запятой!');
         event.target.value = tmpValue;
         event.target.removeEventListener('change', changeInputText);
      }
      tmpValue = event.target.value;
   };
   event.target.addEventListener('change', changeInputText);
};

// VARIABLES

let start = document.getElementById('start'),
   btnPlus = document.getElementsByTagName('button'),
   incomePlus = btnPlus[0],
   expensesPlus = btnPlus[1],
   additionalIncomeItem = document.querySelectorAll('.additional_income-item'),
   depositCheck = document.querySelector('#deposit-check'),
   budgetDayValue = document.getElementsByClassName('budget_day-value')[0],
   budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],
   expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],
   additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],
   additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],
   incomePeriodValue = document.getElementsByClassName('income_period-value')[0],
   targetMonthValue = document.getElementsByClassName('target_month-value')[0],
   salaryAmount = document.querySelector('.salary-amount'),
   incomeItems = document.querySelectorAll('.income-items'),
   expensesItems = document.querySelectorAll('.expenses-items'),
   additionalExpenses = document.querySelector('.additional_expenses'),
   periodSelect = document.querySelector('.period-select'), // range
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount');
let appData = {
   income: {},
   incomeMonth: 0,
   addIncome: [],
   expenses: {},
   addExpenses: [],
   deposit: false,
   precentDeposit: 0,
   moneyDeposit: 0,
   budget: 0,
   budgetDay: 0,
   budgetMonth: 0,
   expensesMonth: 0,
   start: function () {


      this.getExpenses();
      this.getIncome();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();
      this.showResult();
      if (start.textContent === 'Рассчитать') {
         this.blockInputs();
         start.textContent = 'Сбросить';
      } else {
         start.textContent = 'Рассчитать';
         this.reset();
      }
   },
   blockInputs: function (disabled = true) {
      document.querySelectorAll('.data input[type=text]').forEach(item => {
         item.disabled = disabled;
      });
   },
   reset: function () {

      incomePlus.style.display = '';
      expensesPlus.style.display = '';
      this.blockInputs(false);
      document.querySelectorAll('input[type=text]').forEach(item => {
         item.value = '';
      });
      this.getBudget();
      periodSelect.value = document.querySelector('.period-amount').textContent = 1;
      this.blockStart();

      for (let i = incomeItems.length - 1; i > 0; i--) {
         incomeItems[0].parentNode.removeChild(incomeItems[i]);
      }
      for (let i = expensesItems.length - 1; i > 0; i--) {
         expensesItems[0].parentNode.removeChild(expensesItems[i]);
      }
   },
   showResult: function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.floor((this.budgetDay * 100) / 100);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
   },
   addExpensesBlock: function () {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      cloneExpensesItem.querySelector('.expenses-title').value = '';
      cloneExpensesItem.querySelector('.expenses-amount').value = '';
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (document.querySelectorAll('.expenses-items').length === 3) {
         expensesPlus.style.display = 'none';
      }
      cloneExpensesItem.querySelector('.expenses-title').addEventListener('focus', addEventChangeText);
      cloneExpensesItem.querySelector('.expenses-amount').addEventListener('focus', addEventChangeNumber);

   },
   addIncomeBlock: function () {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      cloneIncomeItem.querySelector('.income-title').value = '';
      cloneIncomeItem.querySelector('.income-amount').value = '';
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (document.querySelectorAll('.income-items').length === 3) {
         incomePlus.style.display = 'none';
      }
      cloneIncomeItem.querySelector('.income-title').addEventListener('focus', addEventChangeText);
      cloneIncomeItem.querySelector('.income-amount').addEventListener('focus', addEventChangeNumber);
   },
   getExpenses: function () {
      document.querySelectorAll('.expenses-items').forEach(item => {
         const itemExpenses = item.querySelector('.expenses-title').value;
         const cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
         }
      });
   },
   getIncome: function () {
      this.incomeMonth = 0;
      document.querySelectorAll('.income-items').forEach(item => {
         const itemIncome = item.querySelector('.income-title').value;
         const cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
            this.incomeMonth += +cashIncome;
         }
      });
   },
   getAddExpenses: function () {
      const addExpenses = additionalExpensesItem.value.split(',');
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });
   },
   getAddIncome: function () {
      additionalIncomeItem.forEach(item => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
   },
   getExpensesMonth: function () {
      this.expensesMonth = 0;
      for (let elem in this.expenses) {
         this.expensesMonth += this.expenses[elem];
      }
   },
   getBudget: function () {
      this.budget = +salaryAmount.value;
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = this.budgetMonth / 30;
   },
   getTargetMonth: function () {
      return targetAmount.value / this.budgetMonth;
   },
   getStatusIncome: function () {
      return isNaN(this.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
         (this.budgetDay < 0) ? 'Что то пошло не так...' :
            (this.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
               (this.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
                  (this.budgetDay < 1200) ? 'У вас средний уровень дохода' :
                     (this.budgetDay === 1200) ?
                        'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
                        'У вас высокий уровень дохода';
   },
   getIfoDeposit: function () {
      // if (appData.deposit) {
      //    let n = 0;
      //    do {
      //       n = prompt('Какой годовой процент?', '10');
      //    } while (!isNumber(n) && n > 0);
      //    appData.precentDeposit = +n;
      //    do {
      //       appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      //    } while (!isNumber(n) && n > 0);
      //    appData.moneyDeposit = +n;
      // }
      this.moneyDeposit = 0;
   },
   calcPeriod: function () {
      return this.budgetMonth * periodSelect.value;
   },
   changePeriodSelect: function (event) {
      document.querySelector('.period-amount').textContent = event.target.value;
      incomePeriodValue.value = appData.calcPeriod();
   },
   blockStart: function () {
      start.disabled = !salaryAmount.value.trim();
   }
};





let foo = appData.start.bind(appData);

appData.blockStart();
start.addEventListener('click', foo);

// start.addEventListener('click', appData.start);
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodSelect);
salaryAmount.addEventListener('input', appData.blockStart);


document.querySelectorAll('[placeholder="Наименование"]').forEach(input => {
   input.addEventListener('focus', addEventChangeText);
});
document.querySelectorAll('[placeholder="Сумма"]').forEach(input => {
   input.addEventListener('focus', addEventChangeNumber);
});
// appData.addExpensesBlock.forEach(input => {
//    input.addEventListener('focus', addEventChangeText);
// });

// document.cloneExpensesItem.querySelector('.expenses-amount').forEach(input => {
//    input.addEventListener('focus', addEventChangeNumber);
// });