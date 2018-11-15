// DEMO
const testA = () => {
  return new Promise((resolve, rej) => {
    setTimeout(() => {
      resolve("test A");
    }, 2000);
  });
};

const testB = () => {
  console.log("test B");
};

(async () => {
  await testA().then(resolve => {
    console.log(resolve);
  });
  testB();
})();

$(".test").text("TEXT");
