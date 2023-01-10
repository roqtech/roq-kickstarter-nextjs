import { signIn, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "pages/login/login.module.css";
import AppLayout from "layout/auth/auth.layout";
import { FormEvent } from "react";
import { useRouter } from "next/router";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  const session = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session.status === "authenticated") {
      router.push("/dashboard");
    }
  }, [session]);

  const doLogin = async () => {
    try {
      const result = await signIn("password", {
        email,
        password,
        redirect: false,
      });
      if (result.error) {
        alert(result.error);
      }
    } catch (error) {
      alert(error.toString());
    }
  };

  const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    doLogin();
  };

  const handleSignup = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const result = await fetch("/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });
      const data = await result.json();
      if (data.user) {
        doLogin();
      } else
        alert(
          data.error ||
            "An error occured while registering. Check the server logs for details"
        );
    } catch (error) {
      alert(error.toString());
    }
  };

  const loginForm = (
    <form onSubmit={handleLogin}>
      <input
        className={styles.inputText}
        type="text"
        name="email"
        placeholder="johndoe@roq.tech"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      ></input>
      <input
        className={styles.inputText}
        type="password"
        name="password"
        placeholder="8 Characters"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      ></input>
      <button className="btn btn-block" type="submit">
        Login
      </button>
      <a href="#" onClick={() => setIsRegister(true)}>
        Signup here
      </a>
    </form>
  );

  const registerForm = (
    <form onSubmit={handleSignup}>
      <input
        className={styles.inputText}
        type="text"
        name="name"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input
        className={styles.inputText}
        type="text"
        name="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        className={styles.inputText}
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button className="btn btn-block" type="submit">
        Signup
      </button>
      <a href="#" onClick={() => setIsRegister(false)}>
        Login here
      </a>
    </form>
  );

  return (
    <AppLayout>
      <div className={styles.center}>
        <Image
          className={styles.logo}
          src="/roq.svg"
          alt="ROQ Logo"
          width={300}
          height={200}
          priority
        />
        {isRegister ? registerForm : loginForm}
      </div>

      <a
        href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        className={styles.card}
        target="_blank"
        rel="noopener noreferrer"
      >
        <h2>Docs</h2>
        <div>https://docs.roq.tech</div>
      </a>
    </AppLayout>
  );
}
