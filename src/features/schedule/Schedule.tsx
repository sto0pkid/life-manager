import React from 'react';


const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
]

const ScheduleWeekly : React.FC = () => {
    return (
        <div className="w-full h-full">
            <div className="flex h-full w-full">
                {
                    daysOfWeek.map(day => {
                        return (
                            <div className="h-full flex-1 border border-gray-200" key={day}>
                                {day}
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

const Schedule: React.FC = () => {
    return (
        <div>
            <ScheduleWeekly></ScheduleWeekly>
        </div>
    );
};

export default Schedule;