import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../store'
import { addJob, removeJob} from './jobsSlice.ts'
import { uuidv4 } from '../../uuid'


const Jobs : React.FC = () => {
    const dispatch = useDispatch()

    const jobApplications = useSelector((state : RootState) => state.jobs)

    const [title, setTitle] = useState('');
    const [company, setCompany] = useState('');
    const [status, setStatus] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [datePosted, setDatePosted] = useState<Date | undefined>(undefined);

    const handleAddJobApplication = () => {
        const newApplication = {
            id: uuidv4(),
            title,
            company,
            status,
            description,
            location,
            datePosted,
        };

        dispatch(addJob(newApplication))
        setTitle('');
        setCompany('');
        setStatus('');
        setDescription('');
        setLocation('');
        setDatePosted(undefined);
    };

    const handleRemoveJobApplication = (id : string) => {
        dispatch(removeJob(id))
    }

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
                onChange={(e) => setDatePosted(new Date(e.target.value))}
            />
            <button onClick={handleAddJobApplication}>Add Job Application</button>
            <ul>
                {
                    Object.keys(jobApplications).map(key => {
                        const application = jobApplications[key]
                        return (
                            <li key={key}>
                                <div>
                                    {application.title} at {application.company} - Status: {application.status}
                                    Description: {application.description}
                                    Location: {application.location}
                                    Date Posted: {application.datePosted?.toLocaleDateString()}
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