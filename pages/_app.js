import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "../context/authContext";
import Shield from "../lib/shield";
import "../styles/globals.css";

function MyApp({ Component, pageProps }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <Shield>
          <Component {...pageProps} />
        </Shield>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
