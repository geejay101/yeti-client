module.exports = {
  moduleFileExtensions: ['js', 'json', 'vue'],
  transform: {
    '.*\\.(vue)$': '<rootDir>/node_modules/vue3-jest',
    '^.+\\.js$': '<rootDir>/node_modules/babel-jest',
    '\\.[jt]sx?$': '<rootDir>/node_modules/babel-jest',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  transformIgnorePatterns: ["/node_modules/(?!chartjs-adapter-date-fns)"],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^vue$': 'vue/dist/vue.cjs.js',
    '.+\\.(css|styl|less|sass|scss|png|jpg|svg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testEnvironment: "jsdom",
  setupFiles: ['./__mocks__/client.js'],
  setupFilesAfterEnv: ['jest-extended'],
  globals: {
    YETI_CONFIG: {
      yeti: {
        apiBaseUrl: 'dumburl',
      },
    },
  },
};
