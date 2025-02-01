import React, { useState } from 'react';

const Reminders: React.FC = () => {
    const [reminders, setReminders] = useState<string[]>([]);
    const [newReminder, setNewReminder] = useState<string>('');

    const addReminder = () => {
        if (newReminder.trim()) {
            setReminders([...reminders, newReminder]);
            setNewReminder('');
        }
    };

    const removeReminder = (index: number) => {
        const updatedReminders = reminders.filter((_, i) => i !== index);
        setReminders(updatedReminders);
    };

    return (
        <div>
            <h2>Reminders</h2>
            <input
                type="text"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder="Add a new reminder"
            />
            <button onClick={addReminder}>Add</button>
            <ul>
                {reminders.map((reminder, index) => (
                    <li key={index}>
                        {reminder}
                        <button onClick={() => removeReminder(index)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reminders;