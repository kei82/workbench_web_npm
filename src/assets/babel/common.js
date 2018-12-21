// DEMO import
import testA from "./lib/_test_a";

// DEMO def val
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
  const responseJson = await getContents.json();
  document.getElementById("js_text").innerText = `${responseJson.title}
  ${responseJson.notes}
  ${responseJson.name}`;
})();
