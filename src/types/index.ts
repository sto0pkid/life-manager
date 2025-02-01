export type Budget = {
    id: string;
    amount: number;
    category: string;
    date: string;
};

export type Bill = {
    id: string;
    amount: number;
    dueDate: string;
    paid: boolean;
};

export type Revenue = {
    id: string;
    amount: number;
    source: string;
    date: string;
};

export type PlanningTask = {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    completed: boolean;
};

export type HealthMetric = {
    id: string;
    type: string;
    value: number;
    date: string;
};

export type FitnessActivity = {
    id: string;
    type: string;
    duration: number; // in minutes
    date: string;
};

export type Hobby = {
    id: string;
    name: string;
    description: string;
};

export type TravelPlan = {
    id: string;
    destination: string;
    startDate: string;
    endDate: string;
    itinerary: string[];
};

export type Event = {
    id: string;
    title: string;
    date: string;
    location: string;
};

export type Reminder = {
    id: string;
    message: string;
    date: string;
};

export type ScheduleItem = {
    id: string;
    title: string;
    startTime: string;
    endTime: string;
};

export type Projection = {
    id: string;
    type: string;
    value: number;
    date: string;
};

export type JobLead = {
    id: string;
    company: string;
    position: string;
    status: string;
};

export type JobApplication = {
    id: string;
    company: string;
    position: string;
    dateApplied: string;
    status: string;
};

export type Meal = {
    id: string;
    name: string;
    ingredients: string[];
    instructions: string;
};