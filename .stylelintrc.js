module.exports = {
  plugins: ["stylelint-scss"],
  extends: [
    "stylelint-config-standard",
    "stylelint-config-recommended-scss",
    "stylelint-config-rational-order"
  ],
  ignoreFiles: ["**/node_modules/**"],
  rules: {}
};
