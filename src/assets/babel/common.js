// DEMO
const promise = Promise.resolve();

const testA = () => {
  console.log("test A");
};

const testB = () => {
  console.log("test B");
};

promise.then(testA).then(testB);

const settime = () => {
  let data = new Date().getTime();
  $(".clock").text(data);
}

setInterval(settime, 1000);