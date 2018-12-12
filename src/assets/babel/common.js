// DEMO
const testA = () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log("test A"));
    }, 3000);
  });
};

const testB = () => {
  console.log("test B");
};

(async () => {
  await testA();
  testB();
})();
