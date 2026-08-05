import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
import { Suspense } from 'react'
import { Loader } from './Components/Loader.jsx'
const queryClient = new QueryClient()
createRoot(document.getElementById('root')).render(
  
    
  <QueryClientProvider client={queryClient}>
      <Suspense fallback={<Loader/>}>
      <BrowserRouter>
      <App />
      </BrowserRouter>
      </Suspense>
    </QueryClientProvider>
)
