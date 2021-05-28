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

// VARIABLES

let start = document.getElementById('start'),
   cancel = document.getElementById('cancel'),
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

const AppData = function () {
   this.budget = 0;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.income = {};
   this.incomeMonth = 0;
   this.addIncome = [];
   this.expenses = {};
   this.expensesMonth = 0;
   this.deposit = false;
   this.percentDeposit = 0;
   this.moneyDeposit = 0;
   this.addExpenses = [];
};
AppData.prototype.check = function () {
   if (salaryAmount.value !== '') {
      start.removeAttribute('disabled');
   }
};

AppData.prototype.start = function () {
   if (salaryAmount.value === '') {
      start.setAttribute('disabled', 'true');
      return;
   }
   let allInput = document.querySelectorAll('.data.input[type=text]');
   allInput.forEach(function (item) {
      item.setAttribute('disbled', 'true');
   });
   expensesPlus.setAttribute('disabled', 'true');
   incomePlus.setAttribute('disabled', 'true');
   start.style.display = 'none';
   cancel.style.display = 'block';

   this.budget = +salaryAmount.value;

   this.getExpenses();
   this.getIncome();
   this.getExpensesMonth();
   this.getAddExpenses();
   this.getAddIncome();
   this.getBudget();
   this.getInfoDeposit();
   this.getStatusIncome();
   this.showResult();
};

AppData.prototype.showResult = function () {
   const _this = this;
   budgetMonthValue.value = this.budgetMonth;
   budgetDayValue.value = Math.floor(this.budgetDay);
   expensesMonthValue.value = this.expensesMonth;
   additionalExpensesValue.value = this.addExpenses.join(', ');
   additionalIncomeValue.value = this.addIncome.join(', ');
   targetMonthValue.value = Math.ceil(this.getTargetMonth());
   incomePeriodValue.value = this.calcPeriod();
   periodSelect.addEventListener('change', function () {
      incomePeriodValue.value = _this.calcPeriod();
   });
};

AppData.prototype.addExpensesBlock = function () {
   let cloneExpensesItem = expensesItems[0].cloneNode(true);
   cloneExpensesItem.querySelector('.expenses-title').value = '';
   cloneExpensesItem.querySelector('.expenses-amount').value = '';
   expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
   expensesItems = document.querySelectorAll('.expenses-items');

   if (expensesItems.length === 3) {
      expensesPlus.style.display = 'none';
   }
};

AppData.prototype.addIncomeBlock = function () {
   let cloneIncomeItem = incomeItems[0].cloneNode(true);
   cloneIncomeItem.querySelector('.income-title').value = '';
   cloneIncomeItem.querySelector('.income-amount').value = '';
   incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
   incomeItems = document.querySelectorAll('.income-items');

   if (incomeItems.length === 3) {
      incomePlus.style.display = 'none';
   }
};

AppData.prototype.getExpenses = function () {
   const _this = this;
   expensesItems.forEach(function (item) {
      let itemExpenses = item.querySelector('.expenses-title').value;
      let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
         _this.expenses[itemExpenses] = +cashExpenses;
      }
   });
};

AppData.prototype.getIncome = function () {
   const _this = this;
   incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
         _this.income[itemIncome] = +cashIncome;
         // this.incomeMonth += +cashIncome;
      }
   });
   for (let key in this.income) {
      this.incomeMonth += +this.income[key];
   }
};

AppData.prototype.getAddExpenses = function () {
   let addExpenses = additionalExpensesItem.value.split(',');
   const _this = this;
   addExpenses.forEach(function (item) {
      item = item.trim();
      if (item !== '') {
         _this.addExpenses.push(item);
      }
   });
};

AppData.prototype.getAddIncome = function () {
   const _this = this;
   additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
         _this.addIncome.push(itemValue);
      }
   });
};

AppData.prototype.getExpensesMonth = function () {
   for (let key in this.expenses) {
      this.expensesMonth += +this.expenses[key];
   }
};

AppData.prototype.getBudget = function () {
   this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.floor(this.budgetMonth / 30);
};

AppData.prototype.getTargetMonth = function () {
   return targetAmount.value / this.budgetMonth;
};

AppData.prototype.getStatusIncome = function () {
   return isNaN(this.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
      (this.budgetDay < 0) ? 'Что то пошло не так...' :
         (this.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
            (this.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
               (this.budgetDay < 1200) ? 'У вас средний уровень дохода' :
                  (this.budgetDay === 1200) ?
                     'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
                     'У вас высокий уровень дохода';
};

AppData.prototype.getInfoDeposit = function () {
   if (this.deposit) {
      do {
         this.perscentDeposit = prompt('Какой годовой процент?', '10');
      } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
      do {
         this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
   }
};

AppData.prototype.calcPeriod = function () {
   return this.budgetMonth * periodSelect.value;
};

AppData.prototype.reset = function () {
   let inputTextData = document.querySelectorAll('.data input[type=text]'),
      resultInputAll = document.querySelectorAll('.result input[type=text]');

   inputTextData.forEach(function (elem) {
      elem.value = '';
      elem.removeAttribute('disabled');
      periodSelect.value = '0';
      periodSelect.innerHTML = periodSelect.value;
   });
   resultInputAll.forEach(function (elem) {
      elem.value = '';
   });

   for (let i = 1; i < incomeItems.length; i++) {
      incomeItems[i].parentNode.removeChild(incomeItems[i]);
      incomePlus.style.display = 'block';
   }
   for (let i = 1; i < expensesItems.length; i++) {
      expensesItems[i].parentNode.removeChild(expensesItems[i]);
      expensesPlus.style.display = 'block';
   }

   this.budget = 0;
   this.budgetDay = 0;
   this.budgetMonth = 0;
   this.income = {};
   this.incomeMonth = 0;
   this.addIncome = [];
   this.expenses = {};
   this.expensesMonth = 0;
   this.deposit = false;
   this.percentDeposit = 0;
   this.addExpenses = [];

   cancel.style.display = 'none';
   start.style.display = 'block';
   expensesPlus.removeAttribute('disabled');
   incomePlus.removeAttribute('disabled');
   depositCheck.checked = false;
};

AppData.prototype.eventListeners = function () {
   start.addEventListener('click', this.start.bind(this));
   expensesPlus.addEventListener('click', this.addExpensesBlock);
   incomePlus.addEventListener('click', this.addIncomeBlock);
   salaryAmount.addEventListener('keyup', this.check);
   cancel.addEventListener('click', this.reset.bind(this));

   periodSelect.addEventListener('change', function () {
      periodSelect.innerHTML = periodSelect.value;
   });
   const _this = this;
   let addExp = [];
   for (let i = 0; i < _this.addExpenses.length; i++) {
      let element = _this.addExpenses[i].trim();
      element = element.charAt(0).toUpperCase() + element.substring(1).toLoverCase();
      addExp.push(element);
   }
};



const appData = new AppData();
appData.eventListeners();
console.log(appData);
