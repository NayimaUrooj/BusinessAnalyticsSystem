require('dotenv').config();

module.exports = function(api) {
  api.cache(true);

  const presets = [
    [
      "@babel/preset-env",
      {
        targets: {
          node: "current",
        },
        modules: "commonjs",
      },
    ],
    "@babel/preset-react",
  ];

  return {
    presets,
  };
};
