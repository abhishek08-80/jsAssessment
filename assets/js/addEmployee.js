document.getElementById("employeeForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const formFields = this.elements;
    const formData = {};
    
    for (let i = 0; i < formFields.length; i++) {
      const field = formFields[i];
      if (field.value) {
        formData[field.name] = field.value;
      }
    }

    const getUserArr = localStorage.getItem("userList");
    if (getUserArr) {
      const userList = JSON.parse(getUserArr);
      const existingEmails = userList.map(user => user.email);
      if (existingEmails.includes(formData.email)) {
        alert("Employee with this email already exists.");
        return; // Do not add the employee if email already exists
      }
      const newArr = [...userList, formData];
      localStorage.setItem("userList", JSON.stringify(newArr));
    } else {
      localStorage.setItem("userList", JSON.stringify([formData]));
    }
    // Redirect to homepage after adding employee
    window.location.href = "./homePage.html";
  });
