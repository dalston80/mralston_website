
const Projects = ({currentProjects}) => {
  return (
    <div>
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-blue-950 mb-6">
            Current Projects
        </h1>
        <div className="flex flex-col gap-4">
            {currentProjects.map(project => {
                return (
                    <div key={project._key} className="rounded-2xl border border-blue-100 bg-white p-6 shadow-sm hover:shadow-lg transition-all duration-300">
                        <p className="text-blue-800">
                            {project.children[0].text ? project.children[0].text : (<br/>)}
                        </p>
                    </div>
                )
            })}
        </div>
    </div>
  )
}

export default Projects