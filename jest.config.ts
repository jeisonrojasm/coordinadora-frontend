export default {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFiles: ['<rootDir>/jest.env.ts'],                // ✅ antes de todo (variables de entorno)
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],      // ✅ después de Jest (jest-dom)
  transform: {
    '^.+\\.(ts|tsx)$': ['ts-jest', { tsconfig: 'tsconfig.test.json' }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
}