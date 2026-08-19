import React, {useState} from 'react';
import './AddCarPanel.css'


function SetBudgetPanel({existing, onClose, onSave}) {
    const [period, setPeriod] = useState(existing ? existing.period : 'monthly');
    const [amount, setAmount] = useState(existing ? existing.amount : '' );

    function handleSave(){
        onSave({ period, amount : Number(amount)});
    }

    return (
        <div className = "modal-overlay" onClick = {onClose}>
          <div className = "modal" onClick = {(e) => e.stopPropagation()}>
            <h2> Set Budget </h2>

            <label> Period </label>
            <select value = {period} onChange= {(e) => setPeriod(e.target.value)}>
                <option value = "monthly"> Monthly</option>
                <option value = "Yearly"> Yearly </option>
            </select>

            <label> Budget Amount (£) </label>
            <input type = "number" value={amount} onChange = {(e) => setAmount(e.target.value)} placeholder = "0.00" />

            <div className = "modal-actions">
                <button onClick = {onClose}> Cancel </button>
                <button onClick = {handleSave}> Save </button>
            </div>
           </div>  
        </div>
    );

}


export default SetBudgetPanel;


