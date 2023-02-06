import "./styles.css";

let slideIndex = 0;

const show = (slideNumber) => {
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");

  if (slideNumber > slides.length) {
    slideIndex = 1;
  }
  if (slideNumber < 1) {
    slideIndex = slides.length;
  }

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";
};

const showAutomatically = () => {
  let slides = document.getElementsByClassName("slides");
  let dots = document.getElementsByClassName("dot");

  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }

  slideIndex++;
  if (slideIndex > slides.length) {
    slideIndex = 1;
  }

  slides[slideIndex - 1].style.display = "block";
  dots[slideIndex - 1].className += " active";

  setTimeout(showAutomatically, 2000);
};

showAutomatically();

show(slideIndex);

function plus(slide) {
  show((slideIndex += slide));
}

function current(slide) {
  show((slideIndex = slide));
}

document.querySelector("#dot1").addEventListener("click", () => {
  current(1);
});

document.querySelector("#dot2").addEventListener("click", () => {
  current(2);
});

document.querySelector("#dot3").addEventListener("click", () => {
  current(3);
});

document.querySelector("#prev").addEventListener("click", () => {
  plus(-1);
});

document.querySelector("#next").addEventListener("click", () => {
  plus(1);
});
