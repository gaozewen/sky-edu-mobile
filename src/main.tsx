import './index.css'
import './theme.css'

import { ApolloProvider } from '@apollo/client'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'
import { client } from './utils/apollo.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
