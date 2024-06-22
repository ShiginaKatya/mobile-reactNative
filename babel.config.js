module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            '^@expo/vector-icons/(.+)': './node_modules/@expo/vector-icons/\\1',
          },
        },
      ],
    ],
  };
};
