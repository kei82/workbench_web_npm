// DEMO import
import testA from "./lib/_test_a";

// DEMO async/await
const testB = (text = "test B") => {
  console.log(text);
};

(async () => {
  await testA();
  testB();
})();

// DEMO fetch
fetch("/assets/babel/lib/_test_a.js", {
  method: "get"
}).then(function(response) {
  response.text().then(e => {
    document.getElementById("js_text").innerText =
      "↓JSが入る fetch DEMO\n※IE向け一部自分でポリフィル入れないといけない\nfetchとか判断できない模様\n" +
      e;
  });
});
