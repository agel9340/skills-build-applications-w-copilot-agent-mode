import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

// API endpoint used by this component:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users
export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadUsers() {
      try {
        const response = await fetch(buildApiUrl('/api/users'));
        if (!response.ok) {
          throw new Error('Failed to load users');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.users ?? payload.results ?? [];
        setUsers(items);
      } catch (err) {
        setError(err.message || 'Unable to load users');
      } finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Users</h2>
        <p className="text-muted">Community members and their roles.</p>
        {loading && <p>Loading users…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {users.map((user) => (
              <li key={user.id ?? user._id ?? user.email} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{user.name}</div>
                    <div className="small text-muted">{user.email}</div>
                  </div>
                  <span className="badge bg-primary">{user.role}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
