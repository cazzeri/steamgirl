import { Link } from 'react-router-dom'
import { Button } from '../components/Button'

export function NotFoundScreen() {
  return (
    <div className="not-found-screen" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', width: '100vw' }}>
      <div className="panel-elevated" style={{ textAlign: 'center', padding: '2rem' }}>
        <h1>404</h1>
        <p className="text-muted" style={{ marginBottom: '1.5rem' }}>
          Page not found
        </p>
        <Link to="/">
          <Button color="#3b82f6">
            Go Home
          </Button>
        </Link>
      </div>
    </div>
  )
}
