'use client'

import ProjectHighlights from "./ProjectHighlights"

const ExperienceDisplay = ({experienceData}) => {

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 justify-evenly items-center mb-10">
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950 md:col-span-2">
                My Work Experience
            </h1>
            {experienceData.map(data => {
                return (
                    <div key={data._key} className={`bg-blue-950 rounded-md p-4 ${data.currentPosition ? 'md:col-span-2' : 'col-span-1'}`}>
                        <h2 className={`text-2xl font-bold ${data.currentPosition ? 'text-teal-400' : 'text-gray-100'}`}>{data.company}</h2>
                        <div className="flex justify-between items-center pb-5">
                            <span className="text-md font-bold text-yellow-500">{data.position}</span>
                            <span className="text-md font-bold text-yellow-500">{data.startDate} - {data.currentPosition ? 'Present' : data.endDate}</span>
                        </div>
                        <p className="text-gray-100 pb-5 max-w-prose">{data.description}</p>
                        {data.projects && data.projects.length > 0 ? <ProjectHighlights projects={data.projects }/> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default ExperienceDisplay