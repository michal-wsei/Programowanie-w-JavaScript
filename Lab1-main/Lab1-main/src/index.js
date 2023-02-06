import "./styles.css";

document.getElementById("app").innerHTML = `
<h1>Programowanie-w-Javascript</h1>
`;

const lab1 = document.querySelector("#lab1");

const calculate = () => {
  const values = [...lab1.querySelectorAll(".input")].map((input) =>
    Number(input.value)
  );

  const sum = values.reduce((partialSum, a) => partialSum + a, 0);
  const average = sum / values.length;
  const min = Math.min(...values);
  const max = Math.max(...values);

  lab1.querySelector(
    "#result"
  ).innerHTML = `sum: ${sum} <br> average: ${average} <br> min: ${min} <br> max: ${max}`;
};

lab1.querySelector("#przelicz").addEventListener("click", calculate);
lab1.querySelector("#inputs").addEventListener("input", calculate);
