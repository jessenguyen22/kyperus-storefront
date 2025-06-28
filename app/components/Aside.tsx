import {
  createContext,
  type ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import {X} from 'lucide-react';

type AsideType = 'search' | 'cart' | 'mobile' | 'mobile-menu' | 'closed';
type AsideContextValue = {
  type: AsideType;
  open: (mode: AsideType) => void;
  close: () => void;
};

/**
 * A side bar component with Overlay
 * @example
 * ```jsx
 * <Aside type="search" heading="SEARCH">
 *  <input type="search" />
 *  ...
 * </Aside>
 * ```
 */
export function Aside({
  children,
  heading,
  type,
}: {
  children?: React.ReactNode;
  type: AsideType;
  heading: React.ReactNode;
}) {
  const {type: activeType, close} = useAside();
  const expanded = type === activeType;
  
  // Determine positioning and spacing based on aside type
  const isMobileMenu = type === 'mobile-menu' || type === 'mobile';
  const positionClasses = isMobileMenu
    ? 'left-0 right-auto mr-6'  // For mobile menu: stick to left, margin on right
    : 'right-0 left-auto ml-6'; // For cart/search: stick to right, margin on left
  const transformClasses = isMobileMenu
    ? expanded ? 'translate-x-0 opacity-100' : '-translate-x-full opacity-0'
    : expanded ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0';

  useEffect(() => {
    const abortController = new AbortController();

    if (expanded) {
      document.addEventListener(
        'keydown',
        function handler(event: KeyboardEvent) {
          if (event.key === 'Escape') {
            close();
          }
        },
        {signal: abortController.signal},
      );
    }
    return () => abortController.abort();
  }, [close, expanded]);

  return (
    <div
      aria-modal
      className={`
        fixed inset-0 z-50 transition-all duration-300 ease-in-out
        ${expanded ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}
      `}
      role="dialog"
      data-type={type}
    >
      {/* Backdrop */}
      <button 
        className={`
          absolute inset-0 bg-black/60 backdrop-blur-sm 
          transition-opacity duration-300 ease-in-out
          ${expanded ? 'opacity-100' : 'opacity-0'}
        `}
        onClick={close}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === 'Space') {
            close();
          }
        }}
        aria-label="Close panel"
      />

      {/* Panel */}
      <div 
        className={`
          fixed top-6 bottom-6 ${positionClasses} w-[calc(100%-1.5rem)] sm:w-[480px] bg-black
          transform transition-all duration-300 ease-in-out
          ${transformClasses}
          overflow-y-auto
          clip-path-aside
          text-white
          shadow-[0_0_30px_rgba(255,255,255,0.1)]
          cyberpunk-scrollbar
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-6 bg-black/80 backdrop-blur-sm">
          <h3 className="text-white font-oxanium text-2xl uppercase tracking-wider">{heading}</h3>
          <button 
            onClick={close} 
            className="text-white hover:text-neutral-400 transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-6 h-6" />
          </button>
        </header>

        {/* Content */}
        <main className="relative text-white">
          {children}
        </main>
      </div>
    </div>
  );
}

const AsideContext = createContext<AsideContextValue | null>(null);

Aside.Provider = function AsideProvider({children}: {children: ReactNode}) {
  const [type, setType] = useState<AsideType>('closed');

  return (
    <AsideContext.Provider
      value={{
        type,
        open: setType,
        close: () => setType('closed'),
      }}
    >
      {children}
    </AsideContext.Provider>
  );
};

export function useAside() {
  const aside = useContext(AsideContext);
  if (!aside) {
    throw new Error('useAside must be used within an AsideProvider');
  }
  return aside;
}
