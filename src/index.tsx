import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'
import './index.css'

async function enableMocking() {
  if (process.env.NODE_ENV !== 'development') {
    return
  }
  console.log('life-management-app: dev mode')
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  const container = document.getElementById('root')!
  const root = createRoot(container)

  root.render(
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  );
})