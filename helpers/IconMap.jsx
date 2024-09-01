import { SiTypescript } from "react-icons/si";
import { GrMysql } from "react-icons/gr";
import { FaAngular, FaCss3, FaFacebook, FaGithub, FaHtml5, FaInstagram, FaJsSquare, FaLaravel, FaLinkedin, FaNodeJs, FaPhp, FaReact } from "react-icons/fa";

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
    },
    'github': {
        icon: <FaGithub />,
        color: 'text-gray-500',
    },
    'linkedin': {
        icon: <FaLinkedin />,
        color: 'text-gray-500',
    },
    'facebook': {
        icon: <FaFacebook />,
        color: 'text-gray-500',
    },
    'instagram': {
        icon: <FaInstagram />,
        color: 'text-gray-500',
    }
}