module.exports = {
    preset: "ts-jest",
    moduleFileExtensions: ["ts", "tsx", "js", "jsx"],
    modulePathIgnorePatterns: [
      "<rootDir>/website/.cache",
      "<rootDir>/examples",
      "<rootDir>/docs"
    ],
    transform: {
      "^.+\\.(ts|tsx)?$": "ts-jest/dist"
    },
    transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx)$"],
    globals: {
      "ts-jest": {
        tsconfig: "tsconfig.json"
      }
    }
  };