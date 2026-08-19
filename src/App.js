import './App.css';
import Navbar from './components/navbar';
import AddCarPanel from './AddCarPanel';
import React, { useState, useEffect } from 'react';
import { MAINTENANCE_TYPES } from './maintenanceTypes';
import { calculateMaintenanceCost } from './maintenanceLogic';
import Gauge from './Gauge';
import LogServicePanel from './LogServicePanel';
import AddBillPanel from './AddBillPanel';
import SetBudgetPanel from './addBudgetPanel';

function App() {

  const [cars, setCars] = useState([]);
  const [showAddCar, setShowAddCar] = useState(false);
  const [selectedCarID, setSelectedCarID] = useState(null);

  const [serviceHistory, setServiceHistory] = useState([]);
  const [logServiceType, setLogServiceType] = useState(null); // which maintenance type we're logging, or null

  const [bills, setBills] = useState([]);
  const [showAddBill, setShowAddBill] = useState(false);

  const [activeTab, setActiveTab] = useState('maintenance'); // 'maintenance' | 'bills' | 'budget'

  const [budget, setBudget] = useState({}); // key by carID: { period, amount } for EVERY car
  const [showBudget, setShowBudget] = useState(false);

  // Flag that tracks whether the initial load from localStorage has finished yet.
  const [dataLoaded, setDataLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('carsly-data');
    if (saved) {
      const data = JSON.parse(saved);
      setCars(data.cars || []);
      setServiceHistory(data.serviceHistory || []);
      setBills(data.bills || []);
      setBudget(data.budget || {});
    }
    setDataLoaded(true); // loading attempt is done, whether or not there was anything saved
  }, []);

  useEffect(() => {
    if (!dataLoaded) return; //  don't save until the load above has actually finished
    localStorage.setItem('carsly-data', JSON.stringify({ cars, serviceHistory, bills, budget }));
  }, [cars, serviceHistory, bills, budget, dataLoaded]);

  // --------HANDLERS-----------------------------------
  function handleAddCar(newCar) {
    setCars([...cars, newCar]);
    setShowAddCar(false);
  }

  function handleLogService(entry) {
    setServiceHistory([...serviceHistory, entry]);
    setLogServiceType(null);
  }

  function handleAddBill(entry) {
    setBills([...bills, entry]);
    setShowAddBill(false);
  }

  function handleSetBudget(budgetData) {
    setBudget({ ...budget, [selectedCarID]: budgetData });
    setShowBudget(false);
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

            {/* ---- TABS  ---- */}
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

                <div className="bills-list">
                  {bills.filter((b) => b.carID === selectedCarID).length === 0 ? (
                    <div className="bill-empty-state">
                      No bills logged yet for this car.
                    </div>
                  ) : (
                    bills
                      .filter((b) => b.carID === selectedCarID)
                      .map((b) => (
                        <article key={b.id} className="bill-card">
                          <div className="bill-card__top">
                            <span className="bill-type-chip">{b.billType}</span>
                            <span className="bill-amount">£{Number(b.amount).toFixed(2)}</span>
                          </div>

                          <div className="bill-card__meta">
                            <span>{b.date}</span>
                            <span>{b.mileage ? `${b.mileage.toLocaleString()} mi` : 'Mileage n/a'}</span>
                          </div>

                          {b.notes ? <p className="bill-notes">{b.notes}</p> : null}
                        </article>
                      ))
                  )}
                </div>
              </div>
            )}

            {/* ---- BUDGET TAB  ---- */}
            {activeTab === 'budget' && (
              <div className="budget-section">
                {(() => {
                  const carBudget = budget[selectedCarID]; // THIS car's budget, distinct from the `budget` state (which holds every car's)
                  const now = new Date();
                  const periodStart = carBudget && carBudget.period === "monthly"
                    ? new Date(now.getFullYear(), now.getMonth(), 1)
                    : new Date(now.getFullYear(), 0, 1);

                  const periodBills = bills.filter(
                    (b) => b.carID === selectedCarID && new Date(b.date) >= periodStart
                  );
                  const spent = periodBills.reduce((total, b) => total + b.amount, 0);

                  return (
                    <>
                      {carBudget ? (
                        <div className="budget-card">
                          <p className="budget-label">{carBudget.period === 'monthly' ? 'This month' : 'This year'}</p>
                          <p className="budget-figure">£{spent.toFixed(2)} of £{carBudget.amount.toFixed(2)}</p>
                          <div className="budget-bar-track">
                            <div
                              className="budget-bar-fill"
                              style={{
                                width: `${Math.min((spent / carBudget.amount) * 100, 100)}%`,
                                background: spent > carBudget.amount ? '#e5484d' : '#4cb782',
                              }}
                            ></div>
                          </div>
                          <p className="budget-remaining">
                            {spent > carBudget.amount
                              ? 'Over budget for this period'
                              : `£${(carBudget.amount - spent).toFixed(2)} remaining`}
                          </p>
                        </div>
                      ) : (
                        <p>No budget set for this car yet.</p>
                      )}
                      <button className="action-button" onClick={() => setShowBudget(true)}>
                        {carBudget ? 'Edit budget' : 'Set budget'}
                      </button>
                    </>
                  );
                })()}
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

      {showBudget && (
        <SetBudgetPanel
          existing={budget[selectedCarID]}
          onClose={() => setShowBudget(false)}
          onSave={handleSetBudget}
        />
      )}

    </div>
  );
}

export default App;