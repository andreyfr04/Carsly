import './App.css';
import Navbar from './components/navbar';
import AddCarPanel from './AddCarPanel';
import React, {useState} from 'react';
import {MAINTENANCE_TYPES} from './maintenanceTypes';
import {calculateMaintenanceCost} from './maintenanceLogic';
import Gauge from './Gauge';


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
        <button className="back-btn" onClick={() => setSelectedCarID(null)}>← Back to Garage</button>

        <div className="car-detail-header">
          <div>
            <p className="car-detail-eyebrow">{selectedCar.model} ({selectedCar.year})</p>
            <h1>{selectedCar.name}</h1>
            <p className="car-detail-meta">
              {selectedCar.journeyType} driving · {selectedCar.weeklyMileage} mi/week
            </p>
          </div>
          <div className="odometer-badge">{selectedCar.mileage.toLocaleString()} mi</div>
        </div>
          <div className = "maintenance-grid">
            {MAINTENANCE_TYPES.map((type) => {
              const result = calculateMaintenanceCost(selectedCar, type);
              return (
                <div key = {type.id} className= "maintenance-card">
                  <Gauge status={result.status} />
                  <h3 className = "maintenance-card-label">{type.label}</h3>
                  <p className="maintenance-card-detail"></p>
                  <span className={`status-pill status-${result.status.replace(' ', '-')}`}>{result.status}</span>
                </div>
              );
            })}
          </div>
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
