import './App.css';
import Navbar from './components/navbar';
import AddCarPanel from './AddCarPanel';
import React, {useState} from 'react';


function App() {
  
  const [cars, setCars] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);


function handleAddCar(newCar) {
  setCars([...cars, newCar]);
  setShowAddCar(false);
}  
 
  return (
    <div className="app">
       <Navbar onAddCarClick={() => setShowAddCar(true)} />
      <main className="app__content">
        <section id="home" className="hero">
          <p className="hero__eyebrow">Welcome</p>
          <h1>Your Garage</h1>
          <h2 className="hero__subtitle">
            Track every car's maintenance schedule, fuel spend, and upcoming service — all from mileage and habits, no diagnostic port needed.
          </h2>
        </section>

        {showAddCar && (
          <AddCarPanel
            onClose={() => setShowAddCar(false)}
            onSave= {handleAddCar}
            />
        )}

        <section className = "garage-grid">
          {cars.map((car) => (
            <div key = {car.id} className = "car-tile">
              <h3> {car.name}</h3>
              <p>{car.model} {car.year}</p>
              <h4>{car.mileage.toLocaleString()} miles </h4>
            </div>

          ))}
        </section>
      
      </main>
    </div>
  );
}

export default App;
