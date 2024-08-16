"use strict";

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: "Jessica Davis",
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnClose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

const displayMovements = function (movements, sort = false) {
  containerMovements.innerHTML = "";

  const movs = sort ? movements.slice().sort((a, b) => a - b) : movements;

  movs.forEach(function (mov, i) {
    // remove the previous html
    const type = mov > 0 ? "deposit" : "withdrawal";

    const html = ` 
    <div class="movements__row">
        <div class="movements__type movements__type--${type}">${
      i + 1
    }${type}</div>
        <div class="movements__value">${mov}💶</div>
    </div>`;
    // this is to insert html
    containerMovements.insertAdjacentHTML("afterbegin", html);
  });
};

// displayMovements(account1.movements);

const calcAndDisplay = function (acc) {
  acc.balance = acc.movements.reduce((acc, movement) => {
    return acc + movement;
  }, 0);

  labelBalance.textContent = `${acc.balance} 💶`;
};

// calcAndDisplay(account1.movements);

const calcDisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter((mov) => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${incomes} 💶`;

  const outcomes = acc.movements
    .filter((mov) => mov < 0)
    .reduce((acc, cur) => acc + cur);
  labelSumOut.textContent = `${Math.abs(outcomes)} 💶`;

  const interest = acc.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * acc.interestRate) / 100)
    .filter((int) => int >= 1)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumInterest.textContent = `${interest} 💶`;
};

// calcDisplaySummary(account1.movements);

const createUsernames = function (accounts) {
  accounts.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(" ")
      .map((name) => name[0])
      .join("");
  });
};

createUsernames(accounts);

const updateUI = function (currentAccount) {
  // dispolay movements
  displayMovements(currentAccount.movements);

  // display balance
  calcAndDisplay(currentAccount);
  // dispolay summary
  calcDisplaySummary(currentAccount);
};

// EVENT HANDLERES
let currentAccount;

btnLogin.addEventListener("click", function (e) {
  // prevent form for submitting and reload page
  e.preventDefault();

  currentAccount = accounts.find(
    (acc) => acc.username === inputLoginUsername.value
  );

  console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    // display ui and welcome message
    labelWelcome.textContent = `Welcome Back ${
      currentAccount.owner.split(" ")[0]
    }`;

    containerApp.style.opacity = 100;
    // clear input fields
    inputLoginUsername.value = inputLoginPin.value = "";
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener("click", function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    (acc) => acc.username === inputTransferTo.value
  );
  inputTransferAmount.value = inputTransferTo.value = "";

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    // Doing the transfer
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    // Update UI
    updateUI(currentAccount);
  }
});

btnLoan.addEventListener("click", function (e) {
  e.preventDefault();

  const amount = Number(inputLoanAmount.value);

  if (
    amount > 0 &&
    currentAccount.movements.some((mov) => mov >= amount / 10)
  ) {
    currentAccount.movements.push(amount);
    updateUI(currentAccount);
  }
  inputLoanAmount.value = "";
});

btnClose.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    currentAccount.username === inputCloseUsername.value &&
    currentAccount.pin === Number(inputClosePin.value)
  ) {
    const index = accounts.findIndex(
      (acc) => acc.username === currentAccount.username
    );

    // console.log(index);
    accounts.splice(index, 1);
    // hide ui
    containerApp.style.opacity = 0;
  }
  inputCloseUsername.value = inputClosePin.value = "";
});
// state variable
let sorted = false;
btnSort.addEventListener("click", function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES
const currencies = new Map([
  ["USD", "United States dollar"],
  ["EUR", "Euro"],
  ["GBP", "Pound sterling"],
]);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

//SORTING ARRAYS
const owners = ["jonas", "zach", "adam", "martha"];
// this will modified the original array and only works in strings
console.log(owners.sort());

// numbers wont work

// return < 0 a,b (keep order)
//return > 0 b,a (switch order)
movements.sort((a, b) => {
  if (a > b) {
    return 1;
  }

  if (b > a) {
    return -1;
  }
});

movements.sort((a, b) => a - b);

// console.log(movements);

// FLAT AND FLATMAP METHODS

const arr = [[1, 2, 3], [4, 5, 6], 7, 8];
// console.log(arr.flat());

const arrDeep = [[[1, 2], 3, [4, [4, 6]], 7, 8]];
// console.log(arrDeep.flat(2));

const accountMovements = accounts
  .map((acc) => acc.movements)
  .flat()
  .reduce((acc, cur) => acc + cur, 0);
// console.log(accountMovements);

//FLATMAP
const accountMovements2 = accounts
  .flatMap((acc) => acc.movements)
  .reduce((acc, cur) => acc + cur, 0);
// console.log(accountMovements2);

// SOME AND EVERY METHOD

// equility
movements.includes(-130);
// some condition
const anyDeposits = movements.some((mov) => mov > 1500);

// every only returns true if all the elements are true
movements.every((mov) => mov > 0);

// THE .FIND METHOD
// ONLY RETURNS THE RESULT OF THE FIND AND NOT A NE ARRAY ALSO IT IS ONLY THE FIRST ELEMENT THAT FINDS ONLY
const firstWithdrawal = movements.find((mov) => mov < 0);
// console.log(firstWithdrawal);

const owner = accounts.find((acc) => acc.owner === "Jessica Davis");
// console.log(owner);

// accounts.forEach((acc) =>
//   acc.owner === "Jessica Davis"
//     ? console.log("Found Jessica Davis's account:", acc)
//     : null
// );

const euroToUsd = 1.1;
// CHAINING METHODS
const totalDepositsUSD = movements
  .filter((mov) => mov > 0)
  .map((mov, i, arr) => {
    // console.log(arr);

    return mov * euroToUsd;
  })
  .reduce((acc, current) => {
    return acc + current;
  });
// console.log(totalDepositsUSD);

// REDUCE METHOD

// accumulator is like a snowball
const balance = movements.reduce((acc, curent, i) => {
  // console.log(`iteration ${i}: ${acc}`);

  return acc + curent;
}, 0);

// maximum value

const max = movements.reduce((acc, cur) => {
  if (acc > cur) {
    return acc;
  } else {
    return cur;
  }
}, movements[0]);
// console.log(max);

// console.log(balance);

// FILTER method

const deposits = movements.filter((mov) => {
  return mov > 0;
});

const withdrawals = movements.filter((mov) => {
  return mov < 0;
});

// MAP METHOD

const movementsUSD = movements.map((mov) => {
  return Math.trunc(mov * euroToUsd);
});

// console.log(movements);
// console.log(movementsUSD);

const movementsUSDfor = [];
for (const mov of movements) movementsUSDfor.push(Math.trunc(mov * euroToUsd));
// console.log(movementsUSDfor);

const movementsDescriptions = movements.map((mov, i, arr) => {
  if (mov > 0) {
    return `Movement ${i + 1}: You deposited ${mov}`;
  } else {
    return `Movement ${i + 1}: You withdrew ${Math.abs(mov)}`;
  }
});

// console.log(movementsDescriptions);

/////////////////////////////////////////////////

///////////////////////////////////////
// Coding Challenge #1

/* 
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners about their dog's age, and stored the data into an array (one array for each). For now, they are just interested in knowing whether a dog is an adult or a puppy. A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years old.

Create a function 'checkDogs', which accepts 2 arrays of dog's ages ('dogsJulia' and 'dogsKate'), and does the following things:

1. Julia found out that the owners of the FIRST and the LAST TWO dogs actually have cats, not dogs! So create a shallow copy of Julia's array, and remove the cat ages from that copied array (because it's a bad practice to mutate function parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 🐶")
4. Run the function for both test datasets

HINT: Use tools from all lectures in this section so far 😉

TEST DATA 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
TEST DATA 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]

GOOD LUCK 😀

*/

const juliasData = [3, 5, 2, 12, 7];
const katesData = [4, 1, 15, 8, 3];

const checkDogs = function (juliasDogs, katesDogs) {
  const onlyDogsJulia = juliasDogs.slice(1, -2);

  const allDogs = [...onlyDogsJulia, ...katesDogs];

  // console.log(allDogs);
  allDogs.forEach(function (dog, i) {
    if (dog >= 3) {
      // console.log(`Dog number ${i + 1} is an adult and is ${dog} years old`);
    } else {
      // console.log(
      //   `Dog number ${i + 1} is still a puppy and is ${dog} years old`
      // );
    }
  });
};

checkDogs(juliasData, katesData);

///////////////////////////////////////
// Coding Challenge #2

/* 
Let's go back to Julia and Kate's study about dogs. This time, they want to convert dog ages to human ages and calculate the average age of the dogs in their study.

Create a function 'calcAverageHumanAge', which accepts an arrays of dog's ages ('ages'), and does the following things in order:

1. Calculate the dog age in human years using the following formula: if the dog is <= 2 years old, humanAge = 2 * dogAge. If the dog is > 2 years old, humanAge = 16 + dogAge * 4.
2. Exclude all dogs that are less than 18 human years old (which is the same as keeping dogs that are at least 18 years old)
3. Calculate the average human age of all adult dogs (you should already know from other challenges how we calculate averages 😉)
4. Run the function for both test datasets

TEST DATA 1: [5, 2, 4, 1, 15, 8, 3]
TEST DATA 2: [16, 6, 10, 5, 6, 1, 4]

GOOD LUCK 😀
*/

const calcAverageHumanAge = (ages) => {
  // const filetered = [];
  const humanAge = ages
    .map((age) => {
      if (age <= 2) {
        return 2 * age;
      } else {
        return 16 + age * 4;
      }
    })
    .filter((age) => {
      return age >= 18;
    })
    .reduce((acc, cur, i, arr) => {
      return acc + cur / arr.length;
    }, 0);
  return humanAge;
};

// on reduce method always use the 0 at the end }, 0) or the begginning

// console.log(calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]));
