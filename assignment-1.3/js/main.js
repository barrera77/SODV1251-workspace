// Select the toggle button and the nav-bar-menu from the dom
const toggleBtn = document.querySelector(".toggle-btn");
const navBarMenu = document.querySelector(".nav-bar-menu");

// Add click event listener to the toggle button
toggleBtn.addEventListener("click", () => {
  navBarMenu.classList.toggle("active");
});
