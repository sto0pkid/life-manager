import Home from './features/home/Home'
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
import JobLeads from './features/jobLeads/JobLeads';
import Jobs from './features/jobs/Jobs';
import Meals from './features/meals/Meals';
import React from 'react';
import GraphView from './features/graph/Graph';


export const routes: {
    [key:string]: {
        name: string,
        component: React.FC
    }
}= {
    "/": {
        name: "Home",
        component: Home
    },
    "/budget": {
        name: "Budget",
        component: Budget
    },
    "/bills": {
        name: "Bills",
        component: Bills
    },
    "/revenues": {
        name: "Revenues",
        component: Revenues
    },
    "/planning": {
        name: "Planning",
        component: Planning
    },
    "/health": {
        name: "Health",
        component: Health
    },
    "/fitness": {
        name: "Fitness",
        component: Fitness
    },
    "/hobbies": {
        name: "Hobbies",
        component: Hobbies
    },
    "/travel": {
        name: "Travel",
        component: Travel
    },
    "/events": {
        name: "Events",
        component: Events
    },
    "/reminders": {
        name: "Reminders",
        component: Reminders
    },
    "/schedule": {
        name: "Schedule",
        component: Schedule
    },
    "/jobLeads": {
        name: "Job Leads",
        component: JobLeads
    },
    "/jobs": {
        name: "Jobs",
        component: Jobs
    },
    "/meals": {
        name: "Meals",
        component: Meals
    },
    "/graph": {
        name: "Graph",
        component: () => {return GraphView({node: 'start', view: 'default'})}
    }
}

export const routeOrder = [
    "/bills",
    "/budget",
    "/revenues",
    "/planning",
    "/health",
    "/fitness",
    "/hobbies",
    "/travel",
    "/events",
    "/reminders",
    "/schedule",
    "/jobLeads",
    "/jobs",
    "/meals",
]