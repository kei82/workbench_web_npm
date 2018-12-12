// DEMO
const testA = (text = "test A") => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(text));
    }, 3000);
  });
};

const testB = (text = "test B") => {
  console.log(text);
};

(async () => {
  await testA();
  testB();
})();
