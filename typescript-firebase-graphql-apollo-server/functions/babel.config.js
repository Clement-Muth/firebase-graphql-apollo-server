module.exports = function(api) {
  api.cache(true);

  const presets = ["next/babel"];
  const plugins = [["emotion"]];

  return {
    presets,
    plugins
  };
};
