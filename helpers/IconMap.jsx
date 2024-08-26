import { SiTypescript } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { FaAngular, FaCss3, FaHtml5, FaJsSquare, FaLaravel, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";

export const IconMap = {
    'HTML': {
        icon: <FaHtml5 />,
        color: 'text-orange-500',
    },
    'CSS': {
        icon: <FaCss3 />,
        color: 'text-blue-500',
    },
    'JavaScript': {
        icon: <FaJsSquare />,
        color: 'text-yellow-500',
    },
    'TypeScript': {
        icon: <SiTypescript />,
        color: 'text-blue-500',
    },
    'PHP': {
        icon: <FaPhp />,
        color: 'text-purple-500',
    },
    'MySQL': {
        icon: <GrMysql />,
        color: 'text-yellow-500',
    },
    'NodeJS': {
        icon: <FaNodeJs />,
        color: 'text-green-500',
    },
    'React': {
        icon: <FaReact />,
        color: 'text-blue-300',
    },
    'Angular': {
        icon: <FaAngular />,
        color: 'text-red-500',
    },
    'Laravel': {
        icon: <FaLaravel />,
        color: 'text-red-500',
    }
}