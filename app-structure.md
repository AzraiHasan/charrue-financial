# Coconut Shake Financial Tracker App Structure

```
├── components/
│   ├── CashInForm.vue
│   ├── CashOutForm.vue
│   ├── Dashboard.vue
│   ├── DashboardChart.vue
│   ├── ReportGenerator.vue
│   └── TransactionList.vue
├── composables/
│   └── useDatabase.js
├── layouts/
│   └── default.vue
├── pages/
│   ├── cash-in.vue
│   ├── cash-out.vue
│   ├── index.vue
│   └── reports.vue
├── plugins/
│   ├── chartjs.js
│   └── db-init.js
├── server/
│   └── api/
│       ├── cashIn.js
│       └── cashOut.js
├── stores/
│   ├── cashInStore.js
│   ├── cashOutStore.js
│   └── categoryStore.js
├── utils/
│   └── dateHelpers.js
├── app.vue
├── nuxt.config.ts
└── package.json
```

## Key Components and Their Purposes

1. **Components/**
   - `CashInForm.vue`: Form for recording cash-in transactions
   - `CashOutForm.vue`: Form for recording cash-out transactions
   - `Dashboard.vue`: Main dashboard component
   - `DashboardChart.vue`: Chart component for the dashboard
   - `ReportGenerator.vue`: Component for generating financial reports
   - `TransactionList.vue`: Component for displaying a list of transactions

2. **Composables/**
   - `useDatabase.js`: Composable for database operations using IndexedDB

3. **Layouts/**
   - `default.vue`: Default layout for the application

4. **Pages/**
   - `cash-in.vue`: Page for cash-in transactions
   - `cash-out.vue`: Page for cash-out transactions
   - `index.vue`: Home page (dashboard)
   - `reports.vue`: Page for generating and viewing reports

5. **Plugins/**
   - `chartjs.js`: Plugin for Chart.js integration
   - `db-init.js`: Plugin for initializing the database

6. **Server/API/**
   - `cashIn.js`: API endpoints for cash-in operations
   - `cashOut.js`: API endpoints for cash-out operations

7. **Stores/**
   - `cashInStore.js`: Pinia store for managing cash-in state
   - `cashOutStore.js`: Pinia store for managing cash-out state
   - `categoryStore.js`: Pinia store for managing categories

8. **Utils/**
   - `dateHelpers.js`: Utility functions for date operations

9. **Root Files**
   - `app.vue`: Main app component
   - `nuxt.config.ts`: Nuxt configuration file
   - `package.json`: Project dependencies and scripts

## Data Flow

1. User interactions trigger actions in components (e.g., CashInForm, CashOutForm)
2. Actions dispatch mutations to Pinia stores (cashInStore, cashOutStore)
3. Stores update the local IndexedDB using the useDatabase composable
4. Components fetch and display data from stores and the local database
5. The Dashboard and Reports pages aggregate and visualize data using Chart.js

## Key Features

- Local data storage using IndexedDB
- Real-time updates of financial data
- Visualizations using Chart.js
- Separate pages for cash-in and cash-out operations
- Centralized dashboard for overview
- Reporting functionality
