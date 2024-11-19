// jest.config.js
module.exports = {
  preset: 'ts-jest', // Use ts-jest preset
  testEnvironment: 'node', // Use node environment
  moduleFileExtensions: ['ts', 'js'], // Recognize TypeScript and JavaScript files
  transform: {
    '^.+\\.tsx?$': 'ts-jest', // Transform TypeScript files
  },
  transformIgnorePatterns: ['/node_modules/'], // Ignore node_modules by default
};
