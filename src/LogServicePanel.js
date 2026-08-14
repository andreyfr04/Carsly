import React, {useState} from 'react';
import './AddCarPanel.css';

function LogServicePanel({car, typeID, types, onClose, onSave}) {
    const [selectedType, setSelectedType] = useState(typeID);
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [mileage, setMileage] = useState(car.mileage);
    const [cost, setCost] = useState('');
    const [notes, setNotes] = useState('');

    function handleSave() {
        const entry = {
            ID: Date.now(),
            carID: car.id,
            typeID: selectedType,
            date,
            mileage: Number(mileage),
            cost: cost ? Number(cost) : null,
            notes,
        };
        onSave(entry);
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={(e) => e.stopPropagation()}>
                <h2>Log Service</h2>

                <label> Service Type:</label>
                <select value={selectedType} onChange={(e) => setSelectedType((e.target.value))}>
                    {types.map((type) => (
                        <option key={type.id} value={type.id}>{type.label}</option>
                    ))}
                </select>

                <label> Date: </label>
                <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />

                <label> Miles at Service:</label>
                <input type = "number" value = {mileage} onChange = {(e) => setMileage(e.target.value)}/>

                <label> Cost (optional) </label>
                <input type = "number" value = {cost} onChange = {(e) => setCost(e.target.value)}/>

                <label> Notes (optional)</label>
                <input value={notes} onChange={(e) => setNotes(e.target.value)} />
                
                <div className = "modal-actions">
                    <button onClick={onClose}>Cancel</button>
                    <button onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}
  

export default LogServicePanel;