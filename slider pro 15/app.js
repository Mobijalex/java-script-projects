const slides = document.querySelectorAll(".slide");
const nextBtn = document.querySelectorAll(".next-btn");
const prevBtn = document.querySelectorAll(".prev-btn");

slides.forEach(function (slide, index) {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;
nextBtn.addEventListener("click", function () {
  counter++;
  carousel();
});
prevBtn.addEventListener("click", function () {
  counter--;
  carousel();
});

function carousel() {
  slides.forEach(function (slides) {
    slides.style.transform = `translateX(-${counter * 100}%)`;
  });
}
