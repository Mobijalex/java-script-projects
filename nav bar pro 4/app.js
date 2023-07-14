// classList - shows/gets all classes
// contains - checks classList for specific class
// add - add class
// remove - remove class
// toggle - toggles class

const navToogle = document.querySelector(".nav-toggle");
const links = document.querySelector(".links");

navToogle.addEventListener("click", function () {
  links.classList.toggle("show-links");
});
