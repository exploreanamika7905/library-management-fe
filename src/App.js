import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  return (
    <div className="App">
      <Router>
        <AppRoutes/>
      </Router>
    </div>
  );
}

export default App;
