import { useEffect, useState } from 'react';

function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
}

export default function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(buildApiUrl('/api/leaderboard'));
        if (!response.ok) {
          throw new Error('Failed to load leaderboard');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.leaderboard ?? payload.results ?? [];
        setEntries(items);
      } catch (err) {
        setError(err.message || 'Unable to load leaderboard');
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Leaderboard</h2>
        <p className="text-muted">Top performers and streaks.</p>
        {loading && <p>Loading leaderboard…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {entries.map((entry) => (
              <li key={entry.id ?? entry._id ?? entry.userName} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{entry.userName}</div>
                    <div className="small text-muted">Streak: {entry.streak}</div>
                  </div>
                  <span className="badge bg-success">{entry.points} pts</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
