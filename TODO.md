# TODO List for Coconut Shake Financial Tracker

## Utils

### db.js
1. [ ] Set up IndexedDB connection
2. [ ] Create database schema (object stores for cash in, cash out, categories)
3. [ ] Implement CRUD operations for each object store
4. [ ] Add error handling and connection status checks
5. [ ] Create utility functions for common database queries

### dateHelpers.js
1. [ ] Implement function to format dates (YYYY-MM-DD)
2. [ ] Create function to calculate date ranges (e.g., for weekly/monthly reports)
3. [ ] Add utility to determine fiscal periods (if applicable)
4. [ ] Implement function to validate date inputs

## Stores

### categoryStore.js
1. [ ] Define initial state for categories
2. [ ] Implement action to fetch categories from the database
3. [ ] Add action to create new categories
4. [ ] Create action to update existing categories
5. [ ] Implement action to delete categories (with safeguards)
6. [ ] Add getters for filtered or sorted categories

### cashInStore.js
1. [ ] Define initial state for cash in transactions
2. [ ] Implement action to fetch cash in entries from the database
3. [ ] Add action to create new cash in entries
4. [ ] Create action to update existing cash in entries
5. [ ] Implement action to delete cash in entries
6. [ ] Add getters for filtered transactions (by date range, amount, etc.)
7. [ ] Implement getter for total cash in over a specified period

### cashOutStore.js
1. [ ] Define initial state for cash out transactions
2. [ ] Implement action to fetch cash out entries from the database
3. [ ] Add action to create new cash out entries
4. [ ] Create action to update existing cash out entries
5. [ ] Implement action to delete cash out entries
6. [ ] Add getters for filtered transactions (by date range, amount, category, etc.)
7. [ ] Implement getter for total cash out over a specified period
8. [ ] Create getter for cash out grouped by category

## Server

### api/cashIn.js
1. [ ] Set up Express router for cash in endpoints
2. [ ] Implement GET endpoint to retrieve all cash in entries
3. [ ] Add POST endpoint to create a new cash in entry
4. [ ] Create PUT endpoint to update an existing cash in entry
5. [ ] Implement DELETE endpoint to remove a cash in entry
6. [ ] Add validation middleware for request bodies
7. [ ] Implement error handling for all endpoints

### api/cashOut.js
1. [ ] Set up Express router for cash out endpoints
2. [ ] Implement GET endpoint to retrieve all cash out entries
3. [ ] Add POST endpoint to create a new cash out entry
4. [ ] Create PUT endpoint to update an existing cash out entry
5. [ ] Implement DELETE endpoint to remove a cash out entry
6. [ ] Add validation middleware for request bodies
7. [ ] Implement error handling for all endpoints

### middleware/auth.js
1. [ ] Implement user authentication logic (e.g., JWT validation)
2. [ ] Create middleware to protect routes that require authentication
3. [ ] Add error handling for authentication failures
4. [ ] Implement role-based access control (if applicable)
5. [ ] Create utility functions for token generation and validation

## General Tasks
1. [ ] Ensure consistent error handling across all modules
2. [ ] Implement logging system for debugging and monitoring
3. [ ] Write unit tests for utilities, stores, and API endpoints
4. [ ] Set up continuous integration for automated testing
5. [ ] Document API endpoints and store actions
6. [ ] Perform security audit of implemented features
7. [ ] Optimize database queries and store actions for performance

Remember to update this TODO list as you progress through development and new tasks or considerations arise.
