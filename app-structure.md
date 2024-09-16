# Coconut Shake Financial Tracker - Project Structure

```
coconut-shake-financial-tracker/
├── components/
│   ├── CashInForm.vue
│   ├── CashOutForm.vue
│   ├── Dashboard.vue
│   └── ReportGenerator.vue
├── layouts/
│   └── default.vue
├── pages/
│   ├── index.vue
│   ├── cash-in.vue
│   ├── cash-out.vue
│   └── reports.vue
├── stores/
│   ├── cashInStore.js
│   ├── cashOutStore.js
│   └── categoryStore.js
├── utils/
│   ├── db.js
│   └── dateHelpers.js
├── server/
│   ├── api/
│   │   ├── cashIn.js
│   │   └── cashOut.js
│   └── middleware/
│       └── auth.js
├── public/
│   ├── favicon.ico
│   └── images/
│       └── logo.png
├── app.vue
├── nuxt.config.ts
├── package.json
├── tsconfig.json
└── README.md
```

## Directory Structure Explanation

- `components/`: Reusable Vue components
- `layouts/`: Application layouts
- `pages/`: Main application pages (auto-routed by Nuxt)
- `stores/`: Pinia stores for state management
- `utils/`: Utility functions and helpers
- `server/`: Server-side code and API routes
  - `api/`: API endpoints
  - `middleware/`: Server middleware
- `public/`: Static assets served directly by the server
- `app.vue`: Main application component
- `nuxt.config.ts`: Nuxt configuration file
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `README.md`: Project documentation
