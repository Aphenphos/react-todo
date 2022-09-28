import { Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path='/auth/:type' component={Auth} />
      </Switch>
    </div>
  );
}

export default App;
