# Kyperus Storefront - Project Overview

## 📋 Project Summary

**Kyperus Storefront** là một e-commerce platform được xây dựng trên Shopify Hydrogen framework, tập trung vào việc tạo ra trải nghiệm mua sắm độc đáo với chủ đề văn hóa Việt Nam và worldbuilding narrative. Dự án kết hợp giữa modern web technologies và high-performance animations để tạo ra một storefront premium.

### Core Information
- **Framework:** Shopify Hydrogen với React Router v7
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4 + GSAP animations
- **E-commerce:** Shopify Storefront API + Customer Account API
- **Deployment:** Shopify Oxygen

## 🏗️ Architecture Overview

### Technology Stack
```
Frontend Framework:
├── React 18 (với Suspense + Concurrent features)
├── React Router v7.6.0 (NOT Remix)
├── TypeScript (strict mode)
└── Vite (build system)

Shopify Integration:
├── @shopify/hydrogen 2025.5.0
├── Shopify Storefront API (products, collections)
├── Shopify Customer Account API (auth, orders)
└── GraphQL với codegen

Styling & Animation:
├── Tailwind CSS v4.1.10
├── GSAP 3.13.0 (timeline animations)
├── Lenis 1.3.4 (smooth scrolling)
└── Custom CSS variables

Development:
├── ESLint + Prettier
├── TypeScript strict configuration
└── Vite hot reload
```

## 📁 Project Structure

```
kyperus-storefront/
├── .cursor/                      # Cursor AI rules & configuration
│   └── rules/hydrogen-react-router.mdc
├── app/                          # Main application code
│   ├── components/              # Reusable UI components (26 files)
│   │   ├── sections/           # Page sections (Hero, Intro, etc.)
│   │   ├── AddToCartButton.tsx
│   │   ├── Header.tsx
│   │   ├── Footer.tsx
│   │   ├── KprButton.tsx       # Custom branded button
│   │   ├── GradientText.tsx    # Animated gradient text
│   │   └── ProductForm.tsx
│   ├── routes/                  # React Router routes (60 files)
│   │   ├── _index.tsx          # Homepage
│   │   ├── ($locale)/          # Localized routes
│   │   ├── products/           # Product pages
│   │   ├── collections/        # Collection pages
│   │   ├── account/            # Customer account
│   │   └── cart/               # Shopping cart
│   ├── lib/                     # Utility functions (7 files)
│   │   ├── context.ts          # App context
│   │   ├── fragments.ts        # GraphQL fragments
│   │   ├── session.ts          # Session management
│   │   └── variants.ts         # Product variants
│   ├── graphql/                 # GraphQL queries (5 files)
│   │   └── customer-account/    # Customer API queries
│   ├── styles/                  # CSS files (4 files)
│   │   ├── app.css             # Main styles
│   │   ├── tailwind.css        # Tailwind imports
│   │   ├── fonts.css           # Font definitions
│   │   └── reset.css           # CSS reset
│   ├── constants/               # App constants
│   ├── assets/                  # Static assets
│   └── entry.{client,server}.tsx
├── public/                       # Public assets
│   └── images/                  # SVG icons, logos, masks
├── memory-bank/                 # Project documentation
│   ├── projectbrief.md
│   ├── systemPatterns.md
│   ├── progress.md
│   └── activeContext.md
├── docs/                        # Component documentation
├── guides/                      # Implementation guides
└── config files                 # Build & deployment config
```

## 🎯 Key Features & Components

### Core E-commerce Features
1. **Product Management**
   - ProductForm với variant selection
   - ProductImage với responsive display
   - ProductPrice với formatting
   - AddToCartButton với loading states

2. **Shopping Cart**
   - CartMain với line items
   - CartSummary với calculations
   - Cart drawer functionality
   - Real-time cart updates

3. **Search & Navigation**
   - Predictive search implementation
   - Collection browsing
   - Responsive navigation
   - Mobile menu system

4. **Customer Account**
   - Authentication flow
   - Order history
   - Address management
   - Profile updates

### Custom Components & Branding
1. **KprButton** - Custom branded button component
2. **GradientText** - Animated gradient text effects
3. **MatrixNavLink** - Custom navigation links
4. **Hero Section** - Animated hero với GSAP mask effects
5. **TraditionalConcept** - Cultural content sections

### Animation System
- **GSAP Integration:** Timeline-based animations
- **ScrollTrigger:** Scroll-based animation triggers  
- **Responsive Animations:** Mobile/tablet/desktop breakpoints
- **Performance Optimized:** Hardware acceleration enabled

## 🔧 Development Setup

### Environment Requirements
```bash
Node.js >= 18
npm or yarn
Shopify CLI
```

