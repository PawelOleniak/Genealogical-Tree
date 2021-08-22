import { BrowserRouter as Router } from 'react-router-dom';
import { ProtectedRoute } from './components/ProtectedRoute';
import { TreePage, LoginPage } from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <ProtectedRoute validator={true} Component={TreePage} Fallback={LoginPage} />
      </Router>
    </div>
  );
}

export default App;
