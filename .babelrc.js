const currentEnv = process.env.NODE_ENV;
const withLogger = process.env.LOGGER === "true";

const sharedPresets = ["razzle/babel", "@linaria"];
const sharedPlugins = [
  [
    "effector/babel-plugin",
    {
      factories: ["src/pages/history-bind"],
    },
  ],
];

const babelPluginOverrides = {
  production: {
    presets: [],
    plugins: [],
  },
  test: {
    presets: [],
    plugins: [],
  },
  development: {
    presets: [],
    plugins: [
      withLogger && [
        "transform-rename-import",
        {
          replacements: [
            { original: "effector", replacement: "effector-logger" },
          ],
        },
      ],
    ].filter(Boolean),
  },
};

const presets = sharedPresets.concat(
  babelPluginOverrides[currentEnv || "production"].presets
);
const plugins = sharedPlugins.concat(
  babelPluginOverrides[currentEnv || "production"].plugins
);

module.exports = {
  presets,
  plugins,
};
