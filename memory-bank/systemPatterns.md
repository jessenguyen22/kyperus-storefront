# System Patterns - Kyperus Storefront

## Architecture Overview
Kyperus Storefront được xây dựng trên Shopify Hydrogen framework với React Router, tuân theo các pattern hiện đại để đảm bảo maintainability và performance.

## Core Technology Stack
### Frontend Framework
- **React Router v7.6.0** (NOT Remix) - Routing và SSR
- **React 18** - UI library với Suspense và concurrent features
- **TypeScript** - Type safety và developer experience

### Shopify Integration
- **@shopify/hydrogen 2025.5.0** - Shopify-specific components và utilities
- **Shopify Storefront API** - Product data và e-commerce functionality
- **Shopify Customer Account API** - Authentication và customer management

### Styling & Animation
- **Tailwind CSS v4.1.10** - Utility-first CSS framework
- **GSAP 3.13.0** - High-performance animations
- **Lenis 1.3.4** - Smooth scrolling library

## Directory Structure Pattern
```
app/
├── components/           # Reusable UI components
│   ├── sections/        # Page sections (Hero, Intro, etc.)
│   └── *.tsx           # Core components (Header, Footer, etc.)
├── constants/          # Configuration và constants
├── graphql/           # GraphQL queries organization
├── lib/              # Utility functions và helpers
├── routes/           # React Router routes
├── sections/         # Additional sections
└── styles/          # CSS files
```

## Component Architecture Patterns
### 1. Compound Components
```typescript
// Example: ProductForm với variants
<ProductForm>
  <ProductForm.VariantSelector />
  <ProductForm.AddToCart />
  <ProductForm.Price />
</ProductForm>
```

### 2. Hook-based Logic
```typescript
// Custom hooks cho reusable logic
export const useMaskSettings = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  // Logic cho responsive mask animations
}
```

### 3. Render Props Pattern
```typescript
// Async data loading với Suspense
<Suspense fallback={<Loading />}>
  <Await resolve={products}>
    {(data) => <ProductGrid products={data} />}
  </Await>
</Suspense>
```

## Data Flow Patterns
### 1. Loader-based Data Fetching
```typescript
export async function loader(args: LoaderFunctionArgs) {
  const criticalData = await loadCriticalData(args);
  const deferredData = loadDeferredData(args);
  return {...criticalData, ...deferredData};
}
```

### 2. GraphQL Query Organization
- Fragments cho reusable data shapes
- Query co-location với components
- Type generation từ GraphQL schema

### 3. Error Handling
- Try-catch blocks cho deferred data
- Graceful degradation khi APIs fail
- User-friendly error messages

## Animation System Patterns
### 1. GSAP Timeline Management
```typescript
useGSAP(() => {
  const tl = gsap.timeline({
    scrollTrigger: {
      trigger: '.hero-section',
      start: 'top top',
      end: '+=200%',
      scrub: 2.5,
      pin: true,
    }
  });
  // Animation sequence
});
```

### 2. Responsive Animation Configuration
```typescript
const { initialMaskPos, initialMaskSize, maskPos, maskSize } = useMaskSettings();
// Different animation params dựa trên screen size
```

### 3. Performance Optimization
- `will-change` CSS properties
- Animation cleanup on unmount
- GPU acceleration cho smooth performance

## State Management Patterns
### 1. React Router Loader State
- Server-side data loading
- Automatic revalidation
- Loading states với Suspense

### 2. Component-level State
- useState cho local UI state
- useEffect cho side effects
- Custom hooks cho shared logic

### 3. Context Pattern (when needed)
- Minimal global state
- Provider pattern cho shared data
- Performance optimization với useMemo

## Code Organization Principles
### 1. Single Responsibility
- Mỗi component có một mục đích rõ ràng
- Utility functions được tách riêng
- Separation of concerns

### 2. Composition over Inheritance
- Component composition pattern
- Higher-order components khi cần thiết
- Render props cho flexibility

### 3. Import Organization
```typescript
// External libraries
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

// Internal utilities
import { useMaskSettings } from '../../constants';

// Components
import Intro from './Intro';
```

## Performance Patterns
### 1. Code Splitting
- Route-based splitting với React Router
- Dynamic imports cho heavy components
- Lazy loading cho non-critical resources

### 2. Image Optimization
- Shopify's Image component
- Responsive images với srcset
- WebP format optimization

### 3. Bundle Optimization
- Tree shaking được enable
- Minimal dependencies
- Vite cho fast build times

## Testing Patterns (Future Implementation)
### 1. Component Testing
- Jest + React Testing Library
- Snapshot testing cho UI regression
- Integration tests cho user flows

### 2. E2E Testing
- Playwright cho browser testing
- Critical user journey coverage
- Performance testing

## Security Patterns
### 1. Environment Variables
- Sensitive data trong .env files
- Shopify API keys security
- Client vs server environment separation

### 2. Input Validation
- GraphQL query validation
- Form input sanitization
- XSS protection 