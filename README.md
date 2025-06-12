# Pita Banking Frontend

A modern React-based frontend application for the Pita Banking platform, providing users with secure access to banking services including account management and transactions.

## Libraries and Dependencies

### Core Libraries

| Library | Version | Purpose |
|---------|---------|---------|
| React | ^18.2.0 | UI component library that provides a component-based architecture for building user interfaces |
| React DOM | ^18.2.0 | React package for DOM rendering, enabling React components to interact with the browser DOM |
| TypeScript | ^5.1.6 | Superset of JavaScript that adds static typing, enhancing code quality and developer experience |

### State Management

| Library | Version | Purpose |
|---------|---------|---------|
| @reduxjs/toolkit | ^1.9.5 | Official Redux package that simplifies Redux logic with utilities for store setup, reducers, and immutable updates |
| react-redux | ^8.1.1 | Official React bindings for Redux, providing hooks like useSelector and useDispatch for component integration |
| redux | ^4.2.1 | Predictable state container for JavaScript apps, managing application state in a single store |
| redux-persist | ^6.0.0 | Persists and rehydrates Redux store to maintain state across page refreshes and browser sessions |

### Routing

| Library | Version | Purpose |
|---------|---------|---------|
| react-router-dom | ^6.14.1 | Declarative routing for React applications, enabling navigation between different components without page reloads |

### Styling

| Library | Version | Purpose |
|---------|---------|---------|
| styled-components | ^6.0.3 | CSS-in-JS library for styling React components with template literals, enabling dynamic styling based on props |

### API Communication

| Library | Version | Purpose |
|---------|---------|---------|
| axios | ^1.4.0 | Promise-based HTTP client for making API requests with features like interceptors, request/response transformation |

### Build Tools

| Library | Version | Purpose |
|---------|---------|---------|
| webpack | ^5.88.1 | Module bundler that processes and bundles JavaScript files and other assets for browser consumption |
| webpack-cli | ^5.1.4 | Command line interface for webpack, providing commands to run webpack from the terminal |
| webpack-dev-server | ^4.15.1 | Development server that provides live reloading during development |
| html-webpack-plugin | ^5.5.3 | Simplifies creation of HTML files to serve webpack bundles, especially useful for bundles with hashed filenames |

### Transpilation

| Library | Version | Purpose |
|---------|---------|---------|
| @babel/core | ^7.22.9 | Core Babel compiler that transforms modern JavaScript into backward-compatible versions |
| @babel/preset-env | ^7.22.9 | Smart preset that allows using the latest JavaScript without micromanaging syntax transforms |
| @babel/preset-react | ^7.22.5 | Babel preset for all React plugins, transforming JSX into JavaScript |
| @babel/preset-typescript | ^7.22.5 | Babel preset for TypeScript support, allowing Babel to transpile TypeScript code |
| babel-loader | ^9.1.3 | Webpack loader that allows transpiling JavaScript files using Babel |
| ts-loader | ^9.4.4 | Webpack loader for TypeScript files, compiling TypeScript to JavaScript during bundling |

### Styling Tools

| Library | Version | Purpose |
|---------|---------|---------|
| css-loader | ^6.8.1 | Webpack loader that interprets @import and url() like import/require() and resolves them |
| style-loader | ^3.3.3 | Webpack loader that injects CSS into the DOM at runtime |
| sass | ^1.63.6 | CSS preprocessor that adds features like variables, nesting, and mixins to CSS |
| sass-loader | ^13.3.2 | Webpack loader for compiling Sass/SCSS files to CSS |

### Testing

| Library | Version | Purpose |
|---------|---------|---------|
| jest | ^29.6.1 | JavaScript testing framework with a focus on simplicity, supporting snapshots and mocking |
| ts-jest | ^29.1.1 | TypeScript preprocessor for Jest that allows using Jest to test TypeScript projects |
| @testing-library/react | ^14.0.0 | Testing utilities for React that encourage good testing practices focusing on user behavior |
| @testing-library/jest-dom | ^5.16.5 | Custom Jest matchers for testing DOM elements, making assertions more readable |

