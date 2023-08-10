## Setup React Typescript với Vite & ESLint

### Bước 1 - Khởi tạo dự án Vite

```bash
npm create vite@latest
```

- Sau khi chạy thì nó sẽ yêu cầu nhập tên dự án
- Tiếp theo là chọn Framework

```bash
✔ Select a framework: › React
```

```bash
✔ Select a variant: › TypeScript + SWC
```

- Tiếp theo vào thư mục vừa được Vite tạo

```bash
npm i
```

### Bước 2 - Cài các package liên quan ESLint và Prettier

Cài thêm 1 số package:

```bash
npm i prettier eslint-config-prettier eslint-plugin-prettier@alpha eslint-plugin-import eslint-plugin-react -D
```

_Để ý chỗ eslint-plugin-prettier@alpha mình cài bản alpha vì hiện tại thời điểm này (ngày 6/7/2023) thì bản chính thức của nó chưa tương thích với prettier version 3. Có thể cài thử eslint-plugin-prettier coi thử nó tương thích chưa nhé (test bằng câu lệnh npm run lint)_

### Bước 3 - Config ESlint để chuẩn hóa code

Mở file .eslintrc.cjs lên.

**_>> Lúc này xuất hiện lỗi đỏ ở các file khác. Cách khắc phục là sửa thành Node ở 2 file tsconfig, còn lại 1 lỗi thì xóa luôn đi:_**

```
"moduleResolution": "Node",
```

Chỉnh sửa đoạn code này trong **_module.exports_**, mục đích là mình không muốn ESLint check file **.eslintrc.cjs** và **vite.config.ts**

```
  ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts'],
```

Thêm vào Object **env**:

```
node: true
```

Thêm đoạn code sau vào mảng **_extends_**

```
'eslint-config-prettier', 'prettier'
```

Thêm đoạn code sau vào mảng **_plugins_**

```
'prettier'
```

Thêm đoạn code sau:

```ts
settings: {
    react: {
      // Nói eslint-plugin-react tự động biết version của React.
      version: 'detect'
    },
    // Nói ESLint cách xử lý các import
    'import/resolver': {
      node: {
        paths: [path.resolve(__dirname, '')],
        extensions: ['.js', '.jsx', '.ts', '.tsx']
      }
    }
  },
```

Thêm đoạn code sau vào Object **_rules_** để thêm các rule của Prettier

```ts
// Tắt rule yêu cầu import React trong file jsx
'react/react-in-jsx-scope': 'off',
// Cảnh báo khi thẻ <a target='_blank'> mà không có rel="noreferrer"
// 'react/jsx-no-target-blank': 'warn',

// Lỗi biến chưa được sử dụng đỏ lòe (error => warn)
'no-unused-vars': 'off',
'@typescript-eslint/no-unused-vars': 'warn',

'prettier/prettier': [
      'warn',
      {
        arrowParens: 'always',
        semi: false,
        trailingComma: 'none',
        tabWidth: 2,
        endOfLine: 'auto',
        useTabs: false,
        singleQuote: true,
        printWidth: 120,
        jsxSingleQuote: true
      }
    ]
```

### Bước 4 - Config Prettier để format code

Tạo file **.prettierrc**

```json
{
  "arrowParens": "always",
  "semi": false,
  "trailingComma": "none",
  "tabWidth": 2,
  "endOfLine": "auto",
  "useTabs": false,
  "singleQuote": true,
  "printWidth": 120,
  "jsxSingleQuote": true
}
```

Tạo file **.prettierignore**

```ignore
node_modules/
dist/
```

### Bước 5 - Config Editor để chuẩn hóa cấu hình editor

Tạo file **.editorconfig**

```editorconfig
[*]
indent_size = 2
indent_style = space
```

### Bước 6 - Cấu hình alias cho tsconfig.json

Việc thêm alias vào file **tsconfig.json** sẽ giúp VS Code hiểu mà tự động import giúp chúng ta, riêng đoạn **allowSyntheticDefaultImports** là khắc phục lỗi đỏ khi import.
Thêm đoạn này vào **_compilerOptions_**:

```json
"baseUrl": ".",
"paths": {
  "~/*": ["src/*"]
},
"allowSyntheticDefaultImports": true,
```

_Ý nghĩa của đoạn này là ta có thể import Login from '~/pages/Login' thay vì import Login from '../../pages/Login'. Ngắn gọn và dễ nhìn hơn nhiều!_

### Bước 7 - Cấu hình alias cho vite vite.config.ts

Cài package **@types/node** để sử dụng node js trong file ts không bị lỗi

```bash
npm i @types/node -D
```

Cấu hình alias và enable source map ở file **vite.config.ts**

```ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000
  },
  css: {
    devSourcemap: true
  },
  resolve: {
    alias: {
      '~': path.resolve(__dirname, './src')
    }
  }
})
```

### Bước 8 - Cập nhật script cho package.json

Mở file **package.json** lên, thêm đoạn script sau:

```json
"scripts": {
    //...
    "lint:fix": "eslint --fix src --ext ts,tsx",
    "prettier": "prettier --check \"src/**/(*.tsx|*.ts|*.css|*.scss)\"",
    "prettier:fix": "prettier --write \"src/**/(*.tsx|*.ts|*.css|*.scss)\""
}
```

### Fix tay file main.tsx

**_Nếu thực hiện các câu lệnh sau mà vẫn không hết lỗi tức là các lỗi này phải fix tay:_**

```bash
npm run lint:fix
npm run prettier:fix
```

### Cài đặt Tailwind CSS

```bash
npm i -D tailwindcss postcss autoprefixer
```

```bash
npx tailwindcss init -p
```

File **tailwind.config.js**:

```ts
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {}
  },
  plugins: []
}
```

**File index.css**:

```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

```bash
npm i prettier-plugin-tailwindcss
```

### Cấu hình React Router

```bash
npm i react-router-dom
```

- File **main.tsx**:

```ts
import { BrowserRouter } from 'react-router-dom'
...
<BrowserRouter>
  <App />
</BrowserRouter>
```
