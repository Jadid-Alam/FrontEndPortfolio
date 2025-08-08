import { motion } from "framer-motion";
import '../index.css';

const ProjectButton = ({ 
  project, 
  darkMode, 
  clicked, 
  fading, 
  toggleClick,
  projStyle,
  imgDevIcn,
  imageStyle,
  pStyle,
  defFade
}) => {
  return (
    <button 
      id={project.id} 
      className={`${projStyle}
        ${darkMode ? ' border-gray-950 ' : ' border-yellow-50 '}
        ${darkMode ? 'hover:border-purple-900' : 'hover:border-b-purple-300'}`} 
      onClick={toggleClick}
    >
      <div className={`z-10`}>
        <h3 
          id={`title${project.id}`} 
          className={`p-1 pt-10 text-mh3 lg:text-h3 lg:p-3 lg:pt-16 text-left
            ${defFade}  ${fading[`title${project.id}`] ? 'opacity-100' : 'opacity-0'}
            ${darkMode ? 'text-yellow-100' : 'navLink'}`}
        >
          {project.title}
        </h3>
        <div className={imgDevIcn}>
          {project.images.map((img, index) => (
            <img key={index} src={img} className={imageStyle} />
          ))}
        </div>
        <p 
          id={`descipton${project.id}`} 
          className={`p-1 py-2 lg:p-3 lg:py-4 text-left
            ${defFade}  ${fading[`descipton${project.id}`] ? 'opacity-100' : 'opacity-0'}
            ${darkMode ? 'text-yellow-100' : 'navLink'}`}
        >
          {project.description}
        </p>
        <small 
          id={`small${project.id}`} 
          className={`text-small
            ${defFade}  ${fading[`small${project.id}`] ? 'opacity-100' : 'opacity-0'}
            ${clicked[project.id] ? 'hidden' : '' }
            ${darkMode ? 'text-yellow-100' : 'navLink'}`}
        >
          Click to View More Detail
        </small>
      </div>
      <motion.div
        initial={{ height: '0%', opacity: 0 }}
        animate={{ 
          height: clicked[project.id] ? ['0%','auto'] : ['auto',"0"], 
          opacity: clicked[project.id] ? [0,1] : [1,0] 
        }}
        transition={{ duration: project.transitionDuration, ease: "easeInOut" }}
        className={`overflow-hidden`}
      >
        <figure 
          id={`img${project.id}`} 
          className={`p-1 py-5 lg:p-3 lg:py-10 z-10 ${clicked[project.id] ? 'block' : 'hidden' } 
            ${fading[`img${project.id}`] ? 'opacity-100' : 'opacity-0'}
            ${defFade}  ${darkMode ? 'text-yellow-100' : 'navLink'}`}
        >
          <img 
            src={project.detailImage.src} 
            alt={project.detailImage.alt} 
            style={{ width: '500px', height: 'auto' }} 
          />
          <figcaption className='text-mimgcap lg:text-imgcap text-left text-gray-600'>
            {project.detailImage.caption}
          </figcaption>
        </figure>
        {project.paragraphs.map((paragraph, index) => {
          const paragraphId = `p${project.id.replace('b', '')}${index + 1}`;
          return (
            <p 
              key={index}
              id={paragraphId} 
              className={`${pStyle} 
                ${defFade}  ${clicked[project.id] ? 'block' : 'hidden' } 
                ${fading[paragraphId] ? 'opacity-100' : 'opacity-0'}
                ${darkMode ? 'text-yellow-100' : 'navLink'}`}
            >
              {paragraph}
            </p>
          );
        })}
      </motion.div>
    </button>
  );
};

export default ProjectButton