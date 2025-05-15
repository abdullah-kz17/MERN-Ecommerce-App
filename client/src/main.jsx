import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { Provider } from 'react-redux';
import AuthProvider from './context/AuthContext.jsx';
import { store } from './store/store.js';
import { ToastContainer } from 'react-toastify'; // Import ToastContainer from React Toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the Toastify styles
import 'react-tooltip/dist/react-tooltip.css';
import { ThemeProvider } from './context/ThemeContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <Provider store={store}>
        <ThemeProvider>
        <App />
        </ThemeProvider>
        <ToastContainer 
          position="top-right"  // Position of the toast
          autoClose={1000}      // Duration the toast will stay on the screen
          hideProgressBar={false}  // Option to show/hide the progress bar
          newestOnTop={true}    // Stack newest toasts on top
          closeOnClick={true}   // Close the toast when clicked
          rtl={false}           // Set true if you want to support right-to-left languages
          pauseOnFocusLoss={false}  // Disable pausing when focus is lost
          draggable={true}      // Enable dragging of the toast
          theme="light"         // You can choose light/dark theme
        />
      </Provider>
    </AuthProvider>
  </StrictMode>,
);
