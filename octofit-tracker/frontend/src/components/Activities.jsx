import { useEffect, useState } from 'react';
import { buildApiUrl } from '../lib/api';

// API endpoint used by this component:
// https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities
export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadActivities() {
      try {
        const response = await fetch(buildApiUrl('/api/activities'));
        if (!response.ok) {
          throw new Error('Failed to load activities');
        }
        const payload = await response.json();
        const items = Array.isArray(payload) ? payload : payload.activities ?? payload.results ?? [];
        setActivities(items);
      } catch (err) {
        setError(err.message || 'Unable to load activities');
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <h2 className="h4 fw-semibold">Activities</h2>
        <p className="text-muted">Recent training sessions and progress.</p>
        {loading && <p>Loading activities…</p>}
        {error && <p className="text-danger">{error}</p>}
        {!loading && !error && (
          <ul className="list-group list-group-flush mt-3">
            {activities.map((activity) => (
              <li key={activity.id ?? activity._id ?? activity.type} className="list-group-item px-0">
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <div className="fw-semibold">{activity.type}</div>
                    <div className="small text-muted">{activity.completedAt}</div>
                  </div>
                  <span className="badge bg-info text-dark">{activity.durationMinutes} min</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
