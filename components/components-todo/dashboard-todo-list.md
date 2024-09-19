# TODO List for Dashboard Development

## Dashboard.vue

1. [ ] Implement Chart.js integration for Cash-in vs Cash-out Chart
   - [ ] Install and set up Chart.js
   - [ ] Create a line or bar chart comparing cash-in and cash-out over time
   - [ ] Add a threshold indicator to the chart

2. [ ] Implement Running Total of Cash-in-hand
   - [ ] Calculate the difference between total cash-in and total cash-out
   - [ ] Display the result prominently on the dashboard

3. [ ] Implement Total Cash-out by Category per Week
   - [ ] Group cash-out transactions by category and week
   - [ ] Create a stacked bar chart or pie chart to visualize this data

4. [ ] Create a fetchDashboardData function to populate all dashboard components
   - [ ] Fetch data from local IndexedDB
   - [ ] Update reactive variables with fetched data

5. [ ] Implement error handling and loading states for all data fetching operations

## Cloud Synchronization

6. [ ] Set up a cloud database (e.g., Firebase Realtime Database or Firestore)

7. [ ] Modify cashInStore.js and cashOutStore.js:
   - [ ] Update addCashInEntry and addCashOutEntry to immediately update local IndexedDB
   - [ ] Add functions to sync new entries to the cloud database

8. [ ] Create a new composable (e.g., useCloudSync.js):
   - [ ] Implement a function to push local data to the cloud
   - [ ] Implement a function to fetch data from the cloud and update local IndexedDB

9. [ ] Add cloud synchronization to cash-in and cash-out form submission processes

## Scheduled Cloud Fetch

10. [ ] Implement a daily scheduled fetch from the cloud:
    - [ ] Create a new composable (e.g., useScheduledSync.js)
    - [ ] Implement a function to check if a daily sync is needed
    - [ ] Use browser's localStorage to store the last sync timestamp
    - [ ] Trigger the cloud fetch if a day has passed since the last sync

11. [ ] Integrate the scheduled fetch into the app:
    - [ ] Call the check function on app startup (in a plugin or app.vue)
    - [ ] Trigger the fetch if needed, updating all stores with new data

## Dashboard Components

12. [ ] Create a CashFlowChart.vue component:
    - [ ] Implement Chart.js to visualize cash-in vs cash-out
    - [ ] Add props for data input and customization
    - [ ] Implement the threshold indicator

13. [ ] Create a CashInHand.vue component:
    - [ ] Display the current cash-in-hand amount
    - [ ] Add a simple trend indicator (up/down arrow)

14. [ ] Create a WeeklyExpenses.vue component:
    - [ ] Implement a chart to show expenses by category
    - [ ] Add filters for selecting different weeks

## Data Processing

15. [ ] Create utility functions for data processing (in utils/financialCalculations.js):
    - [ ] Function to calculate running total
    - [ ] Function to group transactions by week and category
    - [ ] Function to calculate cash flow over time

## Testing

16. [ ] Write unit tests for new utility functions and store actions
17. [ ] Write component tests for new Dashboard components
18. [ ] Implement end-to-end tests for the dashboard page and cloud sync functionality

## Optimization

19. [ ] Implement lazy loading for Dashboard components
20. [ ] Optimize database queries for large datasets
21. [ ] Implement caching strategies for frequently accessed data

## Documentation

22. [ ] Update project documentation with new cloud sync features
23. [ ] Create user guide for understanding the dashboard
24. [ ] Document the data flow between local storage and cloud database
