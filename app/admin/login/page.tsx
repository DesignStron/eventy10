"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function AdminLoginPage() {
  return (
    <Suspense>
      <AdminLoginInner />
    </Suspense>
  );
}

function AdminLoginInner() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if already authenticated
    fetch("/api/admin/check-auth", { credentials: "include" })
      .then((res) => res.json())
      .then((data) => {
        if (data.authenticated) {
          const redirect = searchParams.get("redirect") || "/admin";
          router.push(redirect);
        }
      })
      .catch(() => {
        // Ignore errors
      });
  }, [router, searchParams]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const redirect = searchParams.get("redirect") || "/admin";
        router.push(redirect);
      } else {
        setError(data.error || "Nieprawidłowe dane logowania");
      }
    } catch (err) {
      setError("Wystąpił błąd. Spróbuj ponownie.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "var(--surface)",
      padding: "1rem"
    }}>
      <style>{`
        .login-container {
          width: 100%;
          max-width: 400px;
          padding: 2rem;
          border-radius: 1.25rem;
          background: var(--surface-elevated);
          border: 1px solid var(--border);
          box-shadow: 0 10px 40px rgba(0,0,0,0.1);
        }
        .login-title {
          font-family: var(--font-display);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text);
          margin-bottom: 0.5rem;
          text-align: center;
        }
        .login-subtitle {
          color: var(--text-secondary);
          text-align: center;
          margin-bottom: 2rem;
          font-size: 0.9rem;
        }
        .form-group {
          margin-bottom: 1.5rem;
        }
        .form-label {
          display: block;
          font-size: 0.8rem;
          font-weight: 600;
          color: var(--text);
          margin-bottom: 0.5rem;
        }
        .form-input {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1px solid var(--border);
          border-radius: 0.625rem;
          background: var(--surface);
          color: var(--text);
          font-size: 0.9rem;
          transition: all 200ms ease;
          box-sizing: border-box;
        }
        .form-input:focus {
          outline: none;
          border-color: rgba(240,23,122,0.5);
          box-shadow: 0 0 0 3px rgba(240,23,122,0.1);
        }
        .login-button {
          width: 100%;
          padding: 0.875rem;
          border: none;
          border-radius: 0.625rem;
          background: linear-gradient(135deg, #f0177a, #ff4fa3);
          color: white;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 200ms ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
        }
        .login-button:hover:not(:disabled) {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(240,23,122,0.3);
        }
        .login-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }
        .error-message {
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.2);
          color: #ef4444;
          padding: 0.75rem;
          border-radius: 0.5rem;
          font-size: 0.8rem;
          margin-bottom: 1rem;
          text-align: center;
        }
        .back-link {
          display: block;
          text-align: center;
          margin-top: 1.5rem;
          color: var(--text-secondary);
          text-decoration: none;
          font-size: 0.8rem;
          transition: color 200ms ease;
        }
        .back-link:hover {
          color: var(--pink);
        }
      `}</style>

      <div className="login-container">
        <h1 className="login-title">Panel Administratora</h1>
        <p className="login-subtitle">Zaloguj się, aby zarządzać treścią strony</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username" className="form-label">
              Nazwa użytkownika
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="form-input"
              required
              autoComplete="username"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Hasło
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-input"
              required
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? (
              <>
                <span>⟳</span> Logowanie...
              </>
            ) : (
              "Zaloguj się"
            )}
          </button>
        </form>

        <a href="/" className="back-link">
          ← Wróć do strony głównej
        </a>
      </div>
    </div>
  );
}
