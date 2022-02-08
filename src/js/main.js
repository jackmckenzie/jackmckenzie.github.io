// Project reveal
const reveals = Array.from(document.querySelectorAll(".reveal"));
for (var i in reveals) {
  console.log(reveals[i]);
}
reveals.forEach((el) => {
  const btn = el.querySelector(".reveal-trigger");
  const content = el.querySelector(".reveal-content");
  const contentInner = el.querySelector(".reveal-content-inner");
  const contentInfo = el.querySelector(".reveal-info");

  // set maxHeight to animate
  content.dataset.maxheight = `${
    contentInner.getBoundingClientRect().height
  }px`;
  console.log(btn);
  btn.onclick = () => {
    if (el.classList.contains("open")) {
      content.style.maxHeight = 0;
      el.classList.remove("open");
      contentInfo.textContent = "Click to show more";
      el.ariaExpanded = false;
    } else {
      content.style.maxHeight = `${
        contentInner.getBoundingClientRect().height
      }px`;
      el.classList.add("open");
      contentInfo.textContent = "Click to show less";
      el.ariaExpanded = true;
    }
  };
});

// Back to top
const backToTopButton = document.querySelector("#js-to-top");

const scrollToTop = (event) => {
  console.log("top");
  document.body.scrollIntoView({
    behavior: "smooth",
  });
};

document.addEventListener("scroll", (e) => {
  console.log("scrolling!");
  if (window.scrollY > 60) {
    backToTopButton.classList.add("show");
  } else {
    backToTopButton.classList.remove("show");
  }
});

backToTopButton.onclick = () => scrollToTop();