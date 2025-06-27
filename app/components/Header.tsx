import {Suspense, useState} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {useEffect} from 'react';
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

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  const [isScrolled, setIsScrolled] = useState(false);
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const {type: asideType, open} = useAside();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--announcement-height', isScrolled ? '0' : '40px');
    root.style.setProperty('--header-height', 'auto');

    const handleScroll = () => {
      if (asideType === 'closed') return;
      const currentScrollY = window.scrollY;
      setIsScrolled(currentScrollY > 50);
      setIsScrollingUp(currentScrollY < lastScrollY);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, {passive: true});

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY, isScrolled, asideType]);

  return (
    <>
      <div
        className={`fixed z-40 w-full bg-black transition-transform duration-500 ease-in-out
        ${isScrolled && !isScrollingUp && asideType === 'closed' ? '-translate-y-full' : 'translate-y-0'}`}
      >
        {/* Announcement */}
        <div
          className={`announcement-bar overflow-hidden transition-all duration-500 ease-in-out bg-black text-white border-b border-white/10 ${isScrolled ? 'max-h-0 border-opacity-0' : 'max-h-8 border-opacity-100'}`}
        >
          <div className="container mx-auto text-center px-4 py-1 text-sm">
            <p className="font-oxanium text-[14px] leading-tight sm:text-[16px] font-light tracking-wider">
              Free shipping on orders over $100
            </p>
          </div>
        </div>
        {/* Main Header */}
        <header
          className={`h-auto transition-all duration-500 ease-in-out ${isScrolled ? 'bg-black/80 backdrop-blur-lg shadow-md border-transparent' : 'bg-black border-b border-neutral-800'}`}
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
                    className={`h-auto transition-all duration-300 ease-in-out ${isScrolled ? 'w-24' : 'w-[120px]'}`}
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
    </>
  );
}

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
    'flex items-center gap-12 text-sm uppercase justify-center text-white';
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

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
