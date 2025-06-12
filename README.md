# Pita Banking Frontend

React frontend for the Pita Banking Application.

## Technologies Used

- React 18
- TypeScript
- Redux Toolkit for state management
- React Router for navigation
- Styled Components for styling
- Webpack for bundling
- Babel for transpilation

## Features

- User authentication (login/register)
- Account management (view accounts and balances)
- Transaction processing (transfer funds between accounts)
- Transaction history

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

This frontend is designed to work with the Pita Banking Spring Boot backend. Make sure the backend is running on `http://localhost:8080` or update the proxy configuration in `webpack.config.js` to point to your backend server.

## Project Structure

- `/src/api` - API service functions
- `/src/components` - Reusable UI components
- `/src/pages` - Application pages
- `/src/store` - Redux store and slices
- `/src/types` - TypeScript type definitions
- `/src/styles` - Global styles

## License

This project is licensed under the MIT License.