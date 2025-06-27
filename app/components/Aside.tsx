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
      className={`fixed inset-0 z-50 ${expanded ? 'block' : 'hidden'}`}
      role="dialog"
      data-type={type}
    >
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={close}
      />

      {/* Panel */}
      <div 
        className={`
          fixed top-4 bottom-4 right-4 w-full max-w-[432px] bg-black
          transform transition-transform duration-300 ease-in-out
          ${expanded ? 'translate-x-0' : 'translate-x-full'}
          overflow-y-auto
          clip-path-aside
          text-white
          shadow-[0_0_30px_rgba(255,255,255,0.1)]
        `}
      >
        {/* Header */}
        <header className="sticky top-0 z-10 flex items-center justify-between p-6 bg-black/80 backdrop-blur-sm">
          <h3 className="text-white font-oxanium text-2xl uppercase tracking-wider">{heading}</h3>
          <button 
            onClick={close} 
            className="text-white hover:text-neutral-400 transition-colors"
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
