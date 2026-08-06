import React from 'react';
import './App.css';
import Navbar from './components/navbar';

function App() {
  return (
    <div className="app">
      <Navbar />

      <main className="app__content">
        <section id="home" className="hero">
          <p className="hero__eyebrow">Welcome</p>
          <h1>Your Garage</h1>
          <h2 className="hero__subtitle">
            Track every car's maintenance schedule, fuel spend, and upcoming service — all from mileage and habits, no diagnostic port needed.
          </h2>
        </section>
      </main>
    </div>
  );
}

export default App;
