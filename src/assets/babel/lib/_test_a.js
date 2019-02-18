export default (text = "test A") => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve(console.log(text));
    }, 3000);
  });
};
