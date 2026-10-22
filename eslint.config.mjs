import nextVitals from "eslint-config-next/core-web-vitals";
import nextTs from "eslint-config-next/typescript";
import prettier from "eslint-config-prettier/flat";
import simpleImportSort from "eslint-plugin-simple-import-sort";

export default [
    ...nextVitals,
    ...nextTs,
    prettier,
    {
        plugins: { "simple-import-sort": simpleImportSort },
        rules: { "simple-import-sort/imports": "warn", "@typescript-eslint/no-explicit-any": "off" },
    },
    { ignores: [".next/**", "node_modules/**", "next-env.d.ts"] },
];
