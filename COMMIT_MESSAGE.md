refactor: improve authentication flow and add application architecture diagrams

This commit includes several important improvements to the codebase:

1. Added detailed application architecture diagrams:
   - Data flow diagram showing the complete application data flow
   - Redux state management diagram explaining state organization

2. Refactored authentication system:
   - Created a centralized useAuth hook for authentication operations
   - Improved token management with expiration checks
   - Enhanced error handling in API calls
   - Simplified Login and Register components

3. Enhanced security:
   - Added token expiration validation
   - Improved session management with better error handling
   - Added proper redirection for expired sessions

4. Code quality improvements:
   - Better TypeScript typing throughout the codebase
   - Improved error handling with specific error messages
   - Enhanced documentation with JSDoc comments
   - Centralized authentication logic for better maintainability

5. Updated README with architecture documentation

These changes improve the application's security, maintainability, and developer experience while fixing the token storage issues.