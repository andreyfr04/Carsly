import React, {useState} from 'react';
import './AddCarPanel.css';

function AddCarPanel({ onClose, onSave }) {
  const [carName, setCarName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState('');
  const [journeyType, setJourneyType] = useState('mixed');
  const [weeklyMileage, setWeeklyMileage] = useState('');

  function handleSave(){
    const newCar = {
      id: Date.now(),  
      name: carName,
      model: carModel,
      year: carYear,
      mileage: Number(carMileage),
      journeyType: journeyType,
      weeklyMileage: Number(weeklyMileage),
      registeredDate: new Date().toISOString().slice(0, 10)
    };
    console.log(newCar); 
    onSave(newCar);
  };
    return(
    <div className= "modal-overlay" onClick = {onClose}>
        <div className = "modal" onClick={(e) => e.stopPropagation()}>
            <h2> Register a car</h2>

        <label> Name </label>   
        <input value = {carName} onChange = {(e) => setCarName(e.target.value)}/>

        <label> Model </label>   
        <input value = {carModel} onChange = {(e) => setCarModel(e.target.value)}/>

        <label> Year </label>   
        <input value = {carYear} onChange = {(e) => setCarYear(e.target.value)}/>

        <label> Mileage </label>   
        <input value = {carMileage} onChange = {(e) => setCarMileage(e.target.value)}/>

        <label> Journey Type</label>
        <select value = {journeyType} onChange = {(e) => setJourneyType(e.target.value)}>
            <option value = "city"> Mostly City</option>
            <option value = "highway"> Mostly Highway</option>
            <option value = "mixed">Mixed City and Highway</option>
        </select>
        <label> Weekly Mileage </label>
        <select value = {weeklyMileage} onChange = {(e) => setWeeklyMileage(e.target.value)}>
            <option value = "25"> under 50 mi</option>
            <option value = "75"> 50-100 mi </option>
            <option value = "150"> 100-200 mi </option>
            <option value = "250"> 200-300 mi </option>
            <option value = "350"> 300-400 mi</option>
            <option value = "450"> over 400 mi </option>

        </select>

        <div className = "modal-actions"> 
            <button onClick = {onClose}> Cancel </button>
            <button onClick = {handleSave}> Save</button>

      </div>
     </div>
    </div>

    );

};

export default AddCarPanel;