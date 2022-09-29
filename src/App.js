import { Redirect, Route, Switch } from 'react-router-dom';
import Auth from './components/Auth/Auth';
import Todos from './components/Todos/Todos';
import './App.css';

function App() {
  return (
    <div className="App">
      <Switch>

        <Route path='/auth/:type' component={Auth} />

        <Route path='/todos' component={Todos} />

        <Route path = '*'>
          <Redirect to='/auth/sign-in'></Redirect>
        </Route>

      </Switch>
    </div>
  );
}

export default App;
