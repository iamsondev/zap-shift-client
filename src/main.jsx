import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

import App from './App.jsx'
import { router } from './Router/router.jsx'
import { RouterProvider } from 'react-router'
import 'aos/dist/aos.css';
import Aos from 'aos'

Aos.init();

createRoot(document.getElementById('root')).render(
  <StrictMode>
     <div className='font-urbanist'>
        <RouterProvider router={router} />
     </div>
  </StrictMode>,
)
