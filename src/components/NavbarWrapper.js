// components/NavbarWrapper.js
import { useEffect, useState } from "react";
import { useUserContext } from "@/src/contexts/UserContext";
import Navbar from "./navbar";
import { useRouter } from "next/router";

export default function NavbarWrapper() {
  const { authToken, name, clearUserContext } = useUserContext();
  const router = useRouter()

  const public_options = [
    { link: "jobs", title: "Look for Jobs" },
    { link: "companies", title: "Explore Companies" },
    { link: "login", title: "Log in" },
    { link: "signup", title: "Create an Account" },
  ];

  const private_options = [
    { link: "jobs", title: "Look for Jobs" },
    { link: "companies", title: "Explore Companies" },
    { title: `Welcome, ${name}`, link:"" },
    { title: "Sign Out", onClick: () => {clearUserContext(); router.push('/')} },
  ];

  const [options, setOptions] = useState(public_options);

  useEffect(() => {
    setOptions(authToken ? private_options : public_options);
  }, [authToken]);

  return <Navbar title="Hirely" options={options} />;
}
