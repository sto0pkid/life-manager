import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addJobLead, removeJobLead } from './jobLeadsSlice.ts'
import { uuidv4 } from '../../uuid';

const JobLeads: React.FC = () => {
    const dispatch = useDispatch()
    const jobLeads = useSelector((state : RootState) => state.jobLeads)

    const [newLead, setNewLead] = useState({ title: '', company: '', status: 'Open' });

    const handleAddJobLead = () => {
        dispatch(addJobLead({
            ...newLead,
            id: uuidv4()
        }))
    };

    const handleRemoveJobLead = (id : string) => {
        dispatch(removeJobLead(id));
    }

    return (
        <div>
            <h2>Job Leads</h2>
            <input
                type="text"
                placeholder="Job Title"
                value={newLead.title}
                onChange={(e) => setNewLead({ ...newLead, title: e.target.value })}
            />
            <input
                type="text"
                placeholder="Company"
                value={newLead.company}
                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
            />
            <button onClick={handleAddJobLead}>Add Job Lead</button>
            <ul>
                {Object.keys(jobLeads).map(key => {
                    const lead = jobLeads[key];
                    return (
                        <li key={lead.id}>
                            {lead.title} at {lead.company} - Status: {lead.status}
                            <button onClick={() => {handleRemoveJobLead(lead.id)}}>Remove</button>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
};

export default JobLeads;