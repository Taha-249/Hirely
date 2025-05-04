import "@/styles/globals.css";
import { UserProvider } from "@/src/contexts/UserContext";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <Component {...pageProps} />
    </UserProvider>
);
}
