import * as React from "react";
import { useCookies } from "react-cookie";

import { Loading } from "components";
import { useAuth } from "features/auth/auth-context";

const AuthenticatedApp = React.lazy(() => import("./AuthenticatedApp"));
const UnAuthenticatedApp = React.lazy(() => import("./UnAuthenticatedApp"));

const App: React.FC = (props) => {
  const [{ IS_LOGGED_IN: isLoggedIn }] = useCookies(["IS_LOGGED_IN"]);
  const { user, login } = useAuth();
  // React.useEffect(() => {
  //   console.log(
  //     login({ email: "test@test.com", password: "test123", remember: false }),
  //     user
  //   );
  // }, []);
  console.log(user);
  return (
    <React.Suspense fallback={<Loading />}>
      {user ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </React.Suspense>
  );
};

export default App;
