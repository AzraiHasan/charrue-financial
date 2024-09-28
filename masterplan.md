# Modified Masterplan: Coconut Shake Stall Financial Tracker with Pinia

## Modifications to Technical Stack

1. Frontend:
   - Nuxt.js as the primary framework
   - Pinia for state management
   - HTML5 for structure
   - JavaScript for interactivity
   - Chart.js for data visualization
   - Nuxt UI for styling

2. Backend:
   - IndexedDB for persistent local data storage

3. Application Type:
   - Single-page application (SPA) built with Vue.js
   - Progressive Web App (PWA) capabilities in future iterations

## State Management with Pinia

1. Pinia Stores:
   - CashInStore
   - CashOutStore
   - CategoryStore
   - ThresholdStore
   - DashboardStore (for computed values and aggregations)

2. Store Structure (example for CashInStore):
   ```javascript
   export const useCashInStore = defineStore('cashIn', {
     state: () => ({
       entries: [],
       isDirty: false
     }),
     actions: {
       addEntry(entry) {
         this.entries.push(entry);
         this.isDirty = true;
       },
       updateEntry(id, updatedEntry) {
         const index = this.entries.findIndex(e => e.id === id);
         if (index !== -1) {
           this.entries[index] = updatedEntry;
           this.isDirty = true;
         }
       },
       async syncWithIndexedDB() {
         if (this.isDirty) {
           // Logic to update IndexedDB
           // ...
           this.isDirty = false;
         }
       }
     },
     getters: {
       totalCashIn: (state) => state.entries.reduce((sum, entry) => sum + entry.amount, 0)
     }
   });
   ```

3. Manual Trigger for IndexedDB Updates:
   - Implement a "Save" or "Sync" button in the UI
   - On click, call the `syncWithIndexedDB` action for all stores

## Core Features and Functionality

1. Cash-In Tracking:
   - Use CashInStore for real-time state management
   - Manual entry updates Pinia store immediately
   - IndexedDB update triggered manually

2. Cash-Out Tracking:
   - Use CashOutStore and CategoryStore for real-time state management
   - Manual entry and categorization update Pinia stores immediately
   - IndexedDB update triggered manually

3. Dashboard:
   - Use DashboardStore for computed values and aggregations
   - Real-time updates based on CashInStore and CashOutStore changes

4. Reporting and Analysis:
   - Generate reports based on Pinia store data
   - Ensure data consistency by syncing with IndexedDB before generating reports

5. Data Export:
   - Export data from Pinia stores
   - Ensure sync with IndexedDB before exporting

## Development Phases and Milestones

Phase 1: Core Functionality and Pinia Integration
1. Set up project structure with Nuxt.js and Pinia
2. Implement Pinia stores for Cash-In, Cash-Out, and Categories
3. Create UI components for data entry and basic dashboard
4. Implement manual trigger for IndexedDB synchronization

Phase 2: Enhanced Features and Store Interactions
1. Implement custom categories in CategoryStore
2. Add note functionality to CashOutStore
3. Enhance dashboard with DashboardStore for computed values
4. Develop weekly trend analysis using Pinia getters

Phase 3: Reporting, Data Management, and IndexedDB Integration
1. List available weekly report (Monday to Sunday) from IndexedDB (latest update is set to yesterday)
2. Download selected weekly report (csv format) directly onto user's device. Don't save in the app

Phase 4: Optimization and Future-Proofing
1. Refactor and optimize Pinia store interactions
2. Implement offline functionality for PWA using Pinia and IndexedDB
3. Enhance UI with chosen CSS framework
4. (Optional) Begin implementation of inventory tracking or sales forecasting with dedicated Pinia stores

## Potential Challenges and Solutions

1. Challenge: Ensuring data consistency between Pinia stores and IndexedDB
   Solution: Implement robust synchronization logic and error handling in the manual trigger process

2. Challenge: Managing complex state interactions between multiple Pinia stores
   Solution: Utilize Pinia's composition API and create a root store if necessary for global state management

3. Challenge: Optimizing performance with large datasets in Pinia stores
   Solution: Implement pagination or lazy loading strategies for large datasets, keeping only necessary data in memory

## Future Expansion Possibilities

1. Real-time multi-device synchronization using Pinia and a backend service
2. Implement undo/redo functionality leveraging Pinia's state management capabilities
3. Develop more sophisticated analytics and forecasting features using Pinia's reactive state

This modified masterplan incorporates Pinia for state management while maintaining IndexedDB for persistent storage. The manual trigger for IndexedDB updates allows for better control over data persistence and can potentially improve performance by reducing write operations to IndexedDB.
