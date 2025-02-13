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
            
            <table className="table">
                <thead>
                    <tr>
                        <th>Job Title</th>
                        <th>Company</th>
                        <th>Status</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>
                            <input
                                type="text"
                                placeholder="Job Title"
                                value={newLead.title}
                                onChange={(e) => setNewLead({ ...newLead, title: e.target.value })}
                            />
                        </td>
                        <td>
                            <input
                                type="text"
                                placeholder="Company"
                                value={newLead.company}
                                onChange={(e) => setNewLead({ ...newLead, company: e.target.value })}
                            />
                        </td>
                        <td></td>
                        <td>
                            <button
                                className="btn btn-primary"
                                onClick={handleAddJobLead}
                            >
                                Add Job Lead
                            </button>
                        </td>
                    </tr>
                    {Object.keys(formJobLeads).map(key => {
                        const lead = formJobLeads[key];
                        return (
                            <tr className="border border-gray-200" key={lead.id}>
                                <td>
                                    {lead.title}
                                </td>
                                <td>
                                    {lead.company}
                                </td>
                                <td>
                                    {lead.status}
                                </td>
                                <td>
                                    <button
                                        className="btn btn-secondary"
                                        onClick={() => {handleRemoveJobLead(lead.id)}}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
    );
};

export default JobLeads;