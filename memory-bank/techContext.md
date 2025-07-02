# Technical Context - Kyperus Storefront

## Technology Stack
### Core Technologies
- **Framework:** React Router v7.6.0 (Migration từ Remix)
- **Runtime:** Node.js >= 18.0.0
- **Package Manager:** npm
- **Build Tool:** Vite 6.2.4
- **Language:** TypeScript 5.2.2

### Shopify Integration
- **Platform:** Shopify Hydrogen 2025.5.0
- **Deployment:** Shopify Oxygen
- **APIs:** 
  - Storefront API (GraphQL)
  - Customer Account API (GraphQL)
- **CLI:** Shopify CLI ~3.80.4

### Frontend Dependencies
```json
{
  "react": "^18.2.0",
  "react-dom": "^18.2.0",
  "react-router": "7.6.0",
  "react-router-dom": "7.6.0",
  "@shopify/hydrogen": "2025.5.0",
  "graphql": "^16.10.0",
  "tailwindcss": "^4.1.10",
  "gsap": "^3.13.0",
  "lenis": "^1.3.4"
}
```

### Development Tools
- **Linting:** ESLint 9.18.0 với TypeScript rules
- **Formatting:** Prettier với Shopify config
- **Type Generation:** GraphQL Code Generator
- **Dev Server:** Vite với HMR

## Development Environment Setup
### Prerequisites
```bash
# Node.js version check
node --version  # Should be >= 18.0.0

# Shopify CLI installation
npm install -g @shopify/cli
```

### Local Development
```bash
# Install dependencies
npm install

# Start development server với GraphQL codegen
npm run dev

# Build for production
npm run build

# Run linting
npm run lint

# Type checking
npm run typecheck
```

### Environment Configuration
```bash
# Required environment variables
SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
SHOPIFY_STOREFRONT_ACCESS_TOKEN=your-token
SHOPIFY_CUSTOMER_ACCOUNT_API_CLIENT_ID=your-client-id
```

## Architecture Constraints
### React Router Migration Notes
**CRITICAL:** Project đã migrate từ Remix sang React Router v7

```typescript
// INCORRECT (Remix style)
import { useLoaderData } from '@remix-run/react';

// CORRECT (React Router style)  
import { useLoaderData } from 'react-router';
```

### Import Rules
- NEVER sử dụng `react-router-dom` imports
- Sử dụng `react-router` cho tất cả routing hooks
- Sử dụng `@react-router/dev` cho development tools

### File Structure Constraints
```
app/
├── routes/              # React Router file-based routing
│   ├── _index.tsx       # Homepage route
│   ├── ($locale).tsx    # Locale wrapper
│   └── *.tsx           # Other routes
├── entry.client.tsx     # Client-side entry point
├── entry.server.tsx     # Server-side entry point
└── root.tsx            # Root layout component
```

## Performance Constraints
### Bundle Size Limits
- Main bundle: < 300KB gzipped
- Route chunks: < 100KB each
- Image assets: WebP format preferred
- Font loading: Self-hosted fonts only

### Runtime Performance
- First Contentful Paint: < 1.5s
- Largest Contentful Paint: < 2.5s  
- Cumulative Layout Shift: < 0.1
- Time to Interactive: < 3s

### Animation Performance
- 60fps target cho tất cả animations
- GPU acceleration cho GSAP transforms
- Debounced scroll events
- Cleanup animation timelines on unmount

## Browser Support
### Target Browsers
```json
"browserslist": [
  "defaults",
  "not ie 11",
  "not op_mini all"
]
```

### Feature Support
- ES2020+ features
- CSS Grid và Flexbox
- WebP image format
- CSS Custom Properties
- Intersection Observer API

## API Constraints
### GraphQL Limitations
- Shopify Storefront API rate limits
- Query complexity limits
- Fragment reuse requirements
- Type generation dependencies

### Customer Account API
- OAuth 2.0 authentication flow
- Domain restrictions cho development
- Token refresh mechanisms
- Privacy compliance requirements

## Build System Configuration
### Vite Configuration
```typescript
// vite.config.ts highlights
export default defineConfig({
  plugins: [
    hydrogen(),
    tsconfigPaths(),
    tailwindcss()
  ],
  server: {
    port: 3000
  }
});
```

### TypeScript Configuration
```json
// tsconfig.json highlights
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["DOM", "DOM.Iterable", "ES6"],
    "module": "ESNext",
    "moduleResolution": "node",
    "strict": true
  }
}
```

## Deployment Constraints
### Shopify Oxygen
- Serverless deployment platform
- Edge computing capabilities
- Automatic scaling
- Regional optimization

### Build Requirements
- Static asset optimization
- Server-side rendering support
- Environment variable management
- Error monitoring integration

## Security Considerations
### API Security
- Shopify API tokens management
- CORS configuration
- XSS protection
- Input sanitization

### Content Security Policy
- Inline script restrictions
- Image source policies
- Font loading policies
- Third-party script controls

## Monitoring & Analytics
### Performance Monitoring
- Core Web Vitals tracking
- Error boundary implementation
- Performance budgets
- Lighthouse CI integration

### Development Tools
- React Developer Tools
- GSAP Developer Tools
- Network throttling testing
- Accessibility auditing tools

## Known Technical Debt
### Current Issues
1. **Constants file:** Mixed .js/.tsx extensions
2. **Animation cleanup:** Some GSAP timelines need proper cleanup
3. **Type coverage:** Some any types need proper typing
4. **Bundle optimization:** Code splitting could be improved

### Planned Improvements
1. Migrate all JS files to TypeScript
2. Implement comprehensive error boundaries
3. Add performance monitoring
4. Optimize animation performance
5. Improve accessibility compliance 