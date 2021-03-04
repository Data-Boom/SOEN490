module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  "roots": [
    "<rootDir>"
  ],
  "testMatch": [
    "**/?(*.)+(spec|test).+(ts|tsx|js)"
  ],
  "transform": {
    "^.+\\.(ts|tsx)$": "ts-jest"
  },
}