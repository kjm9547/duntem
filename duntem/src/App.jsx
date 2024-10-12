import './App.css'
import { RootRoutes } from './routes/RootRoutes'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import {store,persistor} from './redux/store'
import { PersistGate } from 'redux-persist/integration/react'



function App() {
  return (
    <>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <RootRoutes/>
        </BrowserRouter>
      </PersistGate>
    </Provider>
    </>
  )
}

export default App
