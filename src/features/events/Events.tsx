import React from 'react';
//import { useDispatch, useSelector } from 'react-redux'
//import { RootState } from '../../store'
//import { addEvent, removeEvent } from './eventsSlice'  
import {
    useGetAllEventsQuery,
    useAddEventMutation,
    useRemoveEventMutation
} from './eventsAPI'


const Events: React.FC = () => {
    const { data: events } = useGetAllEventsQuery()

    const [ addEvent ] = useAddEventMutation()
    const [ removeEvent ] = useRemoveEventMutation()

    //const dispatch = useDispatch()

    //const events = useSelector((state : RootState) => state.events)
    //const [events, setEvents] = React.useState<string[]>([]);

    const handleAddEvent = (name: string) => {
        //dispatch(addEvent(event))
        addEvent({id: '', name})
    };

    const handleRemoveEvent = (id : string) => {
        //dispatch(removeEvent(event))
        removeEvent(id)
    }

    const formEvents = events ?? {}

    return (
        <div>
            <h2>Upcoming Events</h2>
            <ul>
                {
                    Object.keys(formEvents).map(id => {
                        //(event : string, index : number) => (
                        const event = formEvents[id]
                        return (
                            <li key={id}>
                                {event.name}
                                <button onClick={() => handleRemoveEvent(id)}>Remove</button>
                            </li>
                        )
                    })
                }
            </ul>
            <button onClick={() => handleAddEvent(prompt('Enter event name:') || '')}>
                Add Event
            </button>
        </div>
    );
};

export default Events;