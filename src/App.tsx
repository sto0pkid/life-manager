import React from 'react';
import Budget from './features/budget/Budget';
import Bills from './features/bills/Bills';
import Revenues from './features/revenues/Revenues';
import Planning from './features/planning/Planning';
import Health from './features/health/Health';
import Fitness from './features/fitness/Fitness';
import Hobbies from './features/hobbies/Hobbies';
import Travel from './features/travel/Travel';
import Events from './features/events/Events';
import Reminders from './features/reminders/Reminders';
import Schedule from './features/schedule/Schedule';
import Projection from './features/projection/Projection';
import JobLeads from './features/jobLeads/JobLeads';
import Jobs from './features/jobs/Jobs';
import Meals from './features/meals/Meals';
import Counter from './features/counter/Counter';


const App: React.FC = () => {
    return (
        <div>
            <h1>Life Management System</h1>
            <Counter />
            <Budget />
            <Bills />
            <Revenues />
            <Planning />
            <Health />
            <Fitness />
            <Hobbies />
            <Travel />
            <Events />
            <Reminders />
            <Schedule />
            <Projection />
            <JobLeads />
            <Jobs />
            <Meals />
        </div>
    );
};

export default App;