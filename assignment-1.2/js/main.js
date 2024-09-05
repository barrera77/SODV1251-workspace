//Get buttons
const btnStyleOne = document.querySelector(".btn-style-one");
const btnStyleTwo = document.querySelector(".btn-style-two");
const btnStyleThree = document.querySelector(".btn-style-three");

//stylesheets
const styles = {
  style1: "css/style1.css",
  style2: "css/style2.css",
  style3: "css/style3.css",
};

//change the style sheet
function changeStyle(style) {
  const styleSheet = document.querySelector("#style-sheet");
  if (styleSheet) {
    styleSheet.href = styles[style];
  }
}

//Add event listeners and change the style sheets on click
btnStyleOne.addEventListener("click", (e) => {
  e.preventDefault();
  changeStyle("style1");
});

btnStyleTwo.addEventListener("click", (e) => {
  e.preventDefault();
  changeStyle("style2");
});

btnStyleThree.addEventListener("click", (e) => {
  e.preventDefault();
  changeStyle("style3");
});
