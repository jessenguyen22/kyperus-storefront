import {useState, useEffect, useCallback} from 'react';
import {NavLink} from 'react-router';

interface MatrixNavLinkProps {
  to: string;
  children: string;
  onClick?: () => void;
  className?: string;
}

const GLITCH_CHARS = "!@#$%^&*()_+-=[]{}|;:,.<>?`~ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
const GLITCH_DURATION = 500;
const GLITCH_INTERVAL = 50;

export function MatrixNavLink({to, children, onClick, className = ''}: MatrixNavLinkProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [displayText, setDisplayText] = useState(children);

  const getRandomChar = useCallback(() => {
    return GLITCH_CHARS[Math.floor(Math.random() * GLITCH_CHARS.length)];
  }, []);

  const startGlitchEffect = useCallback(() => {
    let iterations = 0;
    const maxIterations = GLITCH_DURATION / GLITCH_INTERVAL;
    const originalText = children;
    
    const interval = setInterval(() => {
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        setDisplayText(originalText);
        return;
      }

      const progress = iterations / maxIterations;
      let newText = '';
      
      for (let i = 0; i < originalText.length; i++) {
        if (Math.random() < progress) {
          newText += originalText[i];
        } else {
          newText += getRandomChar();
        }
      }
      
      setDisplayText(newText);
    }, GLITCH_INTERVAL);

    return () => clearInterval(interval);
  }, [children, getRandomChar]);

  useEffect(() => {
    if (isHovering) {
      const cleanup = startGlitchEffect();
      return cleanup;
    }
  }, [isHovering, startGlitchEffect]);

  return (
    <NavLink
      to={to}
      onClick={onClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsHovering(false);
        setDisplayText(children);
      }}
      className={({isActive}) => `
        relative
        font-oxanium
        font-semibold
        uppercase
        tracking-wider
        py-2
        px-4
        transition-all
        duration-400
        ease-in-out
        ${isActive ? 'matrix-active text-white before:absolute before:inset-0 before:bg-white/10 before:clip-path-active' : 'text-neutral-400'}
        group
        inline-flex
        items-center
        min-w-[100px]
        ${className}
      `}
    >
      {/* Active state indicator */}
      <span className="absolute left-[-8px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-white opacity-0 transition-opacity duration-300 matrix-active-indicator" />
      
      {/* Background effect container */}
      <span className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Main background - light gray */}
        <span 
          className="
            absolute 
            inset-0 
            bg-neutral-100
            transform 
            origin-left 
            scale-x-0 
            transition-transform 
            duration-400 
            ease-in-out 
            group-hover:scale-x-100
          "
        />
        
        {/* Moving highlight */}
        <span 
          className="
            absolute 
            inset-0 
            bg-white/50
            transform 
            -translate-x-full 
            group-hover:translate-x-full 
            transition-transform 
            duration-700 
            ease-in-out
          "
        />
      </span>
      
      {/* Text content */}
      <span className="relative z-10 group-hover:text-black transition-colors duration-300">
        {displayText}
      </span>
    </NavLink>
  );
} 