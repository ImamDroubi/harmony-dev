import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.scss'
import { BrowserRouter } from 'react-router-dom'
import  axios  from 'axios'
import { ThemeProvider, createTheme } from '@mui/material'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
axios.defaults.baseURL = import.meta.env.VITE_SERVER_ORIGIN;
const queryClient = new QueryClient();
const theme = createTheme({
  palette:{
    primary:{
      main: '#5dbcbc',
    }
  }
})
ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <React.StrictMode>
      <ThemeProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <App />
          <ReactQueryDevtools initialIsOpen={false} />

        </QueryClientProvider>
      </ThemeProvider>
    </React.StrictMode>
  </BrowserRouter>
)
