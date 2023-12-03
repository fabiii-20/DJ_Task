// App.jsx

import { useState } from 'react';
import Login from './components/Login';
import AdminDashboard from './components/AdminDashboard';

const App = () => {
  const [token, setToken] = useState(null);

  const handleLogin = (data) => {
    setToken(data.token);
  };

  return (
    <div>
      {!token ? (
        <Login handleLogin={handleLogin} />
      ) : (
        <AdminDashboard token={token} />
      )}
    </div>
  );
};

export default App;

