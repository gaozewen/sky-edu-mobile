import './App.css'

import { useMutation, useQuery } from '@apollo/client'
import { useState } from 'react'

import { FIND, UPDATE } from './graphql/demo'

const App = () => {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: 'cea67d16-df13-4320-bdf2-5d1e56363191',
    },
  })

  const [params, setParams] = useState({})

  const [update] = useMutation(UPDATE)

  const onChange = (key: string, value: string) => {
    setParams({
      ...params,
      [key]: value,
    })
  }

  const onUpdate = () => {
    update({
      variables: {
        id: 'cea67d16-df13-4320-bdf2-5d1e56363191',
        params,
      },
    })
  }

  return (
    <div>
      <p>data: {JSON.stringify(data)}</p>
      <p>loading: {`${loading}`}</p>

      <p>
        account: <input onChange={e => onChange('account', e.target.value)} />
      </p>
      <p>
        username: <input onChange={e => onChange('username', e.target.value)} />
      </p>
      <p>
        desc: <input onChange={e => onChange('desc', e.target.value)} />
      </p>
      <p>
        <button onClick={onUpdate}>修改</button>
      </p>
    </div>
  )
}

export default App
