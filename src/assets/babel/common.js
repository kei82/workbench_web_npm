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
  const getContents = await fetch("/assets/babel/lib/_test_a.js");
  const responseText = await getContents.text();
  document.getElementById("js_text").innerText = `↓JSが入る fetch DEMO
    ※IE向け一部自分でポリフィル入れないといけない
    fetchとか判断できない模様
    ${responseText}`;
})();
