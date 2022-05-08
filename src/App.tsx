import { lazy, Suspense } from "react";
import ErrorBoundary from "@/components/ErrorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "@/components/lib";
import { useAuth } from "./auth/auth-context";

const AuthenticatedApp = lazy(() => import("./AuthenticateApp"));
const UnAuthenticateApp = lazy(() => import("./UnAuthenticateApp"));

function App() {
  const { user } = useAuth();
  console.log("@@@@USER", user);

  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <Suspense fallback={<FullPageLoading />}>
        {user !== null ? <AuthenticatedApp /> : <UnAuthenticateApp />}
      </Suspense>
    </ErrorBoundary>
  );
}

export default App;
