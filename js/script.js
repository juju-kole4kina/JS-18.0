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

const start = document.getElementById('start'),
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
   additionalExpenses = document.querySelector('.additional_expenses'),
   periodSelect = document.querySelector('.period-select'), // range
   additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   targetAmount = document.querySelector('.target-amount');
let incomeItems = document.querySelectorAll('.income-items'),
   expensesItems = document.querySelectorAll('.expenses-items');

class AppData {
   constructor() {
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
   }

   check() {
      if (salaryAmount.value !== '') {
         start.removeAttribute('disabled');
      }
   }

   start() {
      if (salaryAmount.value === '') {
         start.setAttribute('disabled', 'true');
         return;
      }
      // let allInput = document.querySelectorAll('.data input[type=text]');
      // allInput.forEach(item => {
      //    item.setAttribute('disbled', 'true');
      // });
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
      this.blockage();
   }

   showResult() {
      // const _this = this;
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = Math.floor(this.budgetDay);
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', ');
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());
      incomePeriodValue.value = this.calcPeriod();
      periodSelect.addEventListener('change', () => {
         incomePeriodValue.value = this.calcPeriod();
      });
   }

   blockage(disabled = true) {
      document.querySelectorAll('.data input[type=text]').forEach(item => {
         item.disabled = disabled;
      });
      document.querySelector('.data input[type=checkbox]').disabled = disabled;
      incomePlus.disabled = disabled;
      expensesPlus.disabled = disabled;
   }

   addExpensesBlock() {
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      cloneExpensesItem.querySelector('.expenses-title').value = '';
      cloneExpensesItem.querySelector('.expenses-amount').value = '';
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');

      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   }

   addIncomeBlock() {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      cloneIncomeItem.querySelector('.income-title').value = '';
      cloneIncomeItem.querySelector('.income-amount').value = '';
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   }

   getExpenses() {
      // const _this = this;
      expensesItems.forEach(item => {
         const itemExpenses = item.querySelector('.expenses-title').value;
         const cashExpenses = item.querySelector('.expenses-amount').value;
         if (itemExpenses !== '' && cashExpenses !== '') {
            this.expenses[itemExpenses] = +cashExpenses;
         }
      });
   }

   getIncome() {
      // const _this = this;
      incomeItems.forEach(item => {
         const itemIncome = item.querySelector('.income-title').value;
         const cashIncome = item.querySelector('.income-amount').value;
         if (itemIncome !== '' && cashIncome !== '') {
            this.income[itemIncome] = +cashIncome;
            // this.incomeMonth += +cashIncome;
         }
      });
      for (let key in this.income) {
         this.incomeMonth += +this.income[key];
      }
   }

   getAddExpenses() {
      const addExpenses = additionalExpensesItem.value.split(',');
      // const _this = this;
      addExpenses.forEach(item => {
         item = item.trim();
         if (item !== '') {
            this.addExpenses.push(item);
         }
      });
   }

   getAddIncome() {
      // const _this = this;
      additionalIncomeItem.forEach(item => {
         const itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
   }

   getExpensesMonth() {
      for (let key in this.expenses) {
         this.expensesMonth += +this.expenses[key];
      }
   }

   getBudget() {
      this.budgetMonth = this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.floor(this.budgetMonth / 30);
   }

   getTargetMonth() {
      return targetAmount.value / this.budgetMonth;
   }

   getStatusIncome() {
      return isNaN(this.budgetDay) ? 'Упс! Где-то закралась ошибка...' :
         (this.budgetDay < 0) ? 'Что то пошло не так...' :
            (this.budgetDay < 600) ? 'К сожалению у вас уровень дохода ниже среднего' :
               (this.budgetDay === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
                  (this.budgetDay < 1200) ? 'У вас средний уровень дохода' :
                     (this.budgetDay === 1200) ?
                        'У вас почти получилось попасть в группу с высокий уровень дохода! Постарайтесь лучше!' :
                        'У вас высокий уровень дохода';
   }

   getInfoDeposit() {
      if (this.deposit) {
         do {
            this.perscentDeposit = prompt('Какой годовой процент?', '10');
         } while (isNaN(this.percentDeposit) || this.percentDeposit === '' || this.percentDeposit === null);
         do {
            this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         } while (isNaN(this.moneyDeposit) || this.moneyDeposit === '' || this.moneyDeposit === null);
      }
   }

   calcPeriod() {
      return this.budgetMonth * periodSelect.value;
   }

   reset() {
      const inputTextData = document.querySelectorAll('.data input[type=text]'),
         resultInputAll = document.querySelectorAll('.result input[type=text]');

      inputTextData.forEach(elem => {
         elem.value = '';
         elem.removeAttribute('disabled');
         periodSelect.value = '0';
         periodSelect.innerHTML = periodSelect.value;
      });
      resultInputAll.forEach(elem => {
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

      this.blockage(false);

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
   }

   eventListeners() {
      start.addEventListener('click', this.start.bind(this));
      expensesPlus.addEventListener('click', this.addExpensesBlock);
      incomePlus.addEventListener('click', this.addIncomeBlock);
      salaryAmount.addEventListener('keyup', this.check);
      cancel.addEventListener('click', this.reset.bind(this));

      periodSelect.addEventListener('change', () => {
         periodSelect.innerHTML = periodSelect.value;
      });
      const _this = this;
      const addExp = [];
      for (let i = 0; i < _this.addExpenses.length; i++) {
         let element = _this.addExpenses[i].trim();
         element = element.charAt(0).toUpperCase() + element.substring(1).toLoverCase();
         addExp.push(element);
      }
   }
}


const appData = new AppData();
appData.eventListeners();
console.log(appData);