## Application Architecture

### Functional Flow

1. **User Authentication**:
   - Users start at the login page or can navigate to registration
   - Authentication state is managed in Redux and persisted with redux-persist
   - JWT tokens are stored in localStorage and attached to API requests via axios interceptors

2. **Dashboard View**:
   - After authentication, users are redirected to the dashboard
   - Dashboard displays user information and account summaries
   - Account data is fetched from the backend API and stored in Redux

3. **Transaction Management**:
   - Users can view transaction history
   - Transfer funds between accounts using the transfer form
   - Transactions are processed through API calls and the UI updates accordingly

4. **Navigation**:
   - React Router handles navigation between different sections
   - Protected routes ensure authenticated access to sensitive areas
   - Navbar provides consistent navigation options based on authentication state

### React Concepts Used

1. **Functional Components**: The application uses modern React functional components with hooks instead of class components.

2. **React Hooks**:
   - `useState`: For local component state management
   - `useEffect`: For side effects like API calls and lifecycle events
   - `useSelector`: To extract data from Redux store
   - `useDispatch`: To dispatch actions to Redux store
   - `useNavigate`: For programmatic navigation

3. **Context API**: Used implicitly through Redux Provider to make the store available throughout the component tree.

4. **Conditional Rendering**: Components render different UI based on authentication state, loading state, and data availability.

5. **Component Composition**: UI is built from smaller, reusable components that are composed together.

6. **Controlled Components**: Form inputs are controlled by React state for better form handling.

### JavaScript/TypeScript Concepts

1. **TypeScript Interfaces**: Used to define shapes of data structures and component props.

2. **Async/Await**: Modern JavaScript pattern for handling asynchronous operations like API calls.

3. **Destructuring**: Used extensively for cleaner code when working with objects and arrays.

4. **Arrow Functions**: Used for concise function syntax and lexical `this` binding.

5. **Template Literals**: Used for string interpolation and multi-line strings.

6. **Optional Chaining**: Used for safely accessing nested object properties.

7. **Spread Operator**: Used for immutable state updates and prop spreading.

### Redux Concepts

1. **Redux Toolkit**: Modern Redux approach with simplified store setup and reducer logic.

2. **Slices**: Feature-based state organization with combined reducers, actions, and selectors.

3. **Thunks**: Async action creators for API calls and complex state updates.

4. **Selectors**: Functions to extract specific pieces of state from the store.

5. **Immutable Updates**: State is never directly mutated, following Redux principles.

## Component Structure

### Layout Components

- **Layout**: Main layout wrapper that includes Navbar and Footer
- **Navbar**: Navigation bar with conditional rendering based on auth state

### UI Components

- **Button**: Reusable button component with variants (primary, secondary, danger, success, outline)
- **Card**: Container component for content with consistent styling
- **Input**: Form input component with validation and error display

### Page Components

- **Login/Register**: Authentication forms with validation and Redux integration
- **Dashboard**: Main user dashboard showing account information
- **TransactionList**: Displays user transaction history
- **TransferForm**: Form for creating new transactions between accounts

### API Layer

- **axios.ts**: Configures axios instance with base URL and interceptors for auth tokens
- **authApi.ts**: Authentication-related API calls
- **bankApi.ts**: Banking operations API calls

### Store Configuration

- **store/index.ts**: Redux store configuration with middleware and persistence
- **slices/authSlice.ts**: Authentication state management
- **slices/accountSlice.ts**: Account data management
- **slices/transactionSlice.ts**: Transaction data management

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```
4. The application will be available at `http://localhost:3000`

## Building for Production

```bash
npm run build
```

This will create a production build in the `dist` directory.

## API Integration

This frontend is designed to work with the Pita Banking backend API. The application uses environment variables for API configuration:

- `REACT_APP_API_URL`: API base URL (defaults to http://localhost:3001/api)

## License

This project is licensed under the MIT License.