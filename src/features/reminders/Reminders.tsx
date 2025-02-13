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
            <table>
                <thead>
                    <tr>
                        <th>Reminder name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                className="input input-bordered"
                                type="text"
                                value={newReminder}
                                onChange={(e) => setNewReminder(e.target.value)}
                                placeholder="Add a new reminder"
                            />
                        </td>
                        <td>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddReminder}
                            >
                                Add
                            </button>
                        </td>
                    </tr>
                    {
                        Object.keys(formReminders).map(id => {
                            const reminder = formReminders[id]
                            return (
                                <tr className="border border-gray-200" key={id}>
                                    <td>
                                        {reminder.name}
                                    </td>
                                    <td>
                                        <button 
                                            className="btn btn-secondary"
                                            onClick={() => handleRemoveReminder(reminder.id)}
                                        >
                                            Remove
                                        </button>
                                    </td>
                                </tr>  
                            )
                        })
                    }
                </tbody>
            </table>
        </div>
    );
};

export default Reminders;