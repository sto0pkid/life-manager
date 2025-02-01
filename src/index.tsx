import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import store from './store'
import { Provider } from 'react-redux'

async function enableMocking() {
  console.log('ENV', process.env.NODE_ENV)
  if (process.env.NODE_ENV !== 'development') {
    return
  }
 
  const { worker } = await import('./mocks/browser')
 
  // `worker.start()` returns a Promise that resolves
  // once the Service Worker is up and ready to intercept requests.
  return worker.start()
}

enableMocking().then(() => {
  fetch('/api/bills').then(
    response => response.json()
  ).then(
    data => console.log('Bills', data)
  )

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