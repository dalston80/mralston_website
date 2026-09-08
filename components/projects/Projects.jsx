
const Projects = ({currentProjects}) => {
    const projectsWithContent = currentProjects.filter(project => project.children?.[0]?.text?.trim())

    if (projectsWithContent.length === 0) return null

    return (
        <div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950 mb-6">
                Current Projects
            </h2>
            <div className="flex flex-col gap-4">
                {projectsWithContent.map(project => {
                    return (
                        <div key={project._key} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                            <p className="text-blue-800">
                                {project.children[0].text}
                            </p>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default Projects