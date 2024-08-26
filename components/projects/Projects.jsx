
const Projects = ({currentProjects}) => {
  return (
    <div>
        <h1 className="text-3xl font-bold tracking-tight sm:text-5xl mb-6 lg:leading-[3.7rem] leading-tight text-blue-950">
            Current Projects
        </h1>
        {currentProjects.map(project => {
            return (
                <p key={project._key}>
                    {project.children[0].text ? project.children[0].text : (<br/>)}
                </p>
            )
        })}
    </div>
  )
}

export default Projects