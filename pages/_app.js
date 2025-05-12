import "@/styles/globals.css";
import { UserProvider } from "@/src/contexts/UserContext";
import Navbar from "@/src/components/navbar";

export default function App({ Component, pageProps }) {
  const options = [
    {
      link: "jobs",
      title: "Look for Jobs",
    },
    {
      link: "companies",
      title: "Explore Companies",
    },
    {
      link: "login",
      title: "Log in",
    },
    {
      link: "signup",
      title: "Create an Account",
    },
  ];
  return (
    <UserProvider>
        <Navbar title="Hirely" options={options}/>
      <div className="wrapper">
        <Component {...pageProps} />
      </div>
    </UserProvider>
  );
}
