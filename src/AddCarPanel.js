import React, {useState} from 'react';
import './AddCarPanel.css';

function AddCarPanel({ onClose, onSave }) {
  const [carName, setCarName] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState('');

  function handleSave(){
    const newCar = {
      id: Date.now(),  
      name: carName,
      model: carModel,
      year: carYear,
      mileage: Number(carMileage),
    };
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

        <div className = "modal-actions"> 
            <button onClick = {onClose}> Cancel </button>
            <button onClick = {handleSave}> Save</button>

      </div>
     </div>
    </div>

    );

};

export default AddCarPanel;