/** @format */

let addCompany =
  document.getElementById("addcompany");

let modal = document.getElementById(
  "modalcontainer"
);
let closeModal =
  document.getElementById("closemodal");

let addCompanyForm = document.querySelector(
  ".addcompanyform"
);
let companyName = document.getElementById(
  "companyname"
);
let companyAddress = document.getElementById(
  "companyaddress"
);
let taxPayerNumber = document.getElementById(
  "taxpayernumber"
);
let companyType = document.getElementsByName(
  "companytype"
);
let companyMobileNumber = document.getElementById(
  "companyMobileNumber"
);

let clearCompany = document.getElementById(
  "btnClearCompany"
);
let btnSaveCompany = document.getElementById(
  "btnSaveCompany"
);
let tbodySection =
  document.getElementById("table-body");

let companies = localStorage.getItem("companies")
  ? JSON.parse(localStorage.getItem("companies"))
  : [];

// next one
let companyId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  companyId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;
  console.log(companyId);

  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";

  // delet data by id
  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      let companiesFromLocalStorage =
        localStorage.getItem("companies");
      companies = JSON.parse(
        companiesFromLocalStorage
      );
      companies = companies.filter((company) => {
        if (companyId !== company.companyId) {
          return companies;
        }
      });
      localStorage.setItem(
        "companies",
        JSON.stringify(companies)
      );
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent =
      e.target.parentElement.parentElement
        .parentElement;
    let companyNameEl = parent.querySelector(
      ".companyName"
    ).textContent;
    let companyAddressEl = parent.querySelector(
      ".companyAddress"
    ).textContent;
    let taxPayerNumberEl = parent.querySelector(
      ".taxPayerNumber"
    ).textContent;
    let companyMobileNumberEl =
      parent.querySelector(
        ".companyMobileNumber"
      ).textContent;

    companyName.value = companyNameEl;
    companyAddress.value = companyAddressEl;
    taxPayerNumber.value = taxPayerNumberEl;
    companyMobileNumber.value =
      companyMobileNumberEl;

    addCompnayModalForm();

    let companiesFromLocalStorage =
      localStorage.getItem("companies");
    companies = JSON.parse(
      companiesFromLocalStorage
    );
    console.log(companies);

    let index = companies.findIndex(
      (company) => company.companyId === companyId
    );
    let companyIdChoose =
      companies[index].companyId;

    if (companyId) {
      btnSaveCompany.addEventListener(
        "click",
        (e) => {
          e.preventDefault();

          let companyId = companyIdChoose;
          let companyNameValue =
            companyName.value;
          let companyAddressValue =
            companyAddress.value;
          let taxPayerNumberValue =
            taxPayerNumber.value;
          let checkedRadio = Array.from(
            companyType
          ).find((radio) => radio.checked);
          console.log(checkedRadio);

          let companyTypeValue =
            checkedRadio.value;
          // let companyTypeValue = companyType.value;
          let companyMobileNumberValue =
            companyMobileNumber.value;

          let editCompany = {
            companyId: companyId,
            companyNameValue: companyNameValue,
            companyAddressValue:
              companyAddressValue,
            taxPayerNumberValue:
              taxPayerNumberValue,
            companyTypeValue: companyTypeValue,
            companyMobileNumberValue:
              companyMobileNumberValue,
          };
          console.log(editCompany);
          companies[index] = editCompany;
          console.log(companies);
          localStorage.setItem(
            "companies",
            JSON.stringify(companies)
          );
          resetCompany();
          location.reload();
        }
      );
    }
  }
});

function getCompanies() {
  if (
    localStorage.getItem("companies") === null
  ) {
    let noRecordStyle =
      document.getElementById("table-body");
    noRecordStyle.innerHTML = "no record";
  } else {
    let companies = JSON.parse(
      localStorage.getItem("companies")
    );
    let companyTable = "";
    companies.map((companiesList, idx) => {
      companyTable += `
          <tr data-id=${companiesList.companyId}>
            <td>${idx + 1}</td>
            <td>
                <button class="editicon"><img id="editId" src="/images/edit-icon.svg" /></button>
                <button class="deleteicon"><img id="deleteId" src="/images/trash-icon.svg" /></button>
            </td>
            <td class="companyName">${
              companiesList.companyNameValue
            }</td>
            <td class="companyAddress">${
              companiesList.companyAddressValue
            }</td>
            <td class="taxPayerNumber">${
              companiesList.taxPayerNumberValue
            }</td>
            <td class="companyType">${
              companiesList.companyTypeValue
            }</td>
            <td class="companyMobileNumber">${
              companiesList.companyMobileNumberValue
            }</td>
          </tr>`;
    });
    document.getElementById(
      "table-body"
    ).innerHTML = companyTable;
  }
}

addCompanyForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (companies === null) {
    console.log(companies);
  } else {
    let companyNameValue = companyName.value;
    let companyAddressValue =
      companyAddress.value;
    let taxPayerNumberValue =
      taxPayerNumber.value;
    let companyMobileNumberValue =
      companyMobileNumber.value;

    let checkedRadio = Array.from(
      companyType
    ).find((radio) => radio.checked);

    let companyTypeValue = checkedRadio.value;

    let newCompany = {
      companyId: Math.random()
        .toString(16)
        .slice(2),
      companyNameValue: companyNameValue,
      companyAddressValue: companyAddressValue,
      taxPayerNumberValue: taxPayerNumberValue,
      companyTypeValue: companyTypeValue,
      companyMobileNumberValue:
        companyMobileNumberValue,
    };
    companies.push(newCompany);
    console.log(companies);
    localStorage.setItem(
      "companies",
      JSON.stringify(companies)
    );
  }
  resetCompany();
  closeModalCompanyList();
  location.reload();
});

function closeModalCompanyList() {
  let modal = document.getElementById(
    "modalcontainer"
  );
  modal.style.display = "none";
}

function resetCompany() {
  companyName.value = "";
  companyAddress.value = "";
  taxPayerNumber.value = "";
  companyMobileNumber.value = "";
}

// add org modal form
function addCompnayModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetCompany();
}

addCompany.addEventListener(
  "click",
  addCompnayModalForm
);

closeModal.addEventListener(
  "click",
  closeModalForm
);

clearCompany.addEventListener(
  "click",
  resetCompany
);

getCompanies();
