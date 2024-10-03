import './App.css'
import { RootRoutes } from './routes/RootRoutes'
import { BrowserRouter} from 'react-router-dom'
import { Provider } from 'react-redux'
import { store } from './redux/store.js'
function App() {
  return (
    <><Provider store={store}>
    <BrowserRouter>
    
    <RootRoutes/>
    </BrowserRouter>
  </Provider>
    </>
  )
}

export default App
