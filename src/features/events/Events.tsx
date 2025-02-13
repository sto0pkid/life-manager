import React, {useState} from 'react';
import {
    useGetAllEventsQuery,
    useAddEventMutation,
    useRemoveEventMutation
} from './eventsAPI'


const Events: React.FC = () => {
    const { data: events } = useGetAllEventsQuery()

    const [ addEvent ] = useAddEventMutation()
    const [ removeEvent ] = useRemoveEventMutation()

    const [ newEvent, setNewEvent ] = useState({name: ''})


    const handleAddEvent = () => {
        addEvent({...newEvent, id: ''})
    };

    const handleRemoveEvent = (id : string) => {
        removeEvent(id)
    }

    const formEvents = events ?? {}

    return (
        <div>
            <table>
                <thead>
                    <tr>
                        <th>Event Name</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                className="input input-bordered"
                                type="text"
                                placeholder={"Event name"}
                                onChange={(e) => {setNewEvent({...newEvent, name: e.target.value})}}
                            />
                        </td>
                        <td>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddEvent}
                            >
                                Add Event
                            </button>
                        </td>
                    </tr>
                    {
                        Object.keys(formEvents).map(id => {
                            //(event : string, index : number) => (
                            const event = formEvents[id]
                            return (
                                <tr className="border border-gray-200" key={id}>
                                    <td>
                                        {event.name}
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-secondary"
                                            onClick={() => handleRemoveEvent(id)}
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

export default Events;