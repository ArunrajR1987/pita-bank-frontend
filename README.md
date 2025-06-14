# Pita Banking Frontend

A comprehensive React-based banking application frontend with modern web development concepts.

## Table of Contents
- [Libraries and Dependencies](#libraries-and-dependencies)
- [Application Architecture](#application-architecture)
- [Data Flow](#data-flow)
- [State Management](#state-management)
- [JavaScript Concepts](#javascript-concepts)
- [TypeScript Concepts](#typescript-concepts)
- [React Concepts](#react-concepts)
- [CSS and Styling Concepts](#css-and-styling-concepts)
- [State Management Concepts](#state-management-concepts)
- [Routing Concepts](#routing-concepts)
- [API and Asynchronous Concepts](#api-and-asynchronous-concepts)
- [Build and Development Concepts](#build-and-development-concepts)
- [Secure Password Handling](#secure-password-handling)
- [Token Management](#token-management)
- [Getting Started](#getting-started)

## Application Architecture

The Pita Banking Frontend application follows a modern React architecture with Redux for state management, React Router for navigation, and Axios for API communication.

![Application Architecture](diagrams/data_flow.md)

For a detailed view of the data flow, see the [Data Flow Diagram](diagrams/data_flow.md).

For a detailed view of the state management, see the [Redux State Management Diagram](diagrams/redux_state_management.md).

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

### Notifications

| Library | Version | Purpose |
|---------|---------|---------|
| react-toastify | ^9.1.3 | Toast notification library for React applications, providing customizable, accessible notifications |

### Build Tools and Other Dependencies
(See package.json for complete list)

## JavaScript Concepts

### 1. ES6+ Features

#### Arrow Functions
```javascript
// Traditional function
function add(a, b) {
  return a + b;
}

// Arrow function
const add = (a, b) => a + b;
```
**Why used**: Arrow functions provide shorter syntax and lexical `this` binding, which is especially useful in callbacks and event handlers to avoid `this` binding issues.

#### Template Literals
```javascript
const name = 'User';
const greeting = `Hello, ${name}!`;
```
**Why used**: Template literals allow for easier string interpolation and multi-line strings without concatenation, making code more readable.

#### Destructuring Assignment
```javascript
// Object destructuring
const { user, loading } = useSelector((state) => state.auth);

// Array destructuring
const [formData, setFormData] = useState({});
```
**Why used**: Destructuring provides a concise way to extract values from objects and arrays, reducing code verbosity and improving readability.

#### Spread/Rest Operators
```javascript
// Spread operator for objects
const updatedUser = { ...user, name: 'New Name' };

// Spread operator for arrays
const allAccounts = [...savingsAccounts, ...checkingAccounts];

// Rest parameter
const sum = (...numbers) => numbers.reduce((total, num) => total + num, 0);
```
**Why used**: Spread operator allows for immutable updates to objects and arrays, which is crucial for React and Redux. Rest parameters enable flexible function arguments.

#### Optional Chaining
```javascript
const username = user?.profile?.username;
```
**Why used**: Optional chaining prevents errors when accessing nested properties that might be undefined, eliminating the need for verbose null checks.

#### Nullish Coalescing
```javascript
const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3001/api';
```
**Why used**: Provides a default value only when the left-hand expression is null or undefined (not for all falsy values like `||`).

### 2. Promises and Asynchronous JavaScript

#### Promises
```javascript
fetch('/api/data')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error(error));
```
**Why used**: Promises provide a cleaner way to handle asynchronous operations compared to callbacks, avoiding "callback hell" and making code more maintainable.

#### Async/Await
```javascript
async function fetchData() {
  try {
    const response = await fetch('/api/data');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(error);
  }
}
```
**Why used**: Async/await syntax makes asynchronous code look and behave more like synchronous code, improving readability and error handling.

### 3. Modules and Imports/Exports

```javascript
// Named exports
export const formatDate = (date) => { /* ... */ };

// Default export
export default axiosInstance;

// Imports
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import axiosInstance from './axios';
```
**Why used**: ES modules provide a standardized way to organize code into reusable, encapsulated pieces, improving maintainability and allowing for tree-shaking in builds.

### 4. Array Methods

```javascript
// map
const accountElements = accounts.map(account => <AccountCard key={account.id} account={account} />);

// filter
const activeAccounts = accounts.filter(account => account.status === 'active');

// reduce
const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

// find
const primaryAccount = accounts.find(account => account.isPrimary);
```
**Why used**: Functional array methods provide declarative ways to transform data without mutating the original arrays, which aligns with React's immutability principles.

### 5. Closures

```javascript
function createCounter() {
  let count = 0;
  return function() {
    return ++count;
  };
}

const counter = createCounter();
```
**Why used**: Closures are used extensively in React hooks and event handlers to maintain state and access variables from outer scopes.

## TypeScript Concepts

### 1. Static Typing

```typescript
let name: string = 'John';
let age: number = 30;
let isActive: boolean = true;
```
**Why used**: Static typing catches type-related errors at compile time rather than runtime, improving code reliability.

### 2. Interfaces

```typescript
interface User {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  username?: string; // Optional property
}
```
**Why used**: Interfaces define the shape of objects, providing better documentation, autocomplete, and type checking.

### 3. Type Aliases

```typescript
type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline';
type ButtonSize = 'small' | 'medium' | 'large';
```
**Why used**: Type aliases create custom types, often used for union types or complex types that are reused across the application.

### 4. Generics

```typescript
function getFirstItem<T>(items: T[]): T | undefined {
  return items[0];
}

// Redux typed hooks
const dispatch = useDispatch<AppDispatch>();
```
**Why used**: Generics provide type safety while maintaining flexibility, allowing functions and components to work with different types.

### 5. Type Assertions

```typescript
const token = localStorage.getItem('token') as string;
```
**Why used**: Type assertions tell the TypeScript compiler to treat a value as a specific type when you have more information than the compiler.

### 6. Utility Types

```typescript
// Partial makes all properties optional
type PartialUser = Partial<User>;

// Pick selects specific properties
type UserCredentials = Pick<User, 'email' | 'password'>;

// Omit excludes specific properties
type PublicUserInfo = Omit<User, 'password'>;
```
**Why used**: Utility types provide shortcuts for common type transformations, reducing code duplication.

## React Concepts

### 1. Functional Components

```jsx
const Button = ({ children, onClick }) => {
  return <button onClick={onClick}>{children}</button>;
};
```
**Why used**: Functional components are simpler, more concise, and with hooks, can now handle all use cases that previously required class components.

### 2. JSX

```jsx
const element = <h1 className="greeting">Hello, world!</h1>;
```
**Why used**: JSX provides a familiar syntax for defining UI elements, combining HTML-like structure with JavaScript expressions.

### 3. Props

```jsx
interface ButtonProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
  onClick?: () => void;
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ variant, size, onClick, children }) => {
  // Component implementation
};
```
**Why used**: Props allow components to receive data and callbacks from parent components, enabling component reusability and composition.

### 4. React Hooks

#### useState
```jsx
const [formData, setFormData] = useState({
  email: '',
  password: ''
});

const handleChange = (e) => {
  setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });
};
```
**Why used**: useState manages local component state, replacing this.state and this.setState from class components.

#### useEffect
```jsx
useEffect(() => {
  dispatch(fetchAccounts());
}, [dispatch]);
```
**Why used**: useEffect handles side effects like data fetching, subscriptions, or DOM manipulations, replacing lifecycle methods from class components.

#### useSelector and useDispatch
```jsx
const { accounts, loading } = useSelector((state: RootState) => state.accounts);
const dispatch = useDispatch<AppDispatch>();
```
**Why used**: These Redux hooks provide access to the Redux store and dispatch function without using connect HOC.

#### useNavigate
```jsx
const navigate = useNavigate();
const handleLogin = () => {
  // After successful login
  navigate('/dashboard');
};
```
**Why used**: useNavigate enables programmatic navigation in React Router v6.

### 5. Conditional Rendering

```jsx
{isAuthenticated ? (
  <DashboardView />
) : (
  <LoginPrompt />
)}

{loading && <LoadingSpinner />}

{error && <ErrorMessage message={error} />}
```
**Why used**: Conditional rendering allows components to display different content based on state or props.

### 6. Lists and Keys

```jsx
{accounts.map(account => (
  <AccountCard key={account.id} account={account} />
))}
```
**Why used**: Keys help React identify which items have changed, been added, or been removed, optimizing rendering performance.

### 7. Controlled Components

```jsx
const [email, setEmail] = useState('');

const handleEmailChange = (e) => {
  setEmail(e.target.value);
};

return <input type="email" value={email} onChange={handleEmailChange} />;
```
**Why used**: Controlled components store form data in React state, giving React control over the form's behavior.

### 8. Component Composition

```jsx
const Card = ({ title, children }) => (
  <div className="card">
    <div className="card-header">{title}</div>
    <div className="card-body">{children}</div>
  </div>
);

// Usage
<Card title="Account Summary">
  <AccountBalance />
  <RecentTransactions />
</Card>
```
**Why used**: Component composition creates reusable UI patterns and avoids prop drilling by using children props.

### 9. Error Boundaries

```jsx
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorDisplay />;
    }
    return this.props.children;
  }
}
```
**Why used**: Error boundaries catch JavaScript errors in child components, preventing the entire app from crashing.

### 10. Toast Notifications

```jsx
import { toast } from 'react-toastify';

// Success notification
toast.success('Transaction completed successfully!');

// Error notification
toast.error('Failed to process transaction');

// Info notification
toast.info('Your account balance has been updated');

// Warning notification
toast.warning('Low balance in your account');
```

**Why used**: Toast notifications provide non-intrusive feedback to users about the result of their actions or system events, improving user experience without disrupting workflow.

## CSS and Styling Concepts

### 1. Styled Components

```jsx
const Button = styled.button`
  background-color: ${props => props.primary ? '#007bff' : 'white'};
  color: ${props => props.primary ? 'white' : '#007bff'};
  padding: 8px 16px;
  border-radius: 4px;
  border: 1px solid #007bff;
`;
```
**Why used**: Styled Components allow for CSS-in-JS with dynamic styling based on props, scoped styles, and theming.

### 2. CSS-in-JS with Template Literals

```jsx
const CardContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  margin-bottom: 1.5rem;
`;
```
**Why used**: Template literals in styled-components allow for multi-line CSS with JavaScript interpolation.

### 3. Conditional Styling

```jsx
const StyledInput = styled.input`
  border: 1px solid ${props => props.hasError ? '#dc3545' : '#ced4da'};
  
  &:focus {
    box-shadow: 0 0 0 0.2rem ${props => props.hasError ? 
      'rgba(220, 53, 69, 0.25)' : 
      'rgba(0, 123, 255, 0.25)'};
  }
`;
```
**Why used**: Conditional styling allows components to change appearance based on props, state, or theme.

### 4. CSS Variables

```css
:root {
  --primary-color: #007bff;
  --secondary-color: #6c757d;
  --danger-color: #dc3545;
}

.button {
  background-color: var(--primary-color);
}
```
**Why used**: CSS variables provide a way to reuse values throughout a stylesheet and can be changed dynamically with JavaScript.

### 5. Flexbox

```css
.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
```
**Why used**: Flexbox simplifies complex layouts and alignment, especially for responsive designs.

### 6. CSS Grid

```css
.dashboard {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 1rem;
}
```
**Why used**: CSS Grid provides a two-dimensional layout system, ideal for complex page layouts.

### 7. Media Queries

```css
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
```
**Why used**: Media queries enable responsive design by applying different styles based on device characteristics.

### 8. CSS Animations and Transitions

```css
.button {
  transition: background-color 0.2s ease-in-out;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.spinner {
  animation: spin 1s linear infinite;
}
```
**Why used**: Animations and transitions provide visual feedback and improve user experience.

## State Management Concepts

### 1. Redux Store

```javascript
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE']
      }
    }).concat(errorMiddleware)
});
```
**Why used**: The Redux store serves as a single source of truth for application state, making state management predictable and testable.

### 2. Redux Slices

```javascript
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    // Handle async actions
  }
});
```
**Why used**: Redux Toolkit's createSlice simplifies Redux boilerplate by automatically generating action creators and action types.

### 3. Redux Thunks

```javascript
export const login = createAsyncThunk(
  'auth/login',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await authApi.post('/login', credentials);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.message || 'Login failed');
    }
  }
);
```
**Why used**: Thunks handle asynchronous logic in Redux, such as API calls, before dispatching synchronous actions.

### 4. Immutable State Updates

```javascript
// In a reducer
state.user = action.payload.user; // This is actually immutable with Redux Toolkit's Immer

// Manual immutable update (without Immer)
return {
  ...state,
  user: action.payload.user
};
```
**Why used**: Immutable updates ensure that state is never directly modified, which helps with predictability, debugging, and performance optimization.

### 5. Redux Persist

```javascript
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['auth'] // only auth will be persisted
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
```
**Why used**: Redux Persist saves specified parts of the Redux store to localStorage or other storage engines, preserving state across page refreshes.

### 6. Redux Middleware

```javascript
export const errorMiddleware: Middleware = () => next => action => {
  if (action.type.endsWith('/rejected')) {
    const errorMessage = action.payload || action.error?.message || 'An error occurred';
    toastError(errorMessage);
  }
  return next(action);
};
```
**Why used**: Middleware intercepts actions before they reach reducers, allowing for side effects, logging, error handling, and other cross-cutting concerns.

## Routing Concepts

### 1. Route Configuration

```jsx
<Routes>
  <Route path="/login" element={<Login />} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route path="*" element={<Navigate to="/dashboard" />} />
</Routes>
```
**Why used**: Routes define the mapping between URL paths and React components to render.

### 2. Route Parameters

```jsx
<Route path="/accounts/:accountId" element={<AccountDetail />} />

// In the component
const { accountId } = useParams();
```
**Why used**: Route parameters allow for dynamic routing based on URL segments.

### 3. Protected Routes

```jsx
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useSelector((state) => state.auth);
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

// Usage
<Route 
  path="/dashboard" 
  element={
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  } 
/>
```
**Why used**: Protected routes restrict access to certain parts of the application based on authentication status.

### 4. Programmatic Navigation

```jsx
const navigate = useNavigate();

const handleLogout = () => {
  dispatch(logout());
  navigate('/login');
};
```
**Why used**: Programmatic navigation allows for navigation based on user actions or application state.

### 5. Link Component

```jsx
<Link to="/dashboard">Dashboard</Link>
```
**Why used**: The Link component provides declarative navigation without full page reloads.

## API and Asynchronous Concepts

### 1. Axios Instance

```javascript
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json'
  }
});
```
**Why used**: Axios instances allow for reusable configurations across API calls.

### 2. Interceptors

```javascript
// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      removeToken();
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);
```
**Why used**: Interceptors modify requests or responses globally before they are handled by then or catch, useful for authentication, logging, or error handling.

### 3. API Service Modules

```javascript
export const authApi = {
  login: (credentials) => {
    return axiosInstance.post('/auth/login', credentials);
  },
  
  register: (userData) => {
    return axiosInstance.post('/auth/register', userData);
  }
};
```
**Why used**: API service modules organize API calls by feature, improving code organization and reusability.

### 4. Error Handling

```javascript
try {
  const response = await authApi.post('/login', credentials);
  return response.data;
} catch (error) {
  return rejectWithValue(error.response?.data?.message || 'Login failed');
}
```
**Why used**: Proper error handling improves user experience by providing meaningful error messages and preventing application crashes.

### 5. Loading States

```javascript
const { loading } = useSelector((state) => state.auth);

if (loading) {
  return <LoadingSpinner />;
}
```
**Why used**: Loading states provide feedback to users during asynchronous operations.

### 6. Toast Notifications for API Errors

```javascript
// In Redux middleware
if (action.type.endsWith('/rejected')) {
  const errorMessage = action.payload || action.error?.message || 'An error occurred';
  toastError(errorMessage);
}
```
**Why used**: Toast notifications provide a consistent, non-intrusive way to display API errors to users, improving user experience by clearly communicating what went wrong.

## Build and Development Concepts

### 1. Webpack Configuration

```javascript
module.exports = {
  entry: './src/index.tsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[contenthash].js'
  },
  // More configuration...
};
```
**Why used**: Webpack bundles JavaScript modules and other assets for browser consumption, with features like code splitting and hot module replacement.

### 2. Babel Configuration

```javascript
{
  presets: [
    '@babel/preset-env',
    '@babel/preset-react',
    '@babel/preset-typescript'
  ]
}
```
**Why used**: Babel transpiles modern JavaScript and TypeScript to browser-compatible code.

### 3. Environment Variables

```javascript
const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
```
**Why used**: Environment variables allow for different configurations in development, testing, and production environments.

### 4. Development Server

```javascript
devServer: {
  historyApiFallback: true,
  port: 3000,
  hot: true,
  proxy: {
    '/api': {
      target: 'http://localhost:8080',
      changeOrigin: true
    }
  }
}
```
**Why used**: Development servers provide features like hot reloading, proxying API requests, and handling client-side routing.

## Secure Password Handling

### Client-Side Implementation

The application implements secure password handling to prevent exposure of passwords during transmission:

1. **SecureForm Components**:
   - `SecureLoginForm`: Encrypts passwords before submission
   - `SecureRegisterForm`: Encrypts passwords and validates form data

2. **Password Encryption**:
   - Uses Base64 encoding for demonstration purposes
   - In production, would use a proper encryption library

3. **Form Validation**:
   - Password strength requirements
   - Password confirmation matching
   - Input validation before submission

4. **API Integration**:
   - Passwords are encrypted before being sent to the server
   - The server expects encrypted passwords

## Token Management

### Centralized Token Storage

The application implements a centralized token management system:

1. **Token Storage Utility** (`src/utils/tokenStorage.ts`):
   - `storeToken(token)`: Safely stores authentication tokens in session storage
   - `getToken()`: Retrieves the token with error handling
   - `removeToken()`: Removes the token with error handling
   - `hasToken()`: Checks if a token exists

2. **Session Storage**:
   - Uses `sessionStorage` instead of `localStorage` for better security
   - Tokens are cleared when the browser is closed
   - Provides session-based authentication

3. **API Integration**:
   - Axios interceptors automatically include the token in all API requests
   - Response interceptors handle authentication errors (401)
   - Unauthorized responses trigger token removal and redirect to login

4. **Redux Integration**:
   - Authentication state is synchronized with token storage
   - Login and registration store tokens upon success
   - Logout and authentication errors clear tokens

This implementation ensures:
- Consistent token handling across the application
- Proper error handling for token operations
- Automatic token inclusion in API requests
- Secure token storage that's cleared when the browser is closed

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