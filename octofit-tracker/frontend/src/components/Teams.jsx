import { useEffect, useState } from 'react';

function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
}

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(buildApiUrl('/api/teams'));
        if (!response.ok) {
          throw new Error('Failed to load teams');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.teams ?? payload.results ?? [];
        setTeams(items);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Teams</h2>
        <p className="text-muted">Competitive groups and goals.</p>
        {loading && <p>Loading teams…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {teams.map((team) => (
              <li key={team.id ?? team._id ?? team.name} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{team.name}</div>
                    <div className="small text-muted">{team.sport}</div>
                  </div>
                  <span className="badge bg-secondary">{team.members} members</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
