import './App.css';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import Navigation from './components/shared/Navigation/Navigation';
import Home from './pages/Home/Home';
import Authenticate from './pages/Authenticate/Authenticate';
import Activate from './pages/Activate/Activate';
import Rooms from './pages/Rooms/Rooms';
import GuestRoute from './routes/protectedRoutes/GuestRoute';
import SemiProtectedRoute from './routes/protectedRoutes/SemiProtectedRoute';
import ProtectedRoute from './routes/protectedRoutes/ProtectedRoute';

function App() {
  return (
    <Router>
      <Navigation />
      <Switch>
        <GuestRoute path="/" exact>
          <Home />
        </GuestRoute>
        <GuestRoute path="/authenticate">
          <Authenticate />
        </GuestRoute>
        <SemiProtectedRoute path="/activate">
          <Activate />
        </SemiProtectedRoute>
        <ProtectedRoute path="/rooms">
          <Rooms />
        </ProtectedRoute>
      </Switch>
    </Router>
  );
}





export default App;
