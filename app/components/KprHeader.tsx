import {Suspense, useState, useEffect, useRef} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {Menu, Search as SearchIcon, Skull, Hexagon} from 'lucide-react';
import {MatrixNavLink} from './MatrixNavLink';
import {MobileMenu} from './MobileMenu';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function KprHeader({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const headerRef = useRef<HTMLDivElement>(null);
  const [isSticky, setIsSticky] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [currentScrollTop, setCurrentScrollTop] = useState(0);
  const [headerBounds, setHeaderBounds] = useState<DOMRect | null>(null);
  const {type: asideType, open} = useAside();
  const predictiveSearchIsOpen = false; // You can implement this based on your search state

  // Set fixed header height once - no dynamic calculation
  useEffect(() => {
    // Set a fixed header height that covers announcement + header in all states
    // 32px (announcement) + 104px (header) = 136px
    document.documentElement.style.setProperty('--header-height', '136px');
  }, []);

  useEffect(() => {
    // Create intersection observer for header bounds
    const observer = new IntersectionObserver((entries) => {
      setHeaderBounds(entries[0].intersectionRect);
      observer.disconnect();
    });

    if (headerRef.current) {
      observer.observe(headerRef.current);
    }

    // Scroll handler
    const onScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

      // Skip if predictive search is open
      if (predictiveSearchIsOpen) return;

      if (headerBounds) {
        if (scrollTop > currentScrollTop && scrollTop > headerBounds.bottom) {
          // Scrolling down and past header
          setIsSticky(true);
          setIsHidden(true);
        } else if (scrollTop < currentScrollTop && scrollTop > headerBounds.bottom) {
          // Scrolling up and past header
          setIsSticky(true);
          setIsHidden(false);
        } else if (scrollTop <= headerBounds.top) {
          // At top
          setIsSticky(false);
          setIsHidden(false);
        }
      }

      setCurrentScrollTop(scrollTop);
    };

    window.addEventListener('scroll', onScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', onScroll);
      observer.disconnect();
    };
  }, [currentScrollTop, headerBounds, predictiveSearchIsOpen]);

  return (
    <div ref={headerRef}>
      <div
        className={`fixed top-0 z-40 w-full bg-black transition-transform duration-500 ease-in-out
        ${isHidden ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Announcement */}
        <div
          className={`announcement-bar overflow-hidden transition-all duration-300 ease-in-out bg-black text-white border-b border-white/10 
          ${isSticky ? 'h-0 py-0 border-opacity-0' : 'h-8 py-1 border-opacity-100'}`}
        >
          <div className="container mx-auto text-center px-4 text-sm">
            <p className="font-oxanium text-[14px] leading-tight sm:text-[16px] font-light tracking-wider">
              Free shipping on orders over $100
            </p>
          </div>
        </div>

        {/* Main Header */}
        <header
          className={`h-auto transition-all duration-500 ease-in-out 
          ${isSticky ? 'bg-black/80 backdrop-blur-lg shadow-md border-transparent' : 'bg-black border-b border-neutral-800'}
          ${isSticky ? 'shopify-section-header-sticky' : ''}`}
        >
          <div className="container mx-auto">
            {/* Header Content */}
            <div
              className={`relative flex items-center justify-between px-4 sm:px-6 transition-all duration-300 ease-in-out max-lg:py-6 lg:py-2`}
            >
              {/* Mobile Menu Toggle */}
              <div className="lg:hidden">
                <button
                  onClick={() => open('mobile-menu')}
                  className="p-2 -ml-2 text-white hover:text-neutral-400 transition-colors"
                >
                  <Menu className="w-6 h-6" />
                </button>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex lg:w-1/3">
                <HeaderMenu
                  menu={menu}
                  viewport="desktop"
                  primaryDomainUrl={header.shop.primaryDomain.url}
                  publicStoreDomain={publicStoreDomain}
                />
              </div>

              {/* Logo - Responsive for both mobile and desktop */}
              <div className="max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2 lg:w-1/3 lg:flex lg:items-center lg:justify-center">
                <NavLink
                  prefetch="intent"
                  to="/"
                  className="block"
                >
                  <img 
                    src="/images/logo_kyperus_w.png" 
                    alt={shop.name}
                    className={`h-auto transition-all duration-300 ease-in-out ${isSticky ? 'w-24' : 'w-[120px]'}`}
                  />
                </NavLink>
              </div>

              {/* Right actions - Search and Cart */}
              <div className="lg:w-1/3 lg:flex lg:items-center lg:justify-end">
                <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
              </div>
            </div>
          </div>
        </header>
      </div>

      {/* Mobile Menu */}
      <MobileMenu
        menu={menu}
        publicStoreDomain={publicStoreDomain}
        primaryDomainUrl={header.shop.primaryDomain.url}
      />
    </div>
  );
}

// Reuse existing components
export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  const desktopClassName =
    'flex items-center gap-6 text-sm uppercase justify-center text-white';
  const mobileClassName =
    'flex flex-col items-center justify-center space-y-4 text-sm uppercase';

  return (
    <nav
      className={viewport === 'desktop' ? desktopClassName : mobileClassName}
      role="navigation"
    >
      {viewport === 'mobile' && (
        <div className="w-full text-center">
          <MatrixNavLink to="/" onClick={() => close()}>
            Home
          </MatrixNavLink>
        </div>
      )}
      {viewport === 'desktop' &&
        menu?.items.map((item) => {
          if (!item.url) return null;
          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;
          return (
            <MatrixNavLink
              key={item.id}
              to={url}
              onClick={() => close()}
            >
              {item.title}
            </MatrixNavLink>
          );
        })}
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-4 text-white" role="navigation">
      <SearchToggle />
      <CartToggle cart={cart} />
    </nav>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button 
      className="relative group header-icon-button" 
      onClick={() => open('search')}
      aria-label="Search"
    >
      <Hexagon className="w-12 h-12 text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white/30 transition-colors" strokeWidth={1} />
      <SearchIcon className="w-6 h-6 relative z-10 group-hover:text-neutral-400 transition-colors" strokeWidth={1.5} />
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      className="relative group header-icon-button"
      onClick={() => {
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      aria-label="Cart"
    >
      <Hexagon className="w-12 h-12 text-white/20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 group-hover:text-white/30 transition-colors" strokeWidth={1} />
      <Skull className="w-6 h-6 relative z-10 group-hover:text-neutral-400 transition-colors" strokeWidth={1.5} />
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-white text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold z-20">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
} 