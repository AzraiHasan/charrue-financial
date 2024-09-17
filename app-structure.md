# Coconut Shake Financial Tracker - Project Structure

```
coconut-shake-financial-tracker/
├── components/
│   ├── CashInForm.vue        // Stubbed: Form for recording cash in transactions
│   ├── CashOutForm.vue       // Stubbed: Form for recording cash out transactions
│   ├── Dashboard.vue         // Stubbed: Main dashboard component
│   └── ReportGenerator.vue   // Stubbed: Component for generating financial reports
├── layouts/
│   └── default.vue           // Stubbed: Default layout component
├── pages/
│   ├── index.vue             // Stubbed: Home page
│   ├── cash-in.vue           // Stubbed: Cash in page
│   ├── cash-out.vue          // Stubbed: Cash out page
│   └── reports.vue           // Stubbed: Reports page
├── stores/
│   ├── cashInStore.js        // Stubbed: Pinia store for cash in transactions
│   ├── cashOutStore.js       // Stubbed: Pinia store for cash out transactions
│   └── categoryStore.js      // Stubbed: Pinia store for expense categories
├── utils/
│   ├── db.js                 // Stubbed: Database utility functions
│   └── dateHelpers.js        // Stubbed: Date manipulation utility functions
├── server/
│   ├── api/
│   │   ├── cashIn.js         // Stubbed: API endpoints for cash in operations
│   │   └── cashOut.js        // Stubbed: API endpoints for cash out operations
│   └── middleware/
│       └── auth.js           // Stubbed: Authentication middleware
├── public/
│   ├── favicon.ico
│   └── images/
│       └── logo.png
├── app.vue                   // Stubbed: Main application component
├── nuxt.config.ts            // Nuxt configuration file
├── package.json              // Project dependencies and scripts
├── tsconfig.json             // TypeScript configuration
└── README.md                 // Project documentation
```

## Directory Structure Explanation

- `components/`: Reusable Vue components (all stubbed)
- `layouts/`: Application layouts (default layout stubbed)
- `pages/`: Main application pages (all stubbed, auto-routed by Nuxt)
- `stores/`: Pinia stores for state management (all stubbed)
- `utils/`: Utility functions and helpers (db.js and dateHelpers.js stubbed)
- `server/`: Server-side code and API routes
  - `api/`: API endpoints (cashIn.js and cashOut.js stubbed)
  - `middleware/`: Server middleware (auth.js stubbed)
- `public/`: Static assets served directly by the server
- `app.vue`: Main application component (stubbed)
- `nuxt.config.ts`: Nuxt configuration file
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `README.md`: Project documentation

## Stubbed Files Progress

1. Components: All main components have been stubbed out with basic structure and TODO comments.
2. Pages: All pages have been stubbed out with basic layout and component placeholders.
3. Stores: All three stores (cashInStore.js, cashOutStore.js, categoryStore.js) have been stubbed with state, getters, and actions.
4. Utils: Both db.js and dateHelpers.js have been stubbed with function placeholders and TODO comments.
5. Server:
   - API: Both cashIn.js and cashOut.js have been stubbed with basic CRUD operations and TODO comments.
   - Middleware: auth.js has been stubbed with basic token verification structure and TODO comments.

Next steps would involve implementing the actual logic in these stubbed files, creating any additional necessary components or utilities, and integrating everything into a functioning application.
