import React, { Suspense } from 'react'
import { Provider as ReduxStoreProvider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { persistStore } from 'redux-persist'
import { PersistGate as ReduxPersistGate } from 'redux-persist/integration/react'

import './index.css'

import ErrorBoundary from './components/ErrorBoundary/ErrorBoundary'
import Loading from './components/Loading/Loading'
import OffScreen from './offscreen/index'
import { store } from './redux/store'
import Router from './Router'

const persistor = persistStore(store)

// @ts-expect-error
ReduxStoreProvider.displayName = 'ReduxStoreProvider'

const App = () => {
  return (
    <ErrorBoundary>
      <Suspense fallback={<Loading />}>
        <ReduxStoreProvider store={store}>
          <ReduxPersistGate persistor={persistor}>
            <BrowserRouter>
              <OffScreen.Sidebar />
              <OffScreen.SnackBarDispatcher />
              <Router />
            </BrowserRouter>
          </ReduxPersistGate>
        </ReduxStoreProvider>
      </Suspense>
    </ErrorBoundary>
  )
}

export default App
