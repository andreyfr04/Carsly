import React, { useState } from 'react';

function AddBillPanel({ car, onClose, onSave }) {
    const [billType, setBillType] = useState('fuel');
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
    const [amount, setAmount] = useState('');
    const [mileage, setMileage] = useState('');
    const [notes, setNotes] = useState('');

    function handleSave() {
        const entry = {
            id: Date.now(),
            carID: car?.id ?? car?.ID,
            billType,
            date,
            amount: Number(amount),
            mileage: mileage ? Number(mileage) : null,
            notes,
        };

        onSave(entry);
    }

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal add-bill-modal" onClick={(e) => e.stopPropagation()}>
                <h2 className="modal-title">Add a Bill</h2>

                <div className="modal-field">
                    <label>Type</label>
                    <select value={billType} onChange={(e) => setBillType(e.target.value)}>
                        <option value="fuel">Fuel</option>
                        <option value="insurance">Insurance</option>
                        <option value="Repairs">Repairs</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="modal-field">
                    <label>Date</label>
                    <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>

                <div className="modal-field">
                    <label>Amount</label>
                    <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="0.00" />
                </div>

                <div className="modal-field">
                    <label>Odometer (optional)</label>
                    <input type="number" value={mileage} onChange={(e) => setMileage(e.target.value)} />
                </div>

                <div className="modal-field">
                    <label>Notes (optional)</label>
                    <input value={notes} onChange={(e) => setNotes(e.target.value)} />
                </div>

                <div className="modal-actions">
                    <button type="button" className="modal-btn modal-btn--secondary" onClick={onClose}>Cancel</button>
                    <button type="button" className="modal-btn modal-btn--primary" onClick={handleSave}>Save</button>
                </div>
            </div>
        </div>
    );
}

export default AddBillPanel;