import { useEffect, useState } from 'react';

function buildApiUrl(path) {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  if (codespaceName) {
    return `https://${codespaceName}-8000.app.github.dev${path}`;
  }
  return `http://localhost:8000${path}`;
}

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const response = await fetch(buildApiUrl('/api/workouts'));
        if (!response.ok) {
          throw new Error('Failed to load workouts');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.workouts ?? payload.results ?? [];
        setWorkouts(items);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Workouts</h2>
        <p className="text-muted">Recommended routines by focus and difficulty.</p>
        {loading && <p>Loading workouts…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {workouts.map((workout) => (
              <li key={workout.id ?? workout._id ?? workout.title} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{workout.title}</div>
                    <div className="small text-muted">{workout.category}</div>
                  </div>
                  <span className="badge bg-warning text-dark">{workout.difficulty}</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
