import { useState } from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';
import './login.css';

function Login() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (isSignUp) {
      if (!name || !email || !password || !confirmPassword) {
        setError('Please fill in all required fields');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match');
        return;
      }
      if (password.length < 6) {
        setError('Password must be at least 6 characters');
        return;
      }
      // Demo successful signup
      navigate('/dashboard');
    } else {
      if (!email || !password) {
        setError('Please enter your email and password');
        return;
      }
      // Demo login validation or admin shortcut
      if ((email === 'admin@grubpit.com' || email === 'admin') && password === 'password') {
        navigate('/dashboard');
      } else {
        // Direct navigation for easy dev usage
        navigate('/dashboard');
      }
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    console.log('Google login success:', credentialResponse);
    navigate('/dashboard');
  };

  const handleGoogleLoginFailure = () => {
    setError('Google authentication failed. Please try again.');
  };

  return (
    <div className="auth-page-container">
      <div className="auth-card">
        {/* Brand Header */}
        <div className="auth-brand">
          <span className="brand-logo-icon">⚡</span>
          <h1 className="brand-name">GRUBPIT</h1>
        </div>

        <p className="auth-subtitle">
          {isSignUp 
            ? 'Create an account to collaborate & solve DSA problems' 
            : 'Welcome back! Sign in to your workspace'}
        </p>

        {/* Mode Switcher Tabs */}
        <div className="auth-tabs">
          <button 
            type="button" 
            className={`tab-btn ${!isSignUp ? 'active' : ''}`}
            onClick={() => { setIsSignUp(false); setError(''); }}
          >
            Sign In
          </button>
          <button 
            type="button" 
            className={`tab-btn ${isSignUp ? 'active' : ''}`}
            onClick={() => { setIsSignUp(true); setError(''); }}
          >
            Sign Up
          </button>
        </div>

        {error && <div className="auth-error-banner">{error}</div>}

        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <div className="input-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                placeholder="e.g. Alex Johnson"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {isSignUp && (
            <div className="input-group">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="••••••••"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <button type="submit" className="auth-submit-btn">
            {isSignUp ? 'Create Account →' : 'Sign In to Grubpit →'}
          </button>
        </form>

        {/* Divider */}
        <div className="auth-divider">
          <span>OR CONTINUE WITH</span>
        </div>

        {/* Google OAuth */}
        <div className="google-auth-wrap">
          <GoogleLogin 
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginFailure}
            theme="filled_dark"
            shape="pill"
          />
        </div>

        {/* Toggle Mode Footer */}
        <div className="auth-footer-toggle">
          {isSignUp ? (
            <p>
              Already have an account?{' '}
              <button 
                type="button" 
                className="link-btn" 
                onClick={() => { setIsSignUp(false); setError(''); }}
              >
                Sign In
              </button>
            </p>
          ) : (
            <p>
              Don't have an account?{' '}
              <button 
                type="button" 
                className="link-btn" 
                onClick={() => { setIsSignUp(true); setError(''); }}
              >
                Sign Up for Free
              </button>
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Login;