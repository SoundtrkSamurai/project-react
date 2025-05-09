import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';

import { seedLocalDatabase } from '@/api/data/seed';
import ThemeProvider from '@/components/ThemeProvider';
import { AuthProvider } from '@/context/AuthProvider';
import { store } from '@/state/store';

import Router from './Router';

import './index.css';

// DO NOT REMOVE: Seeds the local storage database with data
seedLocalDatabase();

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 minutes
      cacheTime: 1000 * 60 * 10, // 10 minutes
    },
  },
});
ReactDOM.createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider>
      <Provider store={store}>
        <AuthProvider>
          <Router />
        </AuthProvider>
      </Provider>
    </ThemeProvider>
  </QueryClientProvider>
);
