import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),

  // Add your custom rules here
  {
    rules: {
      // Example rules - customize these to your needs
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/ban-ts-comment': 'off',
    '@typescript-eslint/no-non-null-assertion': 'off',
    '@typescript-eslint/no-unused-vars': 'warn', // Warn instead of error
    'no-console': 'off', // Allow console.log
    'no-undef': 'off', // TS already handles this
      // Add more rules as needed
    }
  }
];

export default eslintConfig;

// eslint.config.js
// import antfu from '@antfu/eslint-config'
//
// export default antfu({
//   react: true,
//   typescript: true, // Enable TypeScript support
//   rules: {
//     // Disable strict rules
//     '@typescript-eslint/no-explicit-any': 'off',
//     '@typescript-eslint/ban-ts-comment': 'off',
//     '@typescript-eslint/no-non-null-assertion': 'off',
//     '@typescript-eslint/no-unused-vars': 'warn', // Warn instead of error
//     'no-console': 'off', // Allow console.log
//     'no-undef': 'off', // TS already handles this
//   },
// })
