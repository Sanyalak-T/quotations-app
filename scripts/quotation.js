/** @format */

let addQuotation = document.getElementById(
  "addquotation"
);

let modal = document.getElementById(
  "modalcontainer"
);

let closeModal =
  document.getElementById("closemodal");

let addQuotationForm = document.querySelector(
  ".addquotationform"
);
let documentNo =
  document.getElementById("documentNo");

let quotationDate = document.getElementById(
  "quotationdate"
);

let company = document.getElementById("company");

let customer =
  document.getElementById("customer");

let itemDetail =
  document.getElementById("itemdetail");

let trainee = document.getElementById("trainee");

let unitPrices =
  document.getElementById("unitprices");

let cost = document.getElementById("cost");

let clearQuotation = document.getElementById(
  "btnClearQuotation"
);

let btnSaveQuotation = document.getElementById(
  "btnSaveQuotation"
);

let tbodySection =
  document.getElementById("table-body");

let quotations = localStorage.getItem(
  "quotations"
)
  ? JSON.parse(localStorage.getItem("quotations"))
  : [];

// get value show on select tag in form
let companiesAll = localStorage.getItem(
  "companies"
)
  ? JSON.parse(localStorage.getItem("companies"))
  : [];
let companyName = companiesAll.map(
  (companyName) => companyName.companyNameValue
);
let companyNameUnique = companyName.filter(
  (value, index, array) => {
    return array.indexOf(value) === index;
  }
);

let companySelect = "";
companyNameUnique.map((company, index) => {
  companySelect += `
        <option id="${index}" value="${company}">${company}</option>
    `;
});
company.innerHTML = companySelect;

// get value show on select tag in form
let customersAll = localStorage.getItem(
  "customers"
)
  ? JSON.parse(localStorage.getItem("customers"))
  : [];
let customerName = customersAll.map(
  (customerName) => customerName.customerNameValue
);
let customerNameUnique = customerName.filter(
  (value, index, array) => {
    return array.indexOf(value) === index;
  }
);

let customerSelect = "";
customerNameUnique.map((customer, index) => {
  customerSelect += `
        <option id="${index}" value="${customer}">${customer}</option>
    `;
});
customer.innerHTML = customerSelect;

let quotationId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  quotationId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;

  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";

  // delet data by id
  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      let quotationsFromLocalStorage =
        localStorage.getItem("quotations");
      quotations = JSON.parse(
        quotationsFromLocalStorage
      );
      quotations = quotations.filter(
        (quotation) => {
          if (
            quotationId !== quotation.quotationId
          ) {
            return quotations;
          }
        }
      );
      localStorage.setItem(
        "quotations",
        JSON.stringify(quotations)
      );
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent =
      e.target.parentElement.parentElement
        .parentElement;
    let documentNoEl = parent.querySelector(
      ".documentNo"
    ).textContent;

    let quotationsFromLocalStorage =
      localStorage.getItem("quotations");
    quotations = JSON.parse(
      quotationsFromLocalStorage
    );

    let index = quotations.findIndex(
      (quotation) =>
        quotation.quotationId === quotationId
    );

    const oldDateFormQuotations =
      quotations[index].quotationDateValue;

    const oldDate = new Date(
      oldDateFormQuotations
    );
    const oldDateRightForm = oldDate
      .toISOString()
      .split("T")[0];
    quotationDate.value = oldDateRightForm;

    let quotationDateEl = quotationDate.value;

    let companyEl =
      parent.querySelector(
        ".company"
      ).textContent;

    let customerEl =
      parent.querySelector(
        ".customer"
      ).textContent;

    let itemDetailEl = parent.querySelector(
      ".itemDetail"
    ).textContent;

    let traineeEl =
      parent.querySelector(
        ".trainee"
      ).textContent;

    let unitPricesEl = parent.querySelector(
      ".unitPrices"
    ).textContent;

    let costEl =
      parent.querySelector(".cost").textContent;

    documentNo.value = documentNoEl;
    quotationDateEl.value = quotationDateEl;
    company.value = companyEl;
    customer.value = customerEl;
    itemDetail.value = itemDetailEl;
    trainee.value = traineeEl;
    unitPrices.value = unitPricesEl;
    cost.value = costEl;

    addQuotationModalForm();

    let quotationIdChoose =
      quotations[index].quotationId;

    if (quotationId) {
      btnSaveQuotation.addEventListener(
        "click",
        (e) => {
          e.preventDefault();

          let quotationId = quotationIdChoose;
          let documentNoValue = documentNo.value;
          let quotationDateValue =
            quotationDate.value;
          let companyValue = company.value;
          let customerValue = customer.value;
          let itemDetailValue = itemDetail.value;
          let traineeValue = trainee.value;
          let unitPricesValue = unitPrices.value;
          let costValue = cost.value;

          let editQuotation = {
            quotationId: quotationId,
            documentNoValue: documentNoValue,
            quotationDateValue:
              quotationDateValue,
            companyValue: companyValue,
            customerValue: customerValue,
            itemDetailValue: itemDetailValue,
            traineeValue: traineeValue,
            unitPricesValue: unitPricesValue,
            costValue: costValue,
          };
          console.log(editQuotation);
          quotations[index] = editQuotation;
          console.log(quotations);
          localStorage.setItem(
            "quotations",
            JSON.stringify(quotations)
          );
          resetQuotation();
          location.reload();
        }
      );
    }
  }
});