### Key Scripts
```json
{
  "dev": "shopify hydrogen dev",
  "build": "shopify hydrogen build",
  "preview": "npm run build && shopify hydrogen preview",
  "lint": "eslint --cache --cache-location ./node_modules/.cache/eslint .",
  "typecheck": "tsc --noEmit"
}
```

### Configuration Files
- `react-router.config.ts` - React Router configuration  
- `vite.config.ts` - Vite build configuration
- `tailwind.config.js` - Tailwind CSS setup
- `tsconfig.json` - TypeScript configuration
- `.graphqlrc.ts` - GraphQL codegen setup

## 📊 Current Status (Based on Memory Bank)

### ✅ Completed Features
- **Core Infrastructure:** Shopify integration, TypeScript, build system
- **Component Library:** 26+ reusable components
- **Routing System:** 60+ routes với locale support
- **Animation Foundation:** GSAP setup với basic animations
- **E-commerce Core:** Products, cart, search functionality

### 🔄 In Progress  
- **Animation Enhancements:** Hero section polish, mobile optimization
- **TypeScript Migration:** Constants migration từ JS sang TS
- **Component Polish:** ProductForm enhancements, cart styling

### 🟠 Partially Complete
- **Product Pages:** 70% complete (missing image gallery, recommendations)
- **Cart Experience:** 60% complete (needs styling, animations)
- **Search Functionality:** 50% complete (needs performance optimization)

## 🎨 Design Philosophy

### Brand Identity
- **KPR (KEE-PRZ):** Worldbuilding exercise focused on collective narrative
- **Cultural Integration:** Vietnamese cultural elements và storytelling
- **Premium Experience:** High-quality animations và interactions
- **Modern Aesthetic:** Clean design với sophisticated typography

### Performance Principles
- **Mobile-First:** Responsive design với mobile optimization
- **Fast Loading:** Optimized assets và lazy loading
- **Smooth Animations:** 60fps animations với GSAP
- **Accessibility:** WCAG compliance và keyboard navigation

## 🔮 Technical Decisions & Patterns

### Key Architectural Choices
1. **React Router vs Remix:** Sử dụng React Router v7 (not Remix) cho routing
2. **TypeScript Strict Mode:** Enforced type safety
3. **Tailwind v4:** Latest version với modern features
4. **GSAP over CSS:** Complex animations với better performance
5. **Memory Bank Pattern:** Documentation-driven development

### Code Organization Patterns
- **Component Co-location:** Components gần với related files
- **Hook-based Logic:** Custom hooks cho reusable logic  
- **GraphQL Fragments:** Shared query fragments
- **Responsive Design:** Mobile-first Tailwind classes

## 📚 Documentation Structure

### Memory Bank System
- `projectbrief.md` - Foundation requirements và goals
- `systemPatterns.md` - Architecture và technical decisions  
- `progress.md` - Current status và completed features
- `activeContext.md` - Current work focus và next steps
- `techContext.md` - Technology stack và constraints
- `productContext.md` - Business context và user needs

### Component Documentation
- Quick guides cho custom components
- Implementation patterns
- Usage examples
- Performance considerations

## 🚀 Deployment & Operations

### Shopify Oxygen Deployment
- Automated deployment via GitHub Actions
- Environment-specific configurations
- Performance monitoring
- CDN optimization

### Development Workflow
1. **Local Development:** `npm run dev`
2. **Type Checking:** `npm run typecheck`  
3. **Linting:** `npm run lint`
4. **Build:** `npm run build`
5. **Preview:** `npm run preview`

## 🎯 Success Metrics

### Technical Excellence
- **Performance:** Core Web Vitals optimization
- **Accessibility:** WCAG AA compliance
- **TypeScript Coverage:** 90%+ type safety
- **Animation Performance:** 60fps target

### Business Impact  
- **User Experience:** Smooth, engaging interactions
- **Conversion Rate:** Optimized checkout flow
- **Brand Differentiation:** Unique cultural narrative
- **Mobile Experience:** Mobile-first optimization

---

## 📞 Quick Reference

### Import Patterns (Important!)
```typescript
// CORRECT - React Router imports
import { useLoaderData, Link, Form } from 'react-router';

// WRONG - Don't use Remix imports
import { useLoaderData, Link, Form } from '@remix-run/react';
```

### File Conventions
- Components: PascalCase (`ProductForm.tsx`)
- Routes: Shopify Hydrogen naming (`($locale).products.$handle.tsx`) 
- Styles: kebab-case (`app.css`)
- Constants: camelCase exports

### Key Dependencies
- `@shopify/hydrogen: 2025.5.0`
- `react-router: ^7.6.0`
- `gsap: ^3.13.0`
- `tailwindcss: ^4.1.10`

Dự án này được thiết kế để tạo ra một premium e-commerce experience với strong cultural identity và cutting-edge web technologies.