import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';

import App from 'src/App';
import { ToastProvider } from 'src/context/Toast';
import 'src/styles/index.css';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </StrictMode>
);
