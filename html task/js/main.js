function showToast(message, bgcolor = "linear-gradient(to right, #00b09b, #96c93d)") {
  Toastify({
    text: message,
    duration: 2000,              // Toast disappears in 3 seconds
    close: true,                 // Show close icon
    gravity: "top",              // top or bottom
    position: "right",           // left, center or right
    backgroundColor: bgcolor,
    stopOnFocus: true,            // Prevents dismiss on hover
    className: "custom-toast"
  }).showToast();
}

function handleSubmit(event) {
  event.preventDefault(); // Stop default form behavior
  showToast("Register successfully ")
  setTimeout(() => {
    window.location.href = "login.html"; 
  }, 2000);
}
