# Coconut Shake Financial Tracker - Project Structure

```
coconut-shake-financial-tracker/
├── components/
│   ├── CashInForm.vue        // Form for recording cash in transactions
│   ├── CashOutForm.vue       // Form for recording cash out transactions
│   ├── Dashboard.vue         // Main dashboard component (to be implemented)
│   ├── ReportGenerator.vue   // Component for generating financial reports (to be implemented)
│   └── TransactionList.vue   // Component for displaying both cash-in and cash-out transactions
├── composables/
│   └── useDatabase.js        // Composable for IndexedDB operations
├── layouts/
│   └── default.vue           // Default layout component
├── pages/
│   ├── index.vue             // Home page with dashboard and quick actions
│   ├── cash-in.vue           // Cash in page with form and transaction list
│   ├── cash-out.vue          // Cash out page with form and transaction list
│   └── reports.vue           // Reports page (to be implemented)
├── stores/
│   ├── cashInStore.js        // Pinia store for cash in transactions
│   └── cashOutStore.js       // Pinia store for cash out transactions
├── utils/
│   ├── dateHelpers.js        // Utility functions for date manipulation
│   └── financialCalculations.js // Utility functions for financial calculations (to be implemented)
├── server/
│   ├── api/
│   │   ├── cashIn.js         // API endpoints for cash in operations
│   │   └── cashOut.js        // API endpoints for cash out operations
│   └── middleware/
│       └── auth.js           // Authentication middleware (to be implemented)
├── public/
│   ├── favicon.ico
│   └── images/
│       └── logo.png
├── app.vue                   // Main application component
├── nuxt.config.ts            // Nuxt configuration file
├── package.json              // Project dependencies and scripts
├── tsconfig.json             // TypeScript configuration
└── README.md                 // Project documentation

```

## Directory Structure Explanation

- `components/`: Reusable Vue components
  - `CashInForm.vue`: Form for inputting cash-in transactions
  - `CashOutForm.vue`: Form for inputting cash-out transactions
  - `Dashboard.vue`: Main dashboard component (to be implemented)
  - `ReportGenerator.vue`: Component for generating financial reports (to be implemented)
  - `TransactionList.vue`: Displays both cash-in and cash-out transactions
- `composables/`: Vue 3 composables
  - `useDatabase.js`: Manages IndexedDB operations
- `layouts/`: Application layouts
  - `default.vue`: Default layout component
- `pages/`: Main application pages (auto-routed by Nuxt)
  - `index.vue`: Home page with dashboard and quick actions
  - `cash-in.vue`: Page for recording and viewing cash-in transactions
  - `cash-out.vue`: Page for recording and viewing cash-out transactions
  - `reports.vue`: Page for generating and viewing financial reports (to be implemented)
- `stores/`: Pinia stores for state management
  - `cashInStore.js`: Manages state for cash-in transactions
  - `cashOutStore.js`: Manages state for cash-out transactions
- `utils/`: Utility functions and helpers
  - `dateHelpers.js`: Functions for date manipulation
  - `financialCalculations.js`: Functions for financial calculations (to be implemented)
- `server/`: Server-side code and API routes
  - `api/`: API endpoints
    - `cashIn.js`: Handles cash-in operations
    - `cashOut.js`: Handles cash-out operations
  - `middleware/`: Server middleware
    - `auth.js`: Authentication middleware (to be implemented)
- `public/`: Static assets served directly by the server
- `app.vue`: Main application component
- `nuxt.config.ts`: Nuxt configuration file
- `package.json`: Project dependencies and scripts
- `tsconfig.json`: TypeScript configuration
- `README.md`: Project documentation

## Implementation Progress

1. Components: 
   - CashInForm, CashOutForm, and TransactionList have been implemented.
   - Dashboard and ReportGenerator are yet to be implemented.

2. Pages: 
   - index, cash-in, and cash-out pages have been implemented.
   - reports page is yet to be implemented.

3. Stores: 
   - cashInStore and cashOutStore have been fully implemented.

4. Composables:
   - useDatabase has been implemented for IndexedDB operations.

5. Utils:
   - dateHelpers has been implemented.
   - financialCalculations is yet to be implemented.

6. Server:
   - API routes for cash-in and cash-out operations have been set up.
   - Authentication middleware is yet to be implemented.

Next steps involve implementing the remaining components (Dashboard, ReportGenerator), the reports page, and adding more advanced features like financial calculations and data visualization.