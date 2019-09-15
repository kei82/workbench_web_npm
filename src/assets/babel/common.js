// DEMO import
import testA from "./lib/_test_a";

// DEMO initial value
const testB = (text = "test B") => {
  console.log(text);
};

// DEMO async/await
(async () => {
  await testA();
  testB();
})();

// DEMO fetch
(async () => {
  const getContents = await fetch("/assets/js/test.json");
  const responseJson = await getContents.j
