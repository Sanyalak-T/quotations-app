/** @format */

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Italic.ttf",
    bolditalics: "Roboto-MediumItalic.ttf",
  },
  THSarabunNew: {
    normal:
      "https://codingthailand.com/site/fonts/th/THSarabunNew.ttf",
    bold: "https://codingthailand.com/site/fonts/th/THSarabunNewBold.ttf",
    italics:
      "https://codingthailand.com/site/fonts/th/THSarabunNewItalic.ttf",
  },
};

let getReport =
  document.getElementById("getreport");

// get select tag element from html
const selectCompany = document.getElementById(
  "choosecompany"
);
const selectCustomer = document.getElementById(
  "choosecustomer"
);
const selectItemDetail = document.getElementById(
  "itemdetails"
);
const selectBank =
  document.getElementById("choosebank");

// get companies from localstorage
let companiesFromLocalStorage;
let companiesAll;
let companyUnique;
if (
  (companiesFromLocalStorage = JSON.parse(
    localStorage.getItem("companies") === null
  ))
) {
  console.log("no record");
} else {
  companiesFromLocalStorage = JSON.parse(
    localStorage.getItem("companies")
  );
  companiesAll = companiesFromLocalStorage.map(
    (company) => company.companyNameValue
  );
  companyUnique = companiesAll.filter(
    (value, index, array) => {
      return array.indexOf(value) === index;
    }
  );
}
if (companyUnique === null || undefined) {
  console.log("no record");
} else {
  let companySelect = "";
  companyUnique.map((item, idx) => {
    companySelect += `
        <option id="${idx}" value="${item}">${item}</option>
      `;
  });
  selectCompany.innerHTML = companySelect;
}

// get customers from localstorage
let customersFromLocalstorage;
let customersAll;
let customerUnique;
if (
  (customersFromLocalstorage =
    JSON.parse(
      localStorage.getItem("customers")
    ) === null)
) {
  console.log("no record");
} else {
  customersFromLocalstorage = JSON.parse(
    localStorage.getItem("customers")
  );
  customersAll = customersFromLocalstorage.map(
    (customer) => customer.customerNameValue
  );
  customerUnique = customersAll.filter(
    (value, index, array) => {
      return array.indexOf(value) === index;
    }
  );
}
if (customerUnique === null || undefined) {
  console.log("no record");
} else {
  let customerSelect = "";
  customersAll.map((item, idx) => {
    customerSelect += `
        <option id="${idx}" value="${item}">${item}</option>
      `;
  });
  selectCustomer.innerHTML = customerSelect;
}

// get quotations from localstorage
let itemDetailsFromLocalstorage;
let itemdetailsAll;
let itemdetailUnique;
if (
  (itemDetailsFromLocalstorage =
    JSON.parse(
      localStorage.getItem("quotations")
    ) === null)
) {
  console.log("no record");
} else {
  itemDetailsFromLocalstorage = JSON.parse(
    localStorage.getItem("quotations")
  );
  itemdetailsAll =
    itemDetailsFromLocalstorage.map(
      (item) => item.itemDetailValue
    );
  itemdetailUnique = itemdetailsAll.filter(
    (value, index, array) => {
      return array.indexOf(value) === index;
    }
  );
}
if (itemdetailUnique === null || undefined) {
  console.log("no record");
} else {
  let itemDetailSelect = "";
  itemdetailsAll.map((item, idx) => {
    itemDetailSelect += `
        <option id="${idx}" value="${item}">${item}</option>
      `;
  });
  selectItemDetail.innerHTML = itemDetailSelect;
}

// get banks from localstorage
let banksFromLocalstorage;
let banksAll;
let bankUnique;
if (
  (banksFromLocalstorage =
    JSON.parse(localStorage.getItem("banks")) ===
    null)
) {
  console.log("no record");
} else {
  banksFromLocalstorage = JSON.parse(
    localStorage.getItem("banks")
  );
  banksAll = banksFromLocalstorage.map(
    (bank) => bank.bankNameValue
  );
  bankUnique = banksAll.filter(
    (value, index, array) => {
      return array.indexOf(value) === index;
    }
  );
}
if (bankUnique === null || undefined) {
  console.log("no record");
} else {
  let bankSelect = "";
  banksAll.map((item, idx) => {
    bankSelect += `
        <option id="${idx}" value="${item}">${item}</option>
      `;
  });
  selectBank.innerHTML = bankSelect;
}

