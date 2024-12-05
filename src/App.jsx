import React from 'react';
import Header from './components/Header';
import NewsApp from './components/NewsApp';

const App = () => {
  return (
    <div>
      <Header />
      <main>
        <NewsApp />
      </main>
    </div>
  );
};

export default App;
