// Select the toggle button and the nav-bar-menu
const toggleBtn = document.querySelector(".toggle-btn");
const navBarMenu = document.querySelector(".menu");

// Add click event listener to the toggle button
toggleBtn.addEventListener("click", () => {
  // Toggle the 'active' class on the nav-bar-menu
  navBarMenu.classList.toggle("active");
});