// create pdf report
function genPdf(event) {
  event.preventDefault();

  const paperType = "ใบเสนอราคา";

  // user select data from html element
  const companyNameValue = selectCompany.value;
  const customerNameValue = selectCustomer.value;
  const itemDetailNameValue =
    selectItemDetail.value;
  const bankNameValue = selectBank.value;

  // get index of company
  const indexCompany =
    companiesFromLocalStorage.findIndex(
      (item) =>
        item.companyNameValue === companyNameValue
    );

  // company => data come from company menu
  let companyAddresValue =
    companiesFromLocalStorage[indexCompany]
      .companyAddressValue;
  let taxPayerNumberValue =
    companiesFromLocalStorage[indexCompany]
      .taxPayerNumberValue;
  let companyMobileNumberValue =
    companiesFromLocalStorage[indexCompany]
      .companyMobileNumberValue;

  // get value into report varible
  const companyName = companyNameValue;
  const companyAddres = companyAddresValue;
  // const companyType = "สำนักงานใหญ่ - ";
  const companyTaxPayerNumber =
    taxPayerNumberValue;
  const companyMobileNumber =
    companyMobileNumberValue;

  // get index of customer
  const indexCustomer =
    customersFromLocalstorage.findIndex(
      (item) =>
        item.customerNameValue ===
        customerNameValue
    );

  // customer => data come from company menu
  let customerAddressValue =
    customersFromLocalstorage[indexCustomer]
      .customerAddressValue;
  let customerTypeValue =
    customersFromLocalstorage[indexCustomer]
      .customerTypeValue;
  let customerTaxPayerNumberValue =
    customersFromLocalstorage[indexCustomer]
      .taxPayerNumberValue;
  let customerMobileNumberValue =
    customersFromLocalstorage[indexCustomer]
      .customerMobileNumberValue;

  // get value set into report varible
  const customerName = customerNameValue;
  const customerAddress = customerAddressValue;
  // const customerType = customerTypeValue;
  const customerTaxPayerNumber =
    customerTaxPayerNumberValue;
  const customerTelephoneNumber =
    customerMobileNumberValue;

  // get quotations from localstorage
  let quotationsFromLocalstorage;
  if (
    (quotationsFromLocalstorage =
      JSON.parse(
        localStorage.getItem("quotations")
      ) === null)
  ) {
    console.log("no record");
  } else {
    quotationsFromLocalstorage = JSON.parse(
      localStorage.getItem("quotations")
    );
  }

  // get index of quotation
  const indexQuotation =
    itemDetailsFromLocalstorage.findIndex(
      (item) =>
        item.itemDetailValue ===
        itemDetailNameValue
    );

  // quotation => data come from quotation menu
  let documentNoValue =
    itemDetailsFromLocalstorage[indexQuotation]
      .documentNoValue;
  let quotationOldDateValue =
    itemDetailsFromLocalstorage[indexQuotation]
      .quotationDateValue;
  let oldDate = new Date(quotationOldDateValue);
  let quotationDateValue = oldDate
    .toLocaleString()
    .split(",")[0];
  let itemDetailValue =
    itemDetailsFromLocalstorage[indexQuotation]
      .itemDetailValue;
  let traineeValue =
    itemDetailsFromLocalstorage[indexQuotation]
      .traineeValue;
  let unitPricesValue =
    itemDetailsFromLocalstorage[indexQuotation]
      .unitPricesValue;
  let costValue =
    itemDetailsFromLocalstorage[indexQuotation]
      .costValue;

  // get value set into report varible
  const itemDetail = itemDetailValue;
  const trainee = traineeValue;
  const unitPrices = unitPricesValue;
  const cost = costValue;

  // get index of bank
  const indexBank =
    banksFromLocalstorage.findIndex(
      (item) =>
        item.bankNameValue === bankNameValue
    );

  // bank => data come from bank menu
  let bankBranchValue =
    banksFromLocalstorage[indexBank]
      .bankBranchValue;
  let accountTypeValue =
    banksFromLocalstorage[indexBank]
      .accountTypeValue;
  let accountNameValue =
    banksFromLocalstorage[indexBank]
      .accountNameValue;
  let accountNumberValue =
    banksFromLocalstorage[indexBank]
      .accountNumberValue;

  // get value set into report varible
  const quotationRemark = "หมายเหตุ";
  const payServiceFees = "ชำระค่าบริการ";
  const bank = bankNameValue;
  const bankBranch = bankBranchValue;
  const accountType = accountTypeValue;
  const accountName = accountNameValue;
  const accountNumber = accountNumberValue;

  pdfMake
    .createPdf({
      pageOrientation: "portrait",
      pageSize: "A4",
      pageMargins: [60, 60, 60, 40],

      content: [
        {
          columnGap: 30,
          columns: [
            [
              {
                image: "logo",
                alignment: "left",
                width: 60,
              },
              {
                text: companyName,
                marginTop: 10,
                bold: true,
              },
              { text: companyAddres },
              {
                text: `เลขประจำตัวผู้เสียภาษี ${companyTaxPayerNumber}`,
              },
              {
                text: `โทร ${companyMobileNumber}`,
              },
            ], //end column 1
            [
              {
                text: paperType,
                fontSize: 25,
                color: "orange",
                alignment: "center",
              },
              {
                marginTop: 10,
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2: 230,
                    y2: 0,
                    lineWidth: 1,
                    lineColor: "grey",
                  },
                ],
              },
              {
                //table
                layout: "noBorders",
                marginTop: 10,
                table: {
                  headerRows: 1,
                  widths: ["*", "*"],
                  body: [
                    [
                      {
                        text: "เลขที่",
                        bold: true,
                      },
                      documentNoValue,
                    ],
                    [
                      {
                        text: "วันที่",
                        bold: true,
                      },
                      quotationDateValue,
                    ],
                  ],
                },
              },
              {
                marginTop: 10,
                canvas: [
                  {
                    type: "line",
                    x1: 0,
                    y1: 0,
                    x2: 230,
                    y2: 0,
                    lineWidth: 1,
                    lineColor: "grey",
                  },
                ],
              },
            ], //end column 2
          ],
        },
        [
          {
            text: "ลูกค้า",
            color: "orange",
            marginTop: 10,
          },
          { text: customerName },
          { text: customerAddress },
          {
            text: `เลขประจำตัวผู้เสียภาษี ${customerTaxPayerNumber}`,
          },
          {
            text: `โทร ${customerTelephoneNumber}`,
            marginBottom: 10,
          },
        ],
        {
          layout: "lightHorizontalLines",
          headerRows: 1,
          heights: 12,
          table: {
            widths: [
              20,
              "*",
              "auto",
              "auto",
              "auto",
            ],
            body: [
              [
                "#",
                "รายละเอียด",
                "จำนวน(ต่อคน)",
                "ราคาต่อหน่วย(บาท)",
                "มูลค่า(บาท)",
              ],
              [
                "1",
                itemDetail,
                trainee,
                unitPrices,
                cost,
              ],
            ],
          },
        },
        {
          layout: "noBorders",
          margin: [0, 10, 0, 10],
          table: {
            heights: 12,
            widths: ["*", "auto", "auto"],
            body: [
              [
                "",
                {
                  text: "รวมเป็นเงิน",
                  alignment: "right",
                },
                `${cost} บาท`,
              ],
              [
                "",
                {
                  text: "รวมเป็นเงินทั้งสิ้น",
                  alignment: "right",
                },
                `${cost} บาท`,
              ],
            ],
          },
        },
        [
          {
            text: quotationRemark,
            color: "orange",
            marginTop: 20,
          },
          // {
          //   text: "*การพัฒนาศักยภาพพนักงาน เพื่อสร้างแรงบันดาลใจ ลดภาวะหมดไฟในการทำงาน",
          // },
          {
            text: payServiceFees,
          },
          {
            text: `ธนาคาร ${bank} สาขา ${bankBranch} ${accountType}
            ชื่อบัญชี ${accountName} เลขที่บัญชี ${accountNumber}
            `,
          },
        ],
        {
          marginTop: 40,
          columnGap: 20,
          fontSize: 12,
          columns: [
            [
              {
                text: `ในนาม ${customerName}`,
                alignment: "left",
                marginBottom: 40,
              },
              {
                marginTop: 40,
                columns: [
                  [
                    {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 0,
                          x2: 80,
                          y2: 0,
                          lineWidth: 1,
                          lineColor: "grey",
                        },
                      ],
                    },
                    {
                      text: "ผู้สั่งซื้อบริการ",
                      alignment: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    },
                  ],
                  [
                    {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 0,
                          x2: 80,
                          y2: 0,
                          lineWidth: 1,
                          lineColor: "grey",
                        },
                      ],
                    },
                    {
                      text: "วันที่",
                      alignment: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    },
                  ],
                ],
              },
            ],
            {
              image: "logo",
              alignment: "center",
              width: 60,
            },
            [
              {
                text: `ในนาม ${companyName}`,
                alignment: "left",
                marginBottom: 40,
              },
              {
                marginTop: 40,
                columns: [
                  [
                    {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 0,
                          x2: 80,
                          y2: 0,
                          lineWidth: 1,
                          lineColor: "grey",
                        },
                      ],
                    },
                    {
                      text: "ผู้อนมัติ",
                      alignment: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    },
                  ],
                  [
                    {
                      canvas: [
                        {
                          type: "line",
                          x1: 0,
                          y1: 0,
                          x2: 80,
                          y2: 0,
                          lineWidth: 1,
                          lineColor: "grey",
                        },
                      ],
                    },
                    {
                      text: "วันที่",
                      alignment: "left",
                      marginTop: 10,
                      marginLeft: 20,
                    },
                  ],
                ],
              },
            ],
          ],
        },
      ],
      // {images: "logo-page.jpg"}
      images: {
        logo: "https://codingthailand.com/site/img/logo_cct.png",
        // logo: "../images/logo-page.jpg",
      },
      defaultStyle: {
        font: "THSarabunNew",
        fontSize: 14,
      },
    })
    .open();
}

getReport.addEventListener("click", genPdf);
