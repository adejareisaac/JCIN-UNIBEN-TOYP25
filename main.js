// Function to toggle the navbar visibility on mobile
function toggleMenu() {
  const nav = document.querySelector("nav");
  nav.classList.toggle("active"); // Toggle the 'active' class on <nav>
}

window.addEventListener('load', function() {
  var preloader = document.getElementById('creative-preloader');
  if (preloader) {
    preloader.style.display = 'none';
  }
});