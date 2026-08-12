import './App.css';
import Navbar from './components/navbar';
import AddCarPanel from './AddCarPanel';
import React, {useState} from 'react';


function App() {
  
  const [cars, setCars] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [selectedCarID, setSelectedCarID] = useState(null);


function handleAddCar(newCar) {
  setCars([...cars, newCar]);
  setShowAddCar(false);
}  
 
  const selectedCar = cars.find((car) => car.id === selectedCarID);
  return (
    <div className="app">
       <Navbar onAddCarClick={() => setShowAddCar(true)} />


      <main className="app__content">
      {selectedCar ?(
        // ---- CAR DETAIL VIEW ----
        <div>
          <button onClick ={() => setSelectedCarID(null)}> Back to Garage</button>
          <h1>{selectedCar.name}</h1>
          <p>{selectedCar.model} ({selectedCar.year})</p>
          <p>{selectedCar.mileage.toLocaleString()} miles</p>
          <p>Journey Type: {selectedCar.journeyType}</p>
          <p>Weekly Mileage: {selectedCar.weeklyMileage} mi</p>
        </div>
      ) : (
        // ---- GARAGE VIEW ----
        <>
        <section id="home" className="hero">
          <p className="hero__eyebrow">Welcome</p>
          <h1>Your Garage</h1>
          <h2 className="hero__subtitle">
            Track every car's maintenance schedule, fuel spend, and upcoming service — all from mileage and habits, no diagnostic port needed.
          </h2>
        </section>

        <section className = "garage-grid">
          {cars.map((car) =>(
            <div key = {car.id} className = "car-tile" onClick = {() => setSelectedCarID(car.id)}>
              <h3> {car.name}</h3>
              <p>{car.model} {car.year}</p>
              <h4>{car.mileage.toLocaleString()} miles </h4>
            </div>

          ))}
        </section>
        </>
      )}
      </main>

        {showAddCar && (
          <AddCarPanel
            onClose={() => setShowAddCar(false)}
            onSave= {handleAddCar}
            />
        )}
    </div>
  );
}

export default App;
