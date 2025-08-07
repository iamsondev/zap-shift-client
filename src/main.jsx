import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { router } from './Router/router.jsx'
import { RouterProvider } from 'react-router'
import 'aos/dist/aos.css';
import Aos from 'aos'
import AuthProvider from './Context/AuthContext/AuthProvider.jsx'

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className='font-urbanist'>
      <AuthProvider>
             <RouterProvider router={router} />
      </AuthProvider>
     </div>
  </StrictMode>,
)
