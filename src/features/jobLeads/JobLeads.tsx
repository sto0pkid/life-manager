import React, { useState } from 'react';
import {
    useGetAllJobLeadsQuery,
    useAddJobLeadMutation,
    useRemoveJobLeadMutation
} from './jobLeadsAPI'

const JobLeads: React.FC = () => {
    const { data: jobLeads } = useGetAllJobLeadsQuery()
    
    const [ addJobLead ] = useAddJobLeadMutation()
    const [ removeJobLead ] = useRemoveJobLeadMutation()

    const [newLead, setNewLead] = useState({ title: '', company: '', status: 'Open' });

    const handleAddJobLead = () => {
        addJobLead({
            ...newLead,
            id: ''
        })
    };

    const handleRemoveJobLead = (id : string) => {
        removeJobLead(id)
    }

    const formJobLeads = jobLeads ?? {}

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
                {Object.keys(formJobLeads).map(key => {
                    const lead = formJobLeads[key];
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