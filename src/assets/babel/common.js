// DEMO
import testA from './lib/test_a';

const testB = (text = "test B") => {
  console.log(text);
};

(async () => {
  await testA();
  testB();
})();
