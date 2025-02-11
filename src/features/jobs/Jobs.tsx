import React, { useState } from 'react';

import {
    useGetAllJobsQuery,
    useAddJobMutation,
    useRemoveJobMutation
} from './jobsAPI'


const Jobs : React.FC = () => {
    const { data : jobs } = useGetAllJobsQuery()

    const [ addJob ] = useAddJobMutation()
    const [ removeJob ] = useRemoveJobMutation()

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [datePosted, setDatePosted] = useState<Date | undefined>(undefined);

    const handleAddJobApplication = () => {
        const newApplication = {
            id: '',
            title,
            company,
            status,
            description,
            location,
            datePosted: datePosted ? datePosted?.toUTCString() : '',
        };
        addJob(newApplication)
        clearForm()
    };

    const clearForm = () => {
        setTitle('');
        setCompany('');
        setStatus('');
        setDescription('');
        setLocation('');
        setDatePosted(undefined);
    }

    const handleRemoveJobApplication = (id : string) => {
        removeJob(id)
    }

    const formJobs = jobs ?? {}

    return (
        <div>            
            <table className="table">
                <tr>
                    <th>Job Title</th>
                    <th>Company</th>
                    <th>Status</th>
                    <th>Description</th>
                    <th>Location</th>
                    <th>Date Posted</th>
                    <th></th>
                </tr>
                <tr>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Job Title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Company"
                            value={company}
                            onChange={(e) => setCompany(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Status"
                            value={status}
                            onChange={(e) => setStatus(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="text"
                            placeholder="Location"
                            value={location}
                            onChange={(e) => setLocation(e.target.value)}
                        />
                    </td>
                    <td>
                        <input
                            className="input input-bordered"
                            type="date"
                            placeholder="Date Posted"
                            value={datePosted?.toLocaleDateString()}
                            onChange={(e) => {
                                console.log(e.target.value)
                                const date = new Date(e.target.value)
                                console.log(date)
                                setDatePosted(new Date(Date.parse(e.target.value)))
                            }}
                        />
                    </td>
                    <td>
                        <button 
                            className="btn btn-primary"
                            onClick={handleAddJobApplication}
                        >
                            Add Job Application
                        </button>
                    </td>
                </tr>
                {
                    Object.keys(formJobs).map(key => {
                        const application = formJobs[key]
                        return (
                            <tr className="border border-gray-200" key={key}>
                                <td>
                                    {application.title}
                                </td>
                                <td>
                                    {application.company}
                                </td>
                                <td>
                                    {application.status}
                                </td>
                                <td>
                                    { application.description }
                                </td>
                                <td>
                                    { application.location }
                                </td>
                                <td>
                                    { application.datePosted }
                                </td>
                                <td>
                                    <button 
                                        className="btn btn-secondary"
                                        onClick={() => handleRemoveJobApplication(application.id)}
                                    >
                                        Remove
                                    </button>
                                </td>
                            </tr>
                        )
                    })
                }
       
            </table>
        </div>
    );
};

export default Jobs;