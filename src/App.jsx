
import { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';
import GoogleFont from 'react-google-fonts';
<GoogleFont family='Poppins' />
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (data) => {
    setToken(data.token);
  };

  return (
    <div style={{backgroundColor: '#030303', color: '#FFFFFF', fontFamily: 'Poppins' }}>
      {!token ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <AdminDashboard token={token} />
      )}
    </div>
  );
};

export default App;

