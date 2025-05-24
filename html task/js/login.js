const form = document.getElementById("loginForm");

form.addEventListener("submit", function(e) {
  e.preventDefault();

  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  if (username === "admin" && password === "1234") {
    showToast("Login Successfull");
  } else {
    showToast("Invalid username or password", "linear-gradient(to right, #ff5f6d, #ffc371)");
  }
});

function showToast(message, bgcolor = "linear-gradient(to right, #00b09b, #96c93d)") {
  Toastify({
    text: message,
    duration: 2000,
    close: true,
    gravity: "top",
    position: "right",
    backgroundColor: bgcolor,
    stopOnFocus: true,
    className: "custom-toast"
  }).showToast();
}