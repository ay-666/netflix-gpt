
import Body from './components/Body'
import { Provider } from 'react-redux'
import appStore from './utils/store/store'

import AppRouter from './routes/appRouter'



function App() {

  


  return (
    <Provider store={appStore}>
     <AppRouter></AppRouter>
    </Provider>
  )
}

export default App
