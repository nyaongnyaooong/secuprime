import React from 'react';
import './App.css';
import UserTable from './components/UserTable/UserTable';

const App: React.FC = () => {
  return (
    <>
      <button>초기화</button>
      <button>추가</button>
      <UserTable />
    </>
  );
}

export default App;
