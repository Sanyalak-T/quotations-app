/** @format */

let addBank = document.getElementById("addbank");

let modal = document.getElementById(
  "modalcontainer"
);
let closeModal =
  document.getElementById("closemodal");

let addBankForm = document.querySelector(
  ".addbankform"
);
let bankName =
  document.getElementById("bankname");
let bankBranch =
  document.getElementById("bankbranch");
let accountType = document.getElementById(
  "accounttype"
);
let accountName = document.getElementById(
  "accountname"
);
let accountNumber = document.getElementById(
  "accountnumber"
);

let clearBank = document.getElementById(
  "btnClearBank"
);
let btnSaveBank = document.getElementById(
  "btnSaveBank"
);
let tbodySection =
  document.getElementById("table-body");

let banks = localStorage.getItem("banks")
  ? JSON.parse(localStorage.getItem("banks"))
  : [];

let bankId;
tbodySection.addEventListener("click", (e) => {
  e.preventDefault();

  bankId =
    e.target.parentElement.parentElement
      .parentElement.dataset.id;
  console.log(bankId);

  let deletebtn = e.target.id === "deleteId";
  let editbtn = e.target.id === "editId";

  // delet data by id
  if (deletebtn) {
    if (confirm("คุณจะลบข้อมูลแถวนี้หรือไม่!")) {
      let banksFromLocalStorage =
        localStorage.getItem("banks");
      banks = JSON.parse(banksFromLocalStorage);
      banks = banks.filter((bank) => {
        if (bankId !== bank.bankId) {
          return banks;
        }
      });
      localStorage.setItem(
        "banks",
        JSON.stringify(banks)
      );
      location.reload();
    }
  }

  // edit data by id
  if (editbtn) {
    const parent =
      e.target.parentElement.parentElement
        .parentElement;
    let bankNameEl =
      parent.querySelector(
        ".bankName"
      ).textContent;
    let bankBranchEl = parent.querySelector(
      ".bankBranch"
    ).textContent;
    let accountTypeEl = parent.querySelector(
      ".accountType"
    ).textContent;
    let accountNameEl = parent.querySelector(
      ".accountName"
    ).textContent;
    let accountNumberEl = parent.querySelector(
      ".accountNumber"
    ).textContent;

    bankName.value = bankNameEl;
    bankBranch.value = bankBranchEl;
    accountType.value = accountTypeEl;
    accountName.value = accountNameEl;
    accountNumber.value = accountNumberEl;

    addBankModalForm();

    let banksFromLocalStorage =
      localStorage.getItem("banks");
    banks = JSON.parse(banksFromLocalStorage);
    console.log(banks);

    let index = banks.findIndex(
      (bank) => bank.bankId === bankId
    );
    let bankIdChoose = banks[index].bankId;

    if (bankId) {
      btnSaveBank.addEventListener(
        "click",
        (e) => {
          e.preventDefault();

          let bankId = bankIdChoose;
          let bankNameValue = bankName.value;
          let bankBranchValue = bankBranch.value;
          let accountTypeValue =
            accountType.value;
          let accountNameValue =
            accountName.value;
          let accountNumberValue =
            accountNumber.value;

          let editBank = {
            bankId: bankId,
            bankNameValue: bankNameValue,
            bankBranchValue: bankBranchValue,
            accountTypeValue: accountTypeValue,
            accountNameValue: accountNameValue,
            accountNumberValue:
              accountNumberValue,
          };
          console.log(editBank);
          banks[index] = editBank;
          console.log(banks);
          localStorage.setItem(
            "banks",
            JSON.stringify(banks)
          );
          resetBank();
          location.reload();
        }
      );
    }
  }
});

function getBank() {
  if (localStorage.getItem("banks") === null) {
    let noRecordStyle =
      document.getElementById("table-body");
    noRecordStyle.innerHTML = "no record";
  } else {
    let banks = JSON.parse(
      localStorage.getItem("banks")
    );
    let bankTable = "";
    banks.map((bankList, idx) => {
      bankTable += `
          <tr data-id=${bankList.bankId}>
            <td>${idx + 1}</td>
            <td>
                <button class="editicon"><img id="editId" src="/images/edit-icon.svg" /></button>
                <button class="deleteicon"><img id="deleteId" src="/images/trash-icon.svg" /></button>
            </td>
            <td class="bankName">${
              bankList.bankNameValue
            }</td>
            <td class="bankBranch">${
              bankList.bankBranchValue
            }</td>
            <td class="accountType">${
              bankList.accountTypeValue
            }</td>
            <td class="accountName">${
              bankList.accountNameValue
            }</td>
            <td class="accountNumber">${
              bankList.accountNumberValue
            }</td>
          </tr>`;
    });
    document.getElementById(
      "table-body"
    ).innerHTML = bankTable;
  }
}

addBankForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (banks === null) {
    console.log(banks);
  } else {
    let bankNameValue = bankName.value;
    let bankBranchValue = bankBranch.value;
    let accountTypeValue = accountType.value;
    let accountNameValue = accountName.value;
    let accountNumberValue = accountNumber.value;

    let newBank = {
      bankId: Math.random().toString(16).slice(2),
      bankNameValue: bankNameValue,
      bankBranchValue: bankBranchValue,
      accountTypeValue: accountTypeValue,
      accountNameValue: accountNameValue,
      accountNumberValue: accountNumberValue,
    };
    banks.push(newBank);
    console.log(banks);
    localStorage.setItem(
      "banks",
      JSON.stringify(banks)
    );
  }
  resetBank();
  closeModalBankList();
  location.reload();
});

function closeModalBankList() {
  let modal = document.getElementById(
    "modalcontainer"
  );
  modal.style.display = "none";
}

function resetBank() {
  bankName.value = "";
  bankBranch.value = "";
  accountType.value = "";
  accountName.value = "";
  accountNumber.value = "";
}

// add org modal form
function addBankModalForm() {
  modal.style.display = "block";
}

// close modal form
function closeModalForm() {
  modal.style.display = "none";
  resetBank();
}

addBank.addEventListener(
  "click",
  addBankModalForm
);

closeModal.addEventListener(
  "click",
  closeModalForm
);

clearBank.addEventListener("click", resetBank);

getBank();
