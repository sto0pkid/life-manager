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
            <h2>Job Applications</h2>
            <input
                type="text"
                placeholder="Job Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />
            <input
                type="text"
                placeholder="Company"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
            />
            <input
                type="text"
                placeholder="Status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
            />
            <input
                type="text"
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />
            <input
                type="text"
                placeholder="Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
            />
            <input
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
            <button onClick={handleAddJobApplication}>Add Job Application</button>
            <ul>
                {
                    Object.keys(formJobs).map(key => {
                        const application = formJobs[key]
                        return (
                            <li key={key}>
                                <div>
                                    {application.title} at {application.company} - Status: {application.status}
                                    Description: { application.description }
                                    Location: { application.location }
                                    Date Posted: { application.datePosted }
                                    <button onClick={() => handleRemoveJobApplication(application.id)}>Remove</button>
                                </div>
                            </li>
                        )
                    })
                }
       
            </ul>
        </div>
    );
};

export default Jobs;