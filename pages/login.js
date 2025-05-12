import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import styles from "@/styles/Login.module.css";
import { useUserContext } from "@/src/contexts/UserContext";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const ctx = useUserContext();

  async function handleSubmit(e) {
    e.preventDefault();
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json()
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
    <form onSubmit={handleSubmit} className={styles.container}>
      <h2 className={styles.title}>Login</h2>
      {error && <div className={styles.error}>{error}</div>}

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

      <button type="submit" className={styles.button}>
        Login
      </button>
      <p className={styles.signupText}>
        <Link href="/signup">Don't have an account? Sign up</Link>
      </p>
    </form>
  );
}
