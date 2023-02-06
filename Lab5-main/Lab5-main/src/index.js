import "./styles.css";

async function asyncAdd(a, b) {
  if (typeof a !== "number" || typeof b !== "number") {
    return Promise.reject("Argumenty muszą mieć typ number!");
  }
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(a + b);
    }, 10);
  });
}

async function addData2(data) {
  const resultPromise = await data.reduce(async (sumPromise, item) => {
    const sumValue = await sumPromise;
    return asyncAdd(sumValue, item);
  }, 0);

  return resultPromise;
}

async function displaySum() {
  const sum = await addData2([1, 2]);

  console.log("sum", sum);
}

displaySum();

async function testTime() {
  let performanceNow = performance.now();

  await addData2([1, 2]);

  let time = performance.now() - performanceNow;
  console.log("Time", time);
}

testTime();
