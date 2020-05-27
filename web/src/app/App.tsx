import * as React from 'react'

import {Loading} from 'components'
import {useAuth} from 'features/auth/auth-context'

const AuthenticatedApp = React.lazy(() => import('./AuthenticatedApp'))
const UnAuthenticatedApp = React.lazy(() => import('./UnAuthenticatedApp'))

const App: React.FC = () => {
  const {user} = useAuth()

  return (
    <React.Suspense fallback={<Loading />}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  )
}

export default App
