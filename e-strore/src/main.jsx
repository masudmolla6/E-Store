import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router'
import router from './router/router'
import AuthProvider from './contexts/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import 'aos/dist/aos.css';
import AOS from 'aos';

AOS.init({
  duration: 1200,
  once: false,
});


const queryClient = new QueryClient();

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <div className='font-urbanist max-w-7xl mx-auto'>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={router}>  
          </RouterProvider>
        </QueryClientProvider>
      </AuthProvider>
    </div>
  </StrictMode>,
)
