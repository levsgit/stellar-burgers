/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

import type { JestConfigWithTsJest } from 'ts-jest';

const config: JestConfigWithTsJest = {
  // Общие настройки Jest
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  
  // Использование ts-jest
  preset: 'ts-jest',
  
  // Настройка transform для ts-jest
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        // Пример настроек для ts-jest
        tsconfig: './tsconfig.json', // Укажите путь к вашему tsconfig.json
        diagnostics: true,          // Показывать предупреждения/ошибки компилятора TypeScript
        isolatedModules: true       // Ускоряет тестирование, отключая проверку типов
      },
    ],
  },

  moduleNameMapper: {
    '^@api$': '<rootDir>/src/utils/burger-api.ts', // Убедитесь, что путь правильный
    // добавьте другие псевдонимы, если они есть
  },
};

export default config;
