"use client";

import AdminShell from "@/components/admin/admin-shell";

export default function AdminUstawieniaPage() {
  return (
    <AdminShell 
      title="Ustawienia strony"
      description="Zarządzaj ustawieniami globalnymi strony głównej"
    >
      <div className="page-bg noise">
        <div style={{ maxWidth: "1200px", margin: "0 auto", padding: "2rem" }}>
        <style>{`
          .settings-card {
            background: var(--surface-elevated);
            border: 1px solid var(--border);
            border-radius: 1rem;
            padding: 2rem;
            margin-bottom: 2rem;
          }
          .settings-title {
            font-family: var(--font-display);
            font-size: 1.5rem;
            font-weight: 700;
            color: var(--text);
            margin-bottom: 1.5rem;
          }
          .form-group {
            margin-bottom: 1.5rem;
          }
          .form-label {
            display: block;
            font-size: 0.875rem;
            font-weight: 600;
            color: var(--text);
            margin-bottom: 0.5rem;
          }
          .file-input {
            width: 100%;
            padding: 0.75rem;
            border: 1px solid var(--border);
            border-radius: 0.5rem;
            background: var(--surface);
            color: var(--text);
            font-size: 0.875rem;
          }
          .btn-primary {
            background: var(--pink);
            color: white;
            border: none;
            padding: 0.75rem 1.5rem;
            border-radius: 0.5rem;
            font-weight: 600;
            cursor: pointer;
            transition: background 0.2s;
          }
          .btn-primary:hover:not(:disabled) {
            background: var(--pink-light);
          }
          .btn-primary:disabled {
            opacity: 0.5;
            cursor: not-allowed;
          }
          .error {
            color: #ef4444;
            font-size: 0.875rem;
            margin-top: 0.5rem;
          }
          .preview {
            margin-top: 1rem;
            border-radius: 0.5rem;
            overflow: hidden;
            aspect-ratio: 16/9;
          }
          .preview img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }
        `}</style>

        <div className="settings-card">
          <h1 className="settings-title">Ustawienia strony</h1>
        </div>
      </div>
    </div>
    </AdminShell>
  );
}
