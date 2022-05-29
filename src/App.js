import React from 'react';
import './App.scss';
import HomeBanner from './components/HomeBanner';
import Header from './components/Header.js';
import Login from './components/Login';
import Banner from './components/Banner';
import List from './components/List';

function App() {
  return (
    <React.Fragment>
      <Header/>
      <Banner/>
      <List/>
      <List/>
      {/* <Login/> */}
      {/* <Banner/> */}
    </React.Fragment>
  );
}

export default App;
