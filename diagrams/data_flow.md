# Pita Bank Frontend Data Flow

```mermaid
graph TD
    %% User Interactions
    User([User]) -->|Interacts with| UI[UI Components]
    
    %% UI Components
    UI -->|Submits Form| SecureForm[Secure Form Components]
    SecureForm -->|Encrypts Password| API_Call[API Call]
    
    %% API Flow
    API_Call -->|HTTP Request| Axios[Axios Instance]
    Axios -->|Adds Auth Token| Interceptor[Request Interceptor]
    Interceptor -->|Makes Request| Backend[Backend API]
    
    %% Response Flow
    Backend -->|Returns Response| ResponseInterceptor[Response Interceptor]
    ResponseInterceptor -->|Handles Auth Errors| ResponseHandler[Response Handler]
    ResponseHandler -->|Success| TokenStorage[Token Storage]
    ResponseHandler -->|Error| ErrorHandler[Error Handler]
    
    %% Token Management
    TokenStorage -->|Stores Token| SessionStorage[(Session Storage)]
    SessionStorage -->|Provides Token| Interceptor
    
    %% State Management
    ResponseHandler -->|Updates State| ReduxAction[Redux Action]
    ReduxAction -->|Dispatched to| ReduxStore[Redux Store]
    ReduxStore -->|Updates| ReduxState[Application State]
    ReduxState -->|Renders| UI
    
    %% Error Handling
    ErrorHandler -->|Shows| Toast[Toast Notification]
    ErrorHandler -->|Updates State| ReduxAction
    
    %% Navigation
    ResponseHandler -->|Triggers| Navigation[Navigation]
    Navigation -->|Routes to| NewPage[New Page]
    
    %% Styling
    UI -->|Styled with| StyledComponents[Styled Components]
    
    %% Class Definitions
    classDef component fill:#f9f,stroke:#333,stroke-width:2px;
    classDef store fill:#bbf,stroke:#333,stroke-width:2px;
    classDef api fill:#bfb,stroke:#333,stroke-width:2px;
    classDef storage fill:#fbb,stroke:#333,stroke-width:2px;
    
    %% Class Assignments
    class UI,SecureForm,Toast,NewPage component;
    class ReduxStore,ReduxState,ReduxAction store;
    class API_Call,Axios,Interceptor,ResponseInterceptor,Backend api;
    class TokenStorage,SessionStorage storage;
```

## Data Flow Explanation

### User Interaction Layer
1. **User** interacts with the **UI Components** (forms, buttons, etc.)
2. **UI Components** capture user inputs and events

### Form Processing Layer
3. **Secure Form Components** handle form submissions
4. Passwords are encrypted before being sent to the backend
5. Form validation ensures data integrity

### API Communication Layer
6. **API Calls** are made through service modules
7. **Axios Instance** provides a configured HTTP client
8. **Request Interceptor** automatically adds authentication tokens
9. Requests are sent to the **Backend API**

### Response Handling Layer
10. **Response Interceptor** processes API responses
11. Authentication errors (401) trigger token removal and redirect
12. Successful responses update the application state
13. Error responses trigger error handling

### Token Management Layer
14. Authentication tokens are stored in **Session Storage**
15. Tokens are automatically included in subsequent API requests
16. Tokens are removed on logout or authentication errors

### State Management Layer
17. **Redux Actions** are dispatched based on API responses
18. **Redux Store** updates the application state
19. UI components re-render based on state changes

### Notification Layer
20. **Toast Notifications** provide feedback to users
21. Success and error messages are displayed as non-intrusive toasts

### Navigation Layer
22. Successful operations trigger navigation to new pages
23. Protected routes ensure authenticated access

## Object Types and Data Structures

### User Data
- **User**: `{ id: string, firstName: string, lastName: string, email: string, username?: string }`
- **Credentials**: `{ email: string, password: string }`
- **Registration Data**: `{ firstName: string, lastName: string, email: string, password: string }`

### Authentication
- **Auth State**: `{ user: User | null, token: string | null, isAuthenticated: boolean, loading: boolean, error: string | null }`
- **Auth Response**: `{ user: User, token: string }`

### Banking Data
- **Account**: `{ id: string, userId: string, accountNumber: string, accountType: string, balance: number, createdAt: string, updatedAt: string }`
- **Transaction**: `{ id: string, userId: string, fromAccountId: string, toAccountId: string, amount: number, type: string, description: string, status: string, createdAt: string, updatedAt: string }`

### UI Components
- **Form Data**: Various state objects for controlled form components
- **UI State**: Loading states, error states, and validation states