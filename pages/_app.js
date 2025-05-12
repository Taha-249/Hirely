import "@/styles/globals.css";
import { UserProvider } from "@/src/contexts/UserContext";
import NavbarWrapper from "@/src/components/NavbarWrapper";

export default function App({ Component, pageProps }) {
  return (
    <UserProvider>
      <NavbarWrapper/>
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
