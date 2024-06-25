# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

# setup (Vite + React + Typescript + SWC)  
npm create vite nnc_frontend
- react (선택)
- typescript + SWC (선택)
# 추가 패키지 설치
### react router 6.3 설치  
```angular2html
npm install react-router-dom localforage match-sorter sort-by  
```
### MUI 설치  
```angular2html
npm install @mui/material @emotion/react @emotion/styled  
```
### MUI icon 설치  
```angular2html
npm install @mui/icons-material 
```
### redux 및 redux toolkit 설치
```angular2html
npm install react-redux
npm install @reduxjs/toolkit
```
### form validation 설치  
doc: https://www.react-hook-form.com/
```angular2html
npm install react-hook-form
```