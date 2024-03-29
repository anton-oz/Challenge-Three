// GIVEN an employee payroll tracker
// WHEN I click the "Add employee" button
// THEN I am presented with a series of prompts asking for first name, last name, and salary
// WHEN I finish adding an employee
// THEN I am prompted to continue or cancel
// WHEN I choose to continue
// THEN I am prompted to add a new employee
// WHEN I choose to cancel
// THEN my employee data is displayed on the page sorted alphabetically by last name, and the console shows computed and aggregated data


// Get a reference to the #add-employees-btn element
const addEmployeesBtn = document.querySelector('#add-employees-btn');

// globally declared employees array so that it can be called on by the prewritten functions.
let employeesArray = [];

// Collect employee data
const collectEmployees = function() {

  while (true) {

    // define employee object
    let employee = {
      firstName: null, 
      lastName: null, 
      salary: null
    };

    employee.firstName = prompt("Enter employee first name: ")
    if (!employee.firstName) {
      break
    }

    employee.lastName = prompt("Enter employee last name: ")
    if (!employee.lastName) {
      break
    }

    employee.salary = prompt("Enter employee salary (NUMBERS ONLY): ")
    
    if (!employee.salary) {
      break
    }

    // Code from Medium checks if string contains letters or only numbers, linked in README under 'check if string has only numbers or contains letters'
    const onlyContainsNumbers = (str) => /^\d+$/.test(str);

    // loop to keep prompting user to enter numerical value for salary so app doesn't break
    let x = 1;
    while (x === 1) {
      if (onlyContainsNumbers(employee.salary) === false) {
        employee.salary = prompt("Please enter employee salary in NUMERICAL FORMAT ONLY: ")
        if (!employee.salary) {
          break
        }
      } else {
        employee.salary = parseInt(employee.salary);
        x = 0  
      }
    }
    if (!employee.salary) {
      break
    }

    employeesArray.push(employee)

    if (!confirm('Would you like to add another employee?')) {
      break
    }  
  };
 
  return employeesArray;
};

// Display the average salary
const displayAverageSalary = function(employeesArray) {

  // take salary values from employee object array and put those values in new array
  let salaries = employeesArray.map(sal => sal.salary);

  let sum = 0;

  let salArrLen = salaries.length;

  for (salary in salaries) {
    sum += salaries[salary]
  };

  let average = sum / salArrLen;

  let final = console.log(`The average employee salary between ${salaries.length} employee(s) is $${average}`)

  return final;
}

// Select a random employee
const getRandomEmployee = function(employeesArray) {

  // code for random selector I used from stack overflow, link is in README.md under 'code for random selector'
  const randomElement = employeesArray[Math.floor(Math.random() * employeesArray.length)];

  let employeeName = randomElement.firstName.concat(" ", randomElement.lastName);

  let final = console.log(`Our lucky random winnder is ${employeeName}!`);

  return final;
}

/*
  ====================
  STARTER CODE
  Do not modify any of the code below this line:
*/

// Display employee data in an HTML table
const displayEmployees = function(employeesArray) {
  // Get the employee table
  const employeeTable = document.querySelector('#employee-table');

  // Clear the employee table
  employeeTable.innerHTML = '';

  // Loop through the employee data and create a row for each employee
  for (let i = 0; i < employeesArray.length; i++) {
    const currentEmployee = employeesArray[i];

    const newTableRow = document.createElement("tr");

    const firstNameCell = document.createElement("td");
    firstNameCell.textContent = currentEmployee.firstName;
    newTableRow.append(firstNameCell);

    const lastNameCell = document.createElement("td");
    lastNameCell.textContent = currentEmployee.lastName;
    newTableRow.append(lastNameCell);

    const salaryCell = document.createElement("td");
    // Format the salary as currency
    salaryCell.textContent = currentEmployee.salary.toLocaleString("en-US",{
      style:"currency",
      currency:"USD"
    });

    newTableRow.append(salaryCell);

    employeeTable.append(newTableRow);
  }
}

const trackEmployeeData = function() {
  const employees = collectEmployees();

  console.table(employees);

  displayAverageSalary(employees);

  console.log('==============================');

  getRandomEmployee(employees);

  employees.sort(function(a,b) {
    if (a.lastName < b.lastName) {
      return -1;
    } else {
      return 1;
    }
  });

  displayEmployees(employees);
}

// Add event listener to 'Add Employees' button
addEmployeesBtn.addEventListener('click', trackEmployeeData);
