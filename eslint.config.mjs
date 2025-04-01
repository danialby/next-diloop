import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// import antfu from '@antfu/eslint-config'



const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});
const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

// export default antfu({
//   react: true,
//   rules: {
//     'no-useless-catch': 'off',
//     'react-dom/no-missing-button-type': 'off',
//     'react-hooks-extra/no-direct-set-state-in-use-effect': 'off',
//     'react-refresh/only-export-components': 'off',
//     'node/prefer-global/process': 'off',
//     'react-hooks-extra/no-unnecessary-use-prefix': 'off',
//     'react/no-unstable-context-value': 'off',
//     'react/no-array-index-key': 'off',
//     'react-dom/no-dangerously-set-innerhtml': 'off',
//     'react/no-nested-component-definitions': 'off',
//     'react/no-unstable-default-props': 'off',
//   },
// })
