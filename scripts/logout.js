// log out
const logoutBtn =
  document.getElementById("logout");

function goToLoginPage() {
  let check = confirm(
    "คุณกำลังจะออกจากโปรแกรมพัสดุ?"
  );
  if (check === true) {
    location.href = "/index.html";
  }
}

logoutBtn.addEventListener(
  "click",
  goToLoginPage
);
