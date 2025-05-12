import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Signup.module.css";
import UserFields from "@/src/components/Signup/UserFields";
import CompanyFields from "@/src/components/Signup/CompanyFields";
import RoleSelector from "@/src/components/Signup/RoleSelector";
import { useUserContext } from "@/src/contexts/UserContext";

export default function SignupForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [name, setName] = useState("");

  // User fields
  const [jobTypes, setJobTypes] = useState([]);
  const [degree, setDegree] = useState("");
  const [experienceLevel, setExperienceLevel] = useState("");
  const [skills, setSkills] = useState("");
  const [location, setLocation] = useState("");
  const [interests, setInterests] = useState([]);

  // Company fields
  const [companyTitle, setCompanyTitle] = useState("");
  const [companyDescription, setCompanyDescription] = useState("");
  const [companyLocation, setCompanyLocation] = useState("");

  const [error, setError] = useState("");

  const ctx = useUserContext()

  const handleCheckbox = (value, state, setter) => {
    setter((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const userData = {
      name,
      email,
      password,
      role,
      ...(role === "user" && {
        jobTypes,
        degree,
        experienceLevel,
        skills: skills.split(",").map((s) => s.trim()),
        location,
        interests,
      }),
      ...(role === "company" && {
        companyTitle,
        companyDescription,
        companyLocation,
      }),
    };

    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });

    const data = await res.json();
    if (res.ok) {
      ctx.setUserContext({
        role: data.user.role,
        userId: data.user.userId,
        name: data.user.name,
        email: data.user.email,
        authToken: data.user.authToken,
      });
      router.push("/");
    } else {
      setError(data.message);
    }
  }
  return (
    <div className={styles.PageWrapper}>
      <form onSubmit={handleSubmit} className={styles.container}>
        <h2 className={styles.title}>Sign Up</h2>
        {error && <div className={styles.error}>{error}</div>}

        <div className={styles.inputGroup}>
          <input
            type="text"
            className={styles.input}
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="email"
            className={styles.input}
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGroup}>
          <input
            type="password"
            className={styles.input}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <RoleSelector role={role} setRole={setRole} />

        {role === "user" && (
          <UserFields
            jobTypes={jobTypes}
            setJobTypes={setJobTypes}
            degree={degree}
            setDegree={setDegree}
            experienceLevel={experienceLevel}
            setExperienceLevel={setExperienceLevel}
            skills={skills}
            setSkills={setSkills}
            location={location}
            setLocation={setLocation}
            interests={interests}
            setInterests={setInterests}
            handleCheckbox={handleCheckbox}
          />
        )}

        {role === "company" && (
          <CompanyFields
            companyTitle={companyTitle}
            setCompanyTitle={setCompanyTitle}
            companyDescription={companyDescription}
            setCompanyDescription={setCompanyDescription}
            companyLocation={companyLocation}
            setCompanyLocation={setCompanyLocation}
          />
        )}

        <button type="submit" className={styles.button}>
          Sign Up
        </button>

        <p className={styles.loginText}>
          <Link href="/login">Already have an account? Sign in</Link>
        </p>
      </form>
    </div>
  );
}
