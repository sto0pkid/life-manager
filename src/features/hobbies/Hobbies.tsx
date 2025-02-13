import React, { useState } from 'react';

import {
    useGetHobbiesQuery,
    useAddHobbyMutation,
    useRemoveHobbyMutation
} from './hobbiesAPI'


const Hobbies: React.FC = () => {
    const { data : hobbies } = useGetHobbiesQuery()

    const [ addHobby ] = useAddHobbyMutation()
    const [ removeHobby ] = useRemoveHobbyMutation()
    
    const [newHobby, setNewHobby] = useState<string>('');

    const handleAddHobby = () => {
        newHobby.trim()
        addHobby({id: '', name: newHobby})
    };

    const handleRemoveHobby = (hobbyToRemove: string) => {
        removeHobby(hobbyToRemove)
    };

    const formHobbies = hobbies ?? {}

    return (
        <div>
            <h2>Manage Your Hobbies</h2>
            
            <table className="table">
                <tbody>
                    <tr>
                        <td>
                            <input
                                className="input input-bordered"
                                type="text"
                                value={newHobby}
                                onChange={(e) => setNewHobby(e.target.value)}
                                placeholder="Add a new hobby"
                            />
                        </td>
                        <td>
                            <button className="btn btn-primary" onClick={handleAddHobby}>Add Hobby</button>
                        </td>
                    </tr>
                    {
                        Object.keys(formHobbies).map(id => {
                            const hobby = formHobbies[id]

                            return (
                                <tr className="border border-gray-200" key={id}>
                                    <td>
                                        {hobby.name}
                                    </td>
                                    <td>
                                        <button className="btn btn-secondary" onClick={() => handleRemoveHobby(id)}>Remove</button>
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

export default Hobbies;