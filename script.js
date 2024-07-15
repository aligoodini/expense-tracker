const income = document.querySelector("#income");
const expense = document.querySelector("#expense");
const daramad = document.querySelector("#daramad");
const hazine = document.querySelector("#hazine");
const amountInput = document.querySelector("#amount-input");
const dateInput = document.querySelector("#date-input");
const addBtn = document.querySelector("#add-btn");
const tbody = document.querySelector("tbody");
const totalItem = document.querySelector("#total-amount");
const totalDays = document.querySelector("#total-days");
let arrayLocal;
let redOrGreen = "success";
let totalAmount = 0;
let totalDate = [];
let numberOfTr = "";
let categoryName = "درآمد";
let costFor = "پروژه فریلنسری";

// -----------------------------------------------get data from Ls

window.addEventListener("load", (e) => {
  loadWork();
});

loadWork = () => {
  let getAllData = JSON.parse(localStorage.getItem("data"));
  if (getAllData) {
    totalAmount = 0;
    arrayLocal = [...getAllData];

    getAllData.forEach((item) => {
      let tr = document.createElement("tr");

      // ------------------------------------------sum the amount
      if (item.category == "هزینه") {
        redOrGreen = "danger";
        totalAmount -= Number(item.amount);
      } else {
        redOrGreen = "success";
        totalAmount += Number(item.amount);
      }

      console.log(typeof totalAmount);
      if (totalAmount > 0) {
        totalItem.classList = "";
        totalItem.classList.add("table-success");
      } else {
        totalItem.classList = "";
        totalItem.classList.add("table-danger");
      }
      totalItem.innerHTML = `${totalAmount} تومان`;

      // -----------------------------------------------sum the days (1)
      totalDate.push(item.date);

      tr.classList.add(`table-${redOrGreen}`);
      tr.innerHTML = `<th scope="row">${item.id}</th>
              <td>${item.category}</td>
              <td>${item.babat}</td>
              <td>${item.amount}</td>
              <td>${item.date}</td>
              <td><i class="icon fas fa-trash"></i></td>
              `;

      tbody.appendChild(tr);
    });

    // -----------------------------------------------sum the days (2)
    let numberOfDays = [...new Set(totalDate)].length;

    totalDays.innerHTML = `طی ${numberOfDays} روز`;
  } else {
    arrayLocal = [];
  }
};

// -------------------------------------------disable or active selectbox based on radio box and color of row
expense.addEventListener("change", (e) => {
  hazine.disabled = false;
  daramad.disabled = true;

  redOrGreen = "danger";
  costFor = "تاکسی";
});
income.addEventListener("change", (e) => {
  hazine.disabled = true;
  daramad.disabled = false;

  redOrGreen = "success";
  costFor = "پروژه فریلنسری";
});

// ------------------------------------------------select box
hazine.addEventListener("change", (e) => {
  console.log(e.target.value);
  switch (e.target.value) {
    case "fastFood":
      costFor = "فست فود";
      break;
    case "Rent":
      costFor = "فست فود";
      break;
    default:
      costFor = "تاکسی";
  }
  console.log(costFor);
});
daramad.addEventListener("change", (e) => {
  console.log(e.target.value);
  switch (e.target.value) {
    case "salery":
      costFor = "حقوق ماهانه";
      break;
    case "Subsidy":
      costFor = "یارانه";
      break;
    default:
      costFor = "پروژه فریلنسری";
  }
  console.log(costFor);
});

//--------------------------------------------add new item
addBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //   console.log(dateInput.value)
  //   console.log(amountInput.value)
  //   if(dateInput == "")
  if (dateInput.value != "" && amountInput.value != "") {
    numberOfTr = tbody.children.length;

    let selected = document.querySelector('input[name="cost"]:checked');
    let selectedRadioName = selected.value;
    if (selectedRadioName == "income") {
      categoryName = "درآمد";
    } else if (selectedRadioName == "expense") {
      categoryName = "هزینه";
    }


    //   -----------------------------------------------save in local-storage
    let newObject = {
      id: `${numberOfTr + 1}`,
      category: `${categoryName}`,
      babat: `${costFor}`,
      amount: Number(amountInput.value),
      date: `${dateInput.value}`,
    };

    arrayLocal.push(newObject);
    console.log(arrayLocal);

    localStorage.setItem("data", JSON.stringify(arrayLocal));

    tbody.innerHTML = "";
    loadWork();

    amountInput.value = "";
    dateInput.value = "";
  } else if (dateInput.value == "") {
    alert("لطفا تاریخ را وارد کنید");
  } else if (amountInput.value == "") {
    alert("لطفا مبلغ را وارد کنید");
  }
});

// -----------------------------------------------delete row

tbody.addEventListener("click", (e) => {
  let filteredArray = [];
  if (e.target.nodeName == "I") {
    let idNum = e.target.parentElement.parentElement.children[0].innerHTML;
    filteredArray = arrayLocal.filter((item) => item.id != idNum);
    console.log(filteredArray);
    localStorage.setItem("data", JSON.stringify(filteredArray));
    e.target.parentElement.parentElement.remove();

    tbody.innerHTML = "";
    loadWork();
  }
});
