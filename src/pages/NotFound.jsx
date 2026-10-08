import React from 'react';
import { Link } from 'react-router-dom';
import { Compass, ArrowLeft, Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div
      className="page-container fade-in"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        minHeight: '60vh',
        padding: '40px 20px'
      }}
    >
      <div
        className="glass-panel"
        style={{
          maxWidth: '520px',
          padding: '48px 36px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '18px',
          border: '1px solid rgba(25, 245, 209, 0.2)'
        }}
      >
        <div
          style={{
            width: '68px',
            height: '68px',
            borderRadius: '50%',
            background: 'rgba(0, 217, 192, 0.1)',
            border: '1px solid rgba(0, 217, 192, 0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--bright-aqua)'
          }}
        >
          <Compass size={32} />
        </div>

        <span className="badge badge-teal">404 — UNCHARTED DESTINATION</span>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2rem',
            fontWeight: 800,
            color: 'var(--primary-text)',
            lineHeight: 1.2
          }}
        >
          Coordinates Not Found
        </h1>

        <p style={{ color: 'var(--secondary-text)', fontSize: '0.95rem', lineHeight: 1.6 }}>
          The path you seek does not exist within the vault. It may have been relocated, removed, or never charted.
        </p>

        <div style={{ display: 'flex', gap: '12px', marginTop: '10px' }}>
          <Link to="/" className="btn btn-primary">
            <Home size={16} />
            <span>Return to Vault Home</span>
          </Link>
          <Link to="/dreams" className="btn btn-secondary">
            <ArrowLeft size={16} />
            <span>My Dreams</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
