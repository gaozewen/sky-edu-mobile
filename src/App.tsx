import { useMutation, useQuery } from '@apollo/client'
import { ImageUploader } from 'antd-mobile'
import { useState } from 'react'

import styles from './App.module.scss'
import { FIND, UPDATE } from './graphql/demo'
import { useUploadOSS } from './hooks/useUploadOSS'

const App = () => {
  const { loading, data } = useQuery(FIND, {
    variables: {
      id: 'cea67d16-df13-4320-bdf2-5d1e56363191',
    },
  })

  const [params, setParams] = useState({})

  const [update] = useMutation(UPDATE)

  const { uploadHandler } = useUploadOSS()

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
    <div className={styles.root}>
      <ImageUploader upload={uploadHandler} />
      <div className={styles.container}>
        <p>data: {JSON.stringify(data)}</p>
        <p>loading: {`${loading}`}</p>

        <p className={styles.newForm}>
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
    </div>
  )
}

export default App
