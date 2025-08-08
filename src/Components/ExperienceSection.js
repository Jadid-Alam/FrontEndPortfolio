import { motion } from "framer-motion";

const ExperienceSection = ({ 
  experience, 
  darkMode, 
  fading, 
  borderColor,
  delayedDarkModeLeft,
  delayedDarkModeRight
}) => {
  const { id, title, paragraphs, alignment } = experience;
  
  return (
    <div 
      id={id} 
      className={`flex fade-in ${
        fading[id] 
          ? 'opacity-100 transform translate-x-0 transition-all duration-1000' 
          : alignment === 'left' 
            ? 'opacity-0 transform -translate-x-full transition-all duration-1000'
            : 'opacity-0 transform translate-x-full transition-all duration-1000'
      }`}
    >
      {alignment === 'left' ? (
        <>
          <div className={`py-4 lg:py-8 exp-left ${borderColor}`}>
            <h3 
              id={`title${id.slice(-1)}`} 
              className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 font-bold
                fade-in duration-1000 ease-in-out ${fading[`title${id.slice(-1)}`] ? 'opacity-100' : 'opacity-0'}
                ${darkMode ? 'text-yellow-100' : 'navLink'}`}
            >
              {title}
            </h3>
            
            {paragraphs.map((paragraph, index) => (
              <p 
                key={paragraph.id}
                id={paragraph.id} 
                className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                  fade-in duration-${index === 0 ? '1000' : '500'} ease-in-out ${
                    fading[paragraph.id] ? 'opacity-100' : 'opacity-0'
                  }
                  ${darkMode ? 'text-yellow-100' : 'navLink'}`}
              >
                {paragraph.content}
              </p>
            ))}
          </div>
          <div className={`py-4 lg:py-8 ${delayedDarkModeLeft}`}></div>
        </>
      ) : (
        <>
          <div className={`py-4 lg:py-8 ${delayedDarkModeRight}`}></div>
          <div className={`py-4 lg:py-8 exp-right ${borderColor}`}>
            <h3 
              id={`title${id.slice(-1)}`} 
              className={`p-1 py-1 text-mh3 lg:text-h3 lg:p-3 lg:py-2 font-bold
                fade-in duration-1000 ease-in-out ${fading[`title${id.slice(-1)}`] ? 'opacity-100' : 'opacity-0'}
                ${darkMode ? 'text-yellow-100' : 'navLink'}`}
            >
              {title}
            </h3>
            
            {paragraphs.map((paragraph, index) => (
              <p 
                key={paragraph.id}
                id={paragraph.id} 
                className={`p-1 py-1 lg:p-3 lg:py-2 text-mnormal lg:text-normal
                  fade-in duration-${index === 0 ? '1000' : '500'} ease-in-out ${
                    fading[paragraph.id] ? 'opacity-100' : 'opacity-0'
                  }
                  ${darkMode ? 'text-yellow-100' : 'navLink'}`}
              >
                {paragraph.content}
              </p>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default ExperienceSection;