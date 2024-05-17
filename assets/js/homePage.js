// Function to check if the user is logged in or not
function hasSession() {
  // Retrieve current admin data from session storage
  const loggedAdmin = JSON.parse(sessionStorage.getItem('currentAdmin'));
  console.log("loggedAdmin", loggedAdmin);
  // Check if loggedAdmin exists and token is not empty
  return loggedAdmin && loggedAdmin.token !== "";
}

// Check if there is an active session
if (hasSession()) {
  console.log("There is an active session.");
} else {
  // Redirect to index.html if no active session found
  window.location.href = "../index.html";
  console.log("No active session found.");
}

// Event listener for logout button
const logout = document.getElementById('logout');
logout.addEventListener("click", function () {
  // Retrieve current admin data from session storage
  const loggedAdmin = JSON.parse(sessionStorage.getItem('currentAdmin'));
  // Check if loggedAdmin exists and token is empty
  if (loggedAdmin && loggedAdmin.token === "") {
      window.location.href = "webPages/homePage.html";
      console.log("Not logged in or invalid session token");
  } else {
      // Remove current admin data from session storage
      sessionStorage.removeItem('currentAdmin');
      console.log("Logout successful");
      window.location.href = "../index.html";
      // Redirect to index.html after logout
  }
});

// Event listener for addEmployee button
const addEmployee = document.getElementById("addEmployee");
addEmployee.addEventListener("click", function () {
  // Redirect to addEmployee.html
  window.location.href = "./addEmployee.html";
});

// Retrieve employee data from local storage
const userData = localStorage.getItem("userList");
let dynamicData = JSON.parse(userData);

// Extract salaries from dynamicData and sort
const salaries = dynamicData.map((item) => parseInt(item?.salary));
dynamicData.sort((a, b) => a?.salary - b?.salary);

// Get two highest salary employees
const twoSalary = [dynamicData[dynamicData?.length - 1], dynamicData[dynamicData?.length - 2]].map((item) => {
  return {
      name: item?.firstName,
      salary: item?.salary,
      dept: item?.dept,
  };
});

// Array of all departments
const all_dept = ["Node", "Dot Net", "Php", "Angular", "React", "Java"];

// Count number of employees in each department
const userDept = {};
dynamicData?.forEach(item => {
  if (all_dept.includes(item?.dept)) {
      if (userDept[item?.dept]) {
          userDept[item?.dept] += 1;
      } else {
          userDept[item?.dept] = 1;
      }
  }
});

// Convert userDept object to array of objects
const arrayOfObjects = Object.entries(userDept).map(([key, value]) => {
  return { key, value };
});

// Function to display department names and counts
function deptName() {
  // Clear previous data in tbody
  let tbody = document
      .getElementById("departmentTable")
      .getElementsByTagName("tbody")[0];
  tbody.innerHTML = "";

  // Iterate through arrayOfObjects to create table rows
  for (let i = 0; i < arrayOfObjects.length; i++) {
      let row = document.createElement("tr");
      const getObj = Object.values(arrayOfObjects[i]);
      for (let j = 0; j < getObj.length; j++) {
          let cell = document.createElement("td");
          cell.textContent = getObj[j];
          row.appendChild(cell);
      }
      tbody.appendChild(row);
  }
}

// Call deptName function to display department names and counts
deptName();

// Function to display employees with highest salary
function highestSalary() {
  let tbody = document
      .getElementById("salaryTable")
      .getElementsByTagName("tbody")[0];
  tbody.innerHTML = ""; // Clear previous data

  // Loop through the highest salary employees data
  for (let i = 0; i < twoSalary.length; i++) {
      let row = document.createElement("tr");
      const getObj = Object.values(twoSalary[i]);
      for (let j = 0; j < getObj.length; j++) {
          let cell = document.createElement("td");
          cell.textContent = getObj[j];
          row.appendChild(cell);
      }
      tbody.appendChild(row);
  }
}

highestSalary();

// Pagination
const itemsPerPage = 5;
let currentPage = 1;

// Function to display paginated data
function displayData() {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = dynamicData.slice(startIndex, endIndex);

  let tbody = document.getElementById("employeeTable").getElementsByTagName("tbody")[0];
  tbody.innerHTML = ''; // Clear previous data

  // Loop through the paginated data to display in table
  for (let i = 0; i < paginatedData.length; i++) {
      let row = document.createElement("tr");
      const getObj = Object.values(paginatedData[i]);
      for (let j = 0; j < getObj.length; j++) {
          let cell = document.createElement("td");
          cell.textContent = getObj[j];
          row.appendChild(cell);
      }
      tbody.appendChild(row);
  }

  updatePagination();
}

// Function to update pagination controls
function updatePagination() {
  const totalPages = Math.ceil(dynamicData.length / itemsPerPage);
  let pagination = document.getElementById("pagination");
  pagination.innerHTML = ''; // Clear previous pagination controls

  // Create pagination controls
  let pageno = document.createElement("li");
  pageno.textContent = "Page:";
  pagination.appendChild(pageno); 
  for (let i = 1; i <= totalPages; i++) {
      let pageItem = document.createElement("li");
      pageItem.textContent = i;
      pageItem.addEventListener("click", function () {
          currentPage = i;
          displayData();
      });
      pagination.appendChild(pageItem);
  }
}

displayData();

// Function to search for employees by name
function searchFunc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("myInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("employeeTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[0]; // Search in first column (employee name)
      if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}

// Function to filter employees by department
function filterFunc() {
  var input, filter, table, tr, td, i, txtValue;
  input = document.getElementById("filterInput");
  filter = input.value.toUpperCase();
  table = document.getElementById("employeeTable");
  tr = table.getElementsByTagName("tr");
  for (i = 0; i < tr.length; i++) {
      td = tr[i].getElementsByTagName("td")[3]; // Filter in fourth column (department)
      if (td) {
          txtValue = td.textContent || td.innerText;
          if (txtValue.toUpperCase().indexOf(filter) > -1) {
              tr[i].style.display = "";
          } else {
              tr[i].style.display = "none";
          }
      }
  }
}
