/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
export default {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  // setupFilesAfterEnv: ['<rootDir>/src/shared/infra/prisma-mock.ts'],
  roots: ['<rootDir>/src'],
  // setupFiles: ['<rootDir>/setup-jest.ts'],
  transform: {
    '^.+\\.ts?$': ['@swc/jest'],
  },
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: ['<rootDir>/node_modules/'],
  collectCoverageFrom: [
    '!**/main/**/*',
    '!**/*.mock.ts',
    '!**/*.stub.ts',
    '!**/*.container.ts',
    '!**/*.router.ts',
    '!**/*.e2e.ts',
  ],
};
