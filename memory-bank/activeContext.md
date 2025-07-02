# Active Context - Kyperus Storefront

## Current Work Focus
**Hiện tại:** Khởi tạo Memory Bank và documentation system  
**Ngày cập nhật:** 2025-01-26  
**Sprint/Phase:** Setup & Documentation  

## Recent Changes
### Latest Modifications
1. **app/constants/index.js** - Modified (unstaged)
   - Responsive mask settings cho Hero animation
   - Mobile, tablet, desktop breakpoints
   - Vietnamese comments added

### Recent Development Activity
- Hero component với GSAP scroll-triggered animations
- Mask effect implementation với responsive settings
- Component structure established
- TypeScript migration ongoing

## Active Decisions & Considerations
### 1. Import Strategy
**Decision:** Sử dụng React Router imports, KHÔNG dùng Remix
```typescript
// ALWAYS use this pattern
import { useLoaderData, Link } from 'react-router';
// NEVER use @remix-run/react or react-router-dom
```

### 2. Animation Performance
**Current approach:** GSAP với ScrollTrigger
- Mask animations cho Hero section
- Responsive breakpoints trong constants
- GPU acceleration cho smooth 60fps

### 3. File Organization
**Pattern được áp dụng:**
- Components trong `/app/components/`
- Sections trong `/app/components/sections/`
- Constants trong `/app/constants/`
- Routes theo React Router file-based routing

## Next Steps (Priority Order)
### Immediate (This Week)
1. **Migrate constants file to TypeScript**
   - Rename `index.js` to `index.ts`
   - Add proper TypeScript types
   - Update import statements

2. **Complete Hero section animation**
   - Test mask effect on all devices
   - Optimize performance
   - Add fallbacks cho older browsers

3. **Fix any TypeScript errors**
   - Review current type coverage
   - Add missing type definitions
   - Ensure strict mode compliance

### Short Term (Next 2 Weeks)
1. **Component library expansion**
   - Enhance ProductForm components
   - Improve Cart functionality
   - Add Search components

2. **Performance optimization**
   - Bundle size analysis
   - Image optimization
   - Code splitting improvements

3. **Animation system completion**
   - Additional GSAP animations
   - Scroll-based interactions
   - Mobile animation optimization

### Medium Term (Next Month)
1. **E-commerce functionality**
   - Complete checkout flow
   - Customer account features
   - Order management

2. **Testing implementation**
   - Unit tests với Jest
   - E2E tests với Playwright
   - Performance testing

3. **SEO & Accessibility**
   - Meta tags optimization
   - WCAG compliance
   - Structured data implementation

## Current Challenges
### Technical Challenges
1. **GSAP Performance on Mobile**
   - Heavy animations có thể cause jank
   - Need optimization cho lower-end devices
   - Battery usage considerations

2. **TypeScript Migration**
   - Some files still in JavaScript
   - Type definitions cần improvement
   - Strict mode compliance

3. **Bundle Size Management**
   - GSAP thêm significant size
   - Need tree shaking optimization
   - Route splitting strategy

### Design Challenges
1. **Cultural Theme Integration**
   - Balance traditional elements với modern UX
   - Color scheme consistency
   - Typography hierarchy

2. **Mobile-first Responsive Design**
   - Complex animations on small screens
   - Touch interaction optimization
   - Performance vs visual appeal

## Decisions Pending
### 1. Animation Library Strategy
**Options:**
- Continue với GSAP (current)
- Migrate to Framer Motion
- Hybrid approach

**Factors:** Performance, bundle size, ease of use

### 2. State Management
**Current:** React Router loaders + component state
**Consideration:** Need for global state management?

### 3. Testing Strategy
**Pending:** Choose between Jest vs Vitest
**Consideration:** Vite ecosystem compatibility

## Blocked Items
### Current Blockers
1. **Environment Setup Issues**
   - Shopify store configuration needed
   - API keys and tokens setup
   - Domain configuration cho Customer Account API

2. **Design Assets**
   - Some images/logos chưa optimized
   - Icon system chưa complete
   - Font loading optimization needed

## Key Stakeholder Notes
### User Feedback
- Performance is critical
- Mobile experience must be excellent
- Cultural theme should be prominent but not overwhelming

### Technical Requirements
- Must use React Router (not Remix)
- Shopify Hydrogen compliance
- 60fps animation target
- < 3s loading time requirement

## Tools & Resources Currently Used
- **Development:** Cursor IDE với Memory Bank system
- **Version Control:** Git
- **Package Management:** npm
- **Testing:** TBD (Jest or Vitest)
- **Deployment:** Shopify Oxygen
- **Monitoring:** TBD (Shopify Analytics + custom)

## Important Notes
- Memory Bank được initialize để track project progress
- All documentation phải được update when major changes occur
- React Router migration hoàn thành, chỉ sử dụng React Router imports
- Vietnamese language preference cho comments và documentation 