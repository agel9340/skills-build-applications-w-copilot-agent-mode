import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';
import { getApiBaseUrl } from './lib/api';
import './App.css';

function App() {
  const apiBaseUrl = getApiBaseUrl();

  return (
    <main className="container py-4">
      <div className="alert alert-info" role="status">
        <strong>Environment note:</strong> define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs. If it is unset, the app falls back to <code>http://localhost:8000</code>.
      </div>

      <div className="d-flex flex-wrap gap-2 mb-4">
        <NavLink className="btn btn-outline-primary" to="/">Overview</NavLink>
        <NavLink className="btn btn-outline-primary" to="/users">Users</NavLink>
        <NavLink className="btn btn-outline-primary" to="/teams">Teams</NavLink>
        <NavLink className="btn btn-outline-primary" to="/activities">Activities</NavLink>
        <NavLink className="btn btn-outline-primary" to="/leaderboard">Leaderboard</NavLink>
        <NavLink className="btn btn-outline-primary" to="/workouts">Workouts</NavLink>
      </div>

      <Routes>
        <Route
          path="/"
          element={
            <section className="row g-4">
              <div className="col-lg-8">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
                    <h1 className="display-5 fw-bold">Modern fitness tracking for teams and solo athletes.</h1>
                    <p className="lead text-muted">
                      This presentation tier uses React Router and Vite environment variables to connect to the Node.js API.
                    </p>
                    <p className="mb-0">
                      API base URL: {apiBaseUrl}
                    </p>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="card shadow-sm border-0">
                  <div className="card-body">
                    <h2 className="h5 fw-semibold">Available views</h2>
                    <ul className="list-group list-group-flush mt-3">
                      <li className="list-group-item px-0">Users</li>
                      <li className="list-group-item px-0">Teams</li>
                      <li className="list-group-item px-0">Activities</li>
                      <li className="list-group-item px-0">Leaderboard</li>
                      <li className="list-group-item px-0">Workouts</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>
          }
        />
        <Route path="/users" element={<Users />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </main>
  );
}

export default App;
