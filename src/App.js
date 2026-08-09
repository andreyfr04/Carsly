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
        <section className="car-detail-view">
          <button className="car-detail-view__back" onClick ={() => setSelectedCarID(null)}>
            <span aria-hidden="true">←</span> Back to Garage
          </button>
          <div className="car-detail-view__content">
            <div className="car-detail-view__kicker">
              {selectedCar.year} {selectedCar.model} <span aria-hidden="true">•</span> {selectedCar.mileage.toLocaleString()} miles
            </div>
            <h1 className="car-detail-view__title">{selectedCar.name}</h1>
            <p className="car-detail-view__subtitle">
              {selectedCar.journeyType === 'city' ? 'Mostly City' : selectedCar.journeyType === 'highway' ? 'Mostly Highway' : 'Mixed City and Highway'}
              <span aria-hidden="true"> • </span>
              {selectedCar.journeyType === 'highway' ? 'Daily driver' : 'Daily driver'}
              <span aria-hidden="true"> • </span>
              {selectedCar.weeklyMileage} mi/week
            </p>
          </div>
        </section>
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
