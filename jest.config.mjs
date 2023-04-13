// jest.config.mjs
import nextJest from 'next/jest.js'

const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: './',
})

// function makeModuleNameMapper(srcPath, tsconfigPath) {
//   // Get paths from tsconfig
//   const {paths} = require(tsconfigPath).compilerOptions;

//   const aliases = {};

//   // Iterate over paths and convert them into moduleNameMapper format
//   Object.keys(paths).forEach((item) => {
//       const key = item.replace('/*', '/(.*)');
//       const path = paths[item][0].replace('/*', '/$1');
//       aliases[key] = srcPath + '/' + path;
//   });
//   return aliases;
// }

// const TS_CONFIG_PATH = './tsconfig.json';
// const SRC_PATH = '<rootDir>/src';

// Add any custom config to be passed to Jest
/** @type {import('jest').Config} */
const config = {
  // Add more setup options before each test is run
  // setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],

  testEnvironment: 'jest-environment-jsdom',
  moduleDirectories: ['node_modules', '<rootDir>/src'],
}

// createJestConfig is exported this way to ensure that next/jest can load the Next.js config which is async
export default createJestConfig(config)