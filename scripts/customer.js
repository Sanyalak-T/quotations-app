/** @format */

let addCustomer = document.getElementById(
  "addcustomer"
);

let modal = document.getElementById(
  "modalcontainer"
);
let closeModal =
  document.getElementById("closemodal");

let addCustomerForm = document.querySelector(
  ".addcustomerform"
);
let customerName = document.getElementById(
  "customername"
);
let customerAddress = document.getElementById(
  "customeraddress"
);
let taxPayerNumber = document.getElementById(
  "taxpayernumber"
);
let customerType = document.getElementsByName(
  "customertype"
);
let customerMobileNumber =
  document.getElementById("customerMobileNumber");

let clearCustomer = document.getElementById(
  "btnClearCustomer"
);
let btnSaveCustomer = document.getElementById(
  "btnSaveCustomer"
);
let tbodySection =
  document.getElementById("table-body");

let customers = localStorage.getItem("customers")
  ? JSON.parse(localStorage.getItem("customers"))
  : [];

let customerId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  customerId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;
  console.log(customerId);

  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";

  // delet data by id
  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      let customersFromLocalStorage =
        localStorage.getItem("customers");
      customers = JSON.parse(
        customersFromLocalStorage
      );
      customers = customers.filter((customer) => {
        if (customerId !== customer.customerId) {
          return customers;
        }
      });
      localStorage.setItem(
        "customers",
        JSON.stringify(customers)
      );
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent =
      e.target.parentElement.parentElement
        .parentElement;
    let customerNameEl = parent.querySelector(
      ".customerName"
    ).textContent;
    let customerAddressEl = parent.querySelector(
      ".customerAddress"
    ).textContent;
    let taxPayerNumberEl = parent.querySelector(
      ".taxPayerNumber"
    ).textContent;
    let customerMobileNumberEl =
      parent.querySelector(
        ".customerMobileNumber"
      ).textContent;

    customerName.value = customerNameEl;
    customerAddress.value = customerAddressEl;
    taxPayerNumber.value = taxPayerNumberEl;
    customerMobileNumber.value =
      customerMobileNumberEl;

    addCompnayModalForm();

    let customersFromLocalStorage =
      localStorage.getItem("customers");
    customers = JSON.parse(
      customersFromLocalStorage
    );
    console.log(customers);

    let index = customers.findIndex(
      (customer) =>
        customer.customerId === customerId
    );
    let customerIdChoose =
      customers[index].customerId;
    console.log(customerIdChoose);

    if (customerId) {
      btnSaveCustomer.addEventListener(
        "click",
        (e) => {
          e.preventDefault();

          let customerId = customerIdChoose;
          let customerNameValue =
            customerName.value;
          let customerAddressValue =
            customerAddress.value;
          let taxPayerNumberValue =
            taxPayerNumber.value;

          let checkedRadio = Array.from(
            customerType
          ).find((radio) => radio.checked);
          console.log(checkedRadio);
          let customerTypeValue =
            checkedRadio.value;

          let customerMobileNumberValue =
            customerMobileNumber.value;

          let editCustomer = {
            customerId: customerId,
            customerNameValue: customerNameValue,
            customerAddressValue:
              customerAddressValue,
            taxPayerNumberValue:
              taxPayerNumberValue,
            customerTypeValue: customerTypeValue,
            customerMobileNumberValue:
              customerMobileNumberValue,
          };
          console.log(editCustomer);
          customers[index] = editCustomer;
          console.log(customers);
          localStorage.setItem(
            "customers",
            JSON.stringify(customers)
          );
          resetCustomer();
          location.reload();
        }
      );
    }
  }
});

function getCustomers() {
  if (
    localStorage.getItem("customers") === null
  ) {
    let noRecordStyle =
      document.getElementById("table-body");
    noRecordStyle.innerHTML = "no record";
  } else {
    let customers = JSON.parse(
      localStorage.getItem("customers")
    );
    let customerTable = "";
    customers.map((customerList, idx) => {
      customerTable += `
          <tr data-id=${customerList.customerId}>
            <td>${idx + 1}</td>
            <td>
                <button class="editicon"><img id="editId" src="/images/edit-icon.svg" /></button>
                <button class="deleteicon"><img id="deleteId" src="/images/trash-icon.svg" /></button>
            </td>
            <td class="customerName">${
              customerList.customerNameValue
            }</td>
            <td class="customerAddress">${
              customerList.customerAddressValue
            }</td>
            <td class="taxPayerNumber">${
              customerList.taxPayerNumberValue
            }</td>
            <td class="customerType">${
              customerList.customerTypeValue
            }</td>
            <td class="customerMobileNumber">${
              customerList.customerMobileNumberValue
            }</td>
          </tr>`;
    });
    document.getElementById(
      "table-body"
    ).innerHTML = customerTable;
  }
}

addCustomerForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();

    if (customers === null) {
      console.log(customers);
    } else {
      let customerNameValue = customerName.value;
      let customerAddressValue =
        customerAddress.value;
      let taxPayerNumberValue =
        taxPayerNumber.value;
      let customerMobileNumberValue =
        customerMobileNumber.value;

      let checkedRadio = Array.from(
        customerType
      ).find((radio) => radio.checked);

      let customerTypeValue = checkedRadio.value;

      let newcustomer = {
        customerId: Math.random()
          .toString(16)
          .slice(2),
        customerNameValue: customerNameValue,
        customerAddressValue:
          customerAddressValue,
        taxPayerNumberValue: taxPayerNumberValue,
        customerTypeValue: customerTypeValue,
        customerMobileNumberValue:
          customerMobileNumberValue,
      };
      customers.push(newcustomer);
      console.log(customers);
      localStorage.setItem(
        "customers",
        JSON.stringify(customers)
      );
    }
    resetCustomer();
    closeModalCustomerList();
    location.reload();
  }
);

function closeModalCustomerList() {
  let modal = document.getElementById(
    "modalcontainer"
  );
  modal.style.display = "none";
}

function resetCustomer() {
  customerName.value = "";
  customerAddress.value = "";
  taxPayerNumber.value = "";
  customerMobileNumber.value = "";
}

// add org modal form
function addCompnayModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetCustomer();
}

addCustomer.addEventListener(
  "click",
  addCompnayModalForm
);

closeModal.addEventListener(
  "click",
  closeModalForm
);

clearCustomer.addEventListener(
  "click",
  resetCustomer
);

getCustomers();
