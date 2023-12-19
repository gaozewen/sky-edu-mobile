import { ApolloClient, ApolloLink, from, HttpLink, InMemoryCache } from '@apollo/client'
import { ErrorLink } from '@apollo/client/link/error'

import { isLoginOrRegisterRouter } from '@/router'
import SkyToast from '@/utils/skyToast'
import { getToken } from '@/utils/userToken'

export const useApollo = () => {
  const httpLink = new HttpLink({ uri: import.meta.env.VITE_API_GQL_URL })

  const authLink = new ApolloLink((operation, forward) => {
    // get the authentication token from local storage if it exists
    const token = getToken()
    // add the authorization to the headers
    operation.setContext(({ headers = {} }) => ({
      headers: {
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
    }))

    return forward(operation)
  })

  // token 失效跳转交由 useLoadUserData 这个 hooks 来处理
  const errorLink = new ErrorLink(({ graphQLErrors = [], networkError }) => {
    if (isLoginOrRegisterRouter(location.pathname)) return
    const firstGqlErr = graphQLErrors[0]
    if (firstGqlErr) {
      const firstGqlFuncName = (firstGqlErr?.path || [])[0]
      if (firstGqlFuncName === 'getStudentByJWT') {
        return
      }

      SkyToast.show(firstGqlErr.message || '请求参数或返回的数据格式不正确')
    }
    if (networkError) {
      SkyToast.clear()
      SkyToast.show(networkError.message)
    }
  })

  const apolloClient = new ApolloClient({
    // 只有在开发模式下才会打开 Apollo 调试工具
    connectToDevTools: import.meta.env.DEV,
    cache: new InMemoryCache({
      addTypename: false,
    }),
    defaultOptions: {
      watchQuery: {
        // https://www.apollographql.com/docs/react/data/queries#supported-fetch-policies
        fetchPolicy: 'no-cache',
      },
    },
    // httpLink 必须放在末尾，否则浏览器控制台报错
    link: from([errorLink, authLink, httpLink]),
  })
  return { apolloClient }
}
