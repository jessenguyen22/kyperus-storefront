import {useAside} from './Aside';
import {MatrixNavLink} from './MatrixNavLink';
import {X} from 'lucide-react';
import type {HeaderQuery} from 'storefrontapi.generated';
import {Aside} from './Aside';

interface MobileMenuProps {
  menu: HeaderQuery['menu'];
  publicStoreDomain: string;
  primaryDomainUrl: string;
}

export function MobileMenu({menu, publicStoreDomain, primaryDomainUrl}: MobileMenuProps) {
  const {close} = useAside();

  // Function to process URL
  const processUrl = (url: string) => {
    if (!url) return '';
    return url.includes('myshopify.com') ||
      url.includes(publicStoreDomain) ||
      url.includes(primaryDomainUrl)
      ? new URL(url).pathname
      : url;
  };

  return (
    <Aside
      type="mobile-menu"
      heading={
        <span className="text-white font-oxanium text-2xl uppercase tracking-wider">
          Menu
        </span>
      }
    >
      <nav className="p-6 flex flex-col space-y-6">
        {menu?.items.map((item) => {
          if (!item.url) return null;
          const url = processUrl(item.url);
          
          return (
            <div key={item.id} className="block">
              <MatrixNavLink 
                to={url} 
                onClick={close}
                className="text-xl w-full justify-start"
              >
                {item.title.toUpperCase()}
              </MatrixNavLink>
            </div>
          );
        })}
      </nav>
    </Aside>
  );
} 