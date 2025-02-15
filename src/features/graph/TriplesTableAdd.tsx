import React, { useState } from "react";
import { Triple } from '../../lib/types'

const TriplesTableAdd : React.FC<{
    subject: string,
    subjectDisabled?: boolean,
    relation: string,
    relationDisabled?: boolean,
    object: string,
    objectDisabled?: boolean,
    onSubmit: (t : Triple) => void
}> = ({
    subject,
    subjectDisabled,
    relation,
    relationDisabled,
    object,
    objectDisabled,
    onSubmit
}) => {
    const [ newSubject, setNewSubject ] = useState(subject)
    const [ newRelation, setNewRelation ] = useState(relation)
    const [ newObject, setNewObject ] = useState(object)
    

    return (
        <table className="">
            <tbody>
                <tr>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Subject"
                            disabled={subjectDisabled}
                            onChange={!subjectDisabled ? (e) => setNewSubject(e.target.value) : undefined}
                            value={newSubject}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Relation"
                            disabled={relationDisabled}
                            onChange={!relationDisabled ? (e) => setNewRelation(e.target.value) : undefined}
                            value={newRelation}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Object"
                            disabled={objectDisabled}
                            onChange={!objectDisabled ? (e) => setNewObject(e.target.value) : undefined}
                            value={newObject}
                        />
                    </td>
                    <td>
                        <button
                            className="btn btn-primary"
                            onClick={ () => onSubmit([newSubject, newRelation, newObject]) }
                        >
                            Add triple
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    )
}

export default TriplesTableAdd