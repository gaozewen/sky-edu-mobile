import './App.module.scss'

import { RouterProvider } from 'react-router-dom'

import router from './router'

function App() {
  return <RouterProvider router={router}></RouterProvider>
}

export default App
