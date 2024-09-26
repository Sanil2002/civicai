import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { Provider } from 'react-redux'
import { store } from './redux/store/store.ts'
import { AuthClient } from './containers/auth/authClient.tsx'
import AuthInterceptor from './containers/auth/authInterceptor.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <AuthClient>
        <AuthInterceptor>
          <App />
        </AuthInterceptor>
      </AuthClient>
    </Provider>
  </StrictMode>,
)
