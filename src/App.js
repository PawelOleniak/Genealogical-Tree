import SignIn from 'pages/SignIn/SignIn';
import { Switch } from 'react-router-dom';
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { TreePage } from './pages';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path="/Tree" exact component={TreePage} />
          <SignIn path="/" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
