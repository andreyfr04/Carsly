import './App.css';
import Navbar from './components/navbar';
import AddCarPanel from './AddCarPanel';
import React, { useState } from 'react';
import { MAINTENANCE_TYPES } from './maintenanceTypes';
import { calculateMaintenanceCost } from './maintenanceLogic';
import Gauge from './Gauge';
import LogServicePanel from './LogServicePanel';
import AddBillPanel from './AddBillPanel';

function App() {

  const [cars, setCars] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [selectedCarID, setSelectedCarID] = useState(null);

  const [serviceHistory, setServiceHistory] = useState([]);
  const [logServiceType, setLogServiceType] = useState(null); // which maintenance type we're logging, or null

  const [bills, setBills] = useState([]);
  const [showAddBill, setShowAddBill] = useState(false);

  const [activeTab, setActiveTab] = useState('maintenance'); // 'maintenance' | 'bills' | 'budget'

  // ---- EVENT HANDLERS ----
  function handleAddCar(newCar) {
    setCars([...cars, newCar]);
    setShowAddCar(false);
  }

  function handleLogService(entry) {
    setServiceHistory([...serviceHistory, entry]);
    setLogServiceType(null);
  }

  function handleAddBill(entry) {
    setBills([...bills, entry]); // array spread, not object spread
    setShowAddBill(false);
  }
  // --------------------------------------------------

  const selectedCar = cars.find((car) => car.id === selectedCarID);

  return (
    <div className="app">
      <Navbar onAddCarClick={() => setShowAddCar(true)} />

      <main className="app__content">
        {selectedCar ? (
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

            {/* ---- TABS + ACTIONS ROW ---- */}
            <div className="tabs-row">
              <div className="tabs">
                <button
                  className={`tab ${activeTab === 'maintenance' ? 'active' : ''}`}
                  onClick={() => setActiveTab('maintenance')}
                >
                  Maintenance
                </button>
                <button
                  className={`tab ${activeTab === 'bills' ? 'active' : ''}`}
                  onClick={() => setActiveTab('bills')}
                >
                  Fuel & Bills
                </button>
                <button
                  className={`tab ${activeTab === 'budget' ? 'active' : ''}`}
                  onClick={() => setActiveTab('budget')}
                >
                  Budget
                </button>
              </div>

              <div className="tab-actions">
                {activeTab === 'maintenance' && (
                  <button className="action-button" onClick={() => setLogServiceType(MAINTENANCE_TYPES[0].id)}>Log Service</button>
                )}
              </div>
            </div>

            {/* ---- MAINTENANCE TAB ---- */}
            {activeTab === 'maintenance' && (
              <>
                <div className="maintenance-grid">
                  {MAINTENANCE_TYPES.map((type) => {
                    const result = calculateMaintenanceCost(selectedCar, type, serviceHistory);
                    return (
                      <div key={type.id} className="maintenance-card">
                        <Gauge status={result.status} />
                        <h3 className="maintenance-card-label">{type.label}</h3>
                        <p className="maintenance-card-detail"></p>
                        <span className={`status-pill status-${result.status.replace(' ', '-')}`}>
                          {result.status}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </>
            )}

            {/* ---- BILLS TAB ---- */}
            {activeTab === 'bills' && (
              <div className="bills-section">
                <div className="bills-header">
                  <h2>Car Bills</h2>
                  <button className="action-button" onClick={() => setShowAddBill(true)}>+ Add entry</button>
                </div>

                <table className="bills-table">
                  <thead>
                    <tr>
                      <th>Date</th>
                      <th>Bill Type</th>
                      <th>Odometer</th>
                      <th>Amount</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bills
                      .filter((b) => b.carID === selectedCarID)
                      .map((b) => (
                        <tr key={b.id}>
                          <td>{b.date}</td>
                          <td>{b.kind}</td>
                          <td>{b.mileage ? b.mileage.toLocaleString() : '-'}</td>
                          <td>£{b.amount.toFixed(2)}</td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}

            {/* ---- BUDGET TAB (placeholder for now) ---- */}
            {activeTab === 'budget' && (
              <div className="budget-section">
                <p>Budget tracking coming soon.</p>
              </div>
            )}
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

            <section className="garage-grid">
              {cars.map((car) => (
                <div key={car.id} className="car-tile" onClick={() => setSelectedCarID(car.id)}>
                  <h3>{car.name}</h3>
                  <p>{car.model} {car.year}</p>
                  <h4>{car.mileage.toLocaleString()} miles</h4>
                </div>
              ))}
            </section>
          </>
        )}
      </main>

      {showAddCar && (
        <AddCarPanel
          onClose={() => setShowAddCar(false)}
          onSave={handleAddCar}
        />
      )}

      {showAddBill && (
        <AddBillPanel
          car={selectedCar}
          onClose={() => setShowAddBill(false)}
          onSave={handleAddBill}
        />
      )}

      {logServiceType && (
        <LogServicePanel
          car={selectedCar}
          typeID={logServiceType}
          types={MAINTENANCE_TYPES}
          onClose={() => setLogServiceType(null)}
          onSave={handleLogService}
        />
      )}
    </div>
  );
}

export default App;