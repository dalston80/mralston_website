'use client'

import ProjectHighlights from "./ProjectHighlights"

const formatDate = (dateString) => {
    if (!dateString) return ''
    const [year, month] = dateString.split('-')
    if (!month) return year
    const date = new Date(Number(year), Number(month) - 1)
    return date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

const ExperienceDisplay = ({experienceData}) => {

    return (
        <div className="flex flex-col gap-8">
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950">
                My Work Experience
            </h2>
            {experienceData.map(data => {
                return (
                    <div key={data._key} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                        <div className="flex flex-wrap items-center gap-3 pb-1">
                            <h3 className="text-2xl font-bold text-blue-950">{data.company}</h3>
                            {data.currentPosition && (
                                <span className="rounded-full bg-yellow-500 px-3 py-1 text-xs font-bold text-blue-950">Current</span>
                            )}
                        </div>
                        <div className="flex flex-wrap justify-between gap-2 items-center pb-5">
                            <span className="text-md font-semibold text-blue-800">{data.position}</span>
                            <span className="text-md font-semibold text-blue-800">{formatDate(data.startDate)} - {data.currentPosition ? 'Present' : formatDate(data.endDate)}</span>
                        </div>
                        <p className="text-blue-700 pb-5 max-w-prose">{data.description}</p>
                        {data.projects && data.projects.length > 0 ? <ProjectHighlights projects={data.projects }/> : null}
                    </div>
                )
            })}
        </div>
    )
}

export default ExperienceDisplay