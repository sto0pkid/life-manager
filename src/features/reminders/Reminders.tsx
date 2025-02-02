import React, { useState } from 'react';
import {
    useGetAllRemindersQuery,
    useAddReminderMutation,
    useRemoveReminderMutation
} from './remindersAPI'

const Reminders: React.FC = () => {
    const { data: reminders } = useGetAllRemindersQuery()

    const [ addReminder ] = useAddReminderMutation()
    const [ removeReminder ] = useRemoveReminderMutation()
    
    const [newReminder, setNewReminder] = useState<string>('');

    const handleAddReminder = () => {
        if (newReminder.trim()) {
            addReminder({id: '', name: newReminder})
        }
    };

    const handleRemoveReminder = (id : string) => {
        removeReminder(id)
    };

    const formReminders = reminders ?? {}

    return (
        <div>
            <h2>Reminders</h2>
            <input
                type="text"
                value={newReminder}
                onChange={(e) => setNewReminder(e.target.value)}
                placeholder="Add a new reminder"
            />
            <button onClick={handleAddReminder}>Add</button>
            <ul>
                {
                    Object.keys(formReminders).map(id => {
                        const reminder = formReminders[id]
                        return (
                            <li key={id}>
                                {reminder.name}
                                <button onClick={() => handleRemoveReminder(reminder.id)}>Remove</button>
                            </li>  
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default Reminders;