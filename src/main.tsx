import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './assets/fonts.scss';
import './assets/main.scss';
import { Provider } from 'react-redux'
import { store } from './store/store';
import { StrictMode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </Provider>
  </StrictMode>
)
