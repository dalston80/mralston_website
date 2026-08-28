import { Disclosure, Transition } from "@headlessui/react"
import IconStyler from "../IconStyler"
import { FaChevronUp } from "react-icons/fa"

const ProjectHighlights = ({projects}) => {
  return (
    <div>
        <h3 className="text-md font-bold text-gray-100 pb-3">Project Highlights</h3>
        {projects.map(project => {
            return (
                <Disclosure key={project._key}>
                    {({open}) => (
                        <>
                            <Disclosure.Button className="flex w-full justify-between rounded-lg bg-blue-800 px-4 py-2 mb-3 text-left text-sm font-medium text-gray-100 hover:bg-blue-900 transition-all focus:outline-hidden focus-visible:ring-3 focus-visible:ring-gray-100/75">
                                <span>{project.content.name}</span>
                                <IconStyler className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-gray-100 transition-all`}>
                                    <FaChevronUp />
                                </IconStyler>
                            </Disclosure.Button>
                            <Transition
                                enter="transition duration-100 ease-out"
                                enterFrom="transform scale-y-0 opacity-0"
                                enterTo="transform scale-y-100 opacity-100"
                                leave="transition duration-100 ease-out"
                                leaveFrom="transform scale-y-100 opacity-100"
                                leaveTo="transform scale-y-0 opacity-0"
                            >
                                <Disclosure.Panel className="text-gray-100 px-3 mb-2">
                                    <p>{project.content.description}</p>
                                </Disclosure.Panel>
                            </Transition>
                            
                        </>
                    )}
                </Disclosure>
            )
        })}
    </div>
  )
}

export default ProjectHighlights