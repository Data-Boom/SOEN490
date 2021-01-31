module.exports = {
  roots: ['<rootDir>/src'],
  // transform: {
  //   '^.+\\.tsx?$': 'ts-jest',
  // },
  coveragePathIgnorePatterns: [
    "node_modules",
    "Tests/",
    "test-config",
    "interfaces",
    "jestGlobalMocks.ts",
    ".module.ts",
    "<rootDir>/src/migrations/SeedDatabase.ts",
    ".mock.ts"
  ],
  collectCoverageFrom: [
    'src/Components/Graph'
  ],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}