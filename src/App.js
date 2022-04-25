import { lazy, Suspense } from "react";

import ErrorBoundary from "@/components/ErrorBoundary";
import { FullPageErrorFallback, FullPageLoading } from "@/components/lib";

const AuthenticatedApp = lazy(() => import("./AuthenticateApp"));
const UnAuthenticateApp = lazy("./UnAuthenticateApp");

function App() {
  const { user } = useAuth();

  return (
    <ErrorBoundary fallbackRender={FullPageErrorFallback}>
      <Suspense fallback={<FullPageLoading />}></Suspense>
    </ErrorBoundary>
  );
}

export default App;
