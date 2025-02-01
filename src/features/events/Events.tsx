import React from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addEvent, removeEvent } from './eventsSlice'  

const Events: React.FC = () => {
    const dispatch = useDispatch()

    const events = useSelector((state : RootState) => state.events)
    //const [events, setEvents] = React.useState<string[]>([]);

    const handleAddEvent = (event: string) => {
        dispatch(addEvent(event))
    };

    const handleRemoveEvent = (event : string) => {
        dispatch(removeEvent(event))
    }

    return (
        <div>
            <h2>Upcoming Events</h2>
            <ul>
                {events.map((event : string, index : number) => (
                    <li key={index}>
                        {event}
                        <button onClick={() => handleRemoveEvent(event)}>Remove</button>
                    </li>
                ))}
            </ul>
            <button onClick={() => handleAddEvent(prompt('Enter event name:') || '')}>
                Add Event
            </button>
        </div>
    );
};

export default Events;