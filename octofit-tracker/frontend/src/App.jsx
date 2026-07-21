import './App.css'

function App() {
  return (
    <main className="container py-5">
      <div className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase text-primary fw-semibold">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold">Modern fitness tracking for teams and solo athletes.</h1>
          <p className="lead text-muted">
            Log workouts, follow progress, and build healthy habits through a polished multi-tier experience.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="/">Explore the app</a>
            <a className="btn btn-outline-secondary btn-lg" href="/">View leaderboard</a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0">
            <div className="card-body p-4">
              <h2 className="h4 fw-semibold">What’s included</h2>
              <ul className="list-group list-group-flush mt-3">
                <li className="list-group-item px-0">Activity logging</li>
                <li className="list-group-item px-0">Team challenges</li>
                <li className="list-group-item px-0">Personalized workout suggestions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