function getQuotations() {
  if (
    localStorage.getItem("quotations") === null
  ) {
    let noRecordStyle =
      document.getElementById("table-body");
    noRecordStyle.innerHTML = "no record";
  } else {
    let quotations = JSON.parse(
      localStorage.getItem("quotations")
    );
    let quotationTable = "";
    quotations.map((quotationList, idx) => {
      quotationTable += `
          <tr data-id=${
            quotationList.quotationId
          }>
            <td>${idx + 1}</td>
            <td>
                <button class="editicon"><img id="editId" src="/images/edit-icon.svg" /></button>
                <button class="deleteicon"><img id="deleteId" src="/images/trash-icon.svg" /></button>
            </td>
            <td class="documentNo">${
              quotationList.documentNoValue
            }</td>
            <td class="quotationDate">${
              quotationList.quotationDateValue
            }</td>
            <td class="company">${
              quotationList.companyValue
            }</td>
            <td class="customer">${
              quotationList.customerValue
            }</td>
            <td class="itemDetail">${
              quotationList.itemDetailValue
            }</td>
            <td class="trainee">${
              quotationList.traineeValue
            }</td>
            <td class="unitPrices">${
              quotationList.unitPricesValue
            }</td>
            <td class="cost">${
              quotationList.costValue
            }</td>
          </tr>`;
    });
    document.getElementById(
      "table-body"
    ).innerHTML = quotationTable;
  }
}

addQuotationForm.addEventListener(
  "submit",
  (e) => {
    e.preventDefault();

    if (quotations === null) {
      console.log(quotations);
    } else {
      let documentNoValue = documentNo.value;
      let quotationDateValue =
        quotationDate.value;
      let companyValue = company.value;
      let customerValue = customer.value;
      let itemDetailValue = itemDetail.value;
      let traineeValue = trainee.value;
      let unitPricesValue = unitPrices.value;
      let costValue =
        traineeValue * unitPricesValue;

      let newQuotation = {
        quotationId: Math.random()
          .toString(16)
          .slice(2),
        documentNoValue: documentNoValue,
        quotationDateValue: quotationDateValue,
        companyValue: companyValue,
        customerValue: customerValue,
        itemDetailValue: itemDetailValue,
        traineeValue: traineeValue,
        unitPricesValue: unitPricesValue,
        costValue: costValue,
      };
      quotations.push(newQuotation);
      console.log(quotations);
      localStorage.setItem(
        "quotations",
        JSON.stringify(quotations)
      );
    }
    resetQuotation();
    closeModalQuotationList();
    location.reload();
  }
);

function closeModalQuotationList() {
  let modal = document.getElementById(
    "modalcontainer"
  );
  modal.style.display = "none";
}

function resetQuotation() {
  documentNo.value = "";
  quotationDate.value = "";
  company.value = "";
  customer.value = "";
  itemDetail.value = "";
  trainee.value = "";
  unitPrices.value = "";
  cost.value = "";
}

// show cost value auto
function costShow() {
  let trainee_value = trainee.value;
  let unit_prices = unitPrices.value;
  let costAll = trainee_value * unit_prices;
  cost.value = costAll;
}
cost.addEventListener("keyup", costShow);

// add org modal form
function addQuotationModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetQuotation();
}

addQuotation.addEventListener(
  "click",
  addQuotationModalForm
);

closeModal.addEventListener(
  "click",
  closeModalForm
);

clearQuotation.addEventListener(
  "click",
  resetQuotation
);

getQuotations();
