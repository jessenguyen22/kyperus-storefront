# KprButton - Quick Guide

## 🎯 Overview
Cyberpunk-themed button component với 2 variants: Primary và Secondary. Có clip-path đặc trưng và hover animations.

## 🚀 Import & Basic Usage
```jsx
import {KprButton} from '~/components/KprButton';

// Basic buttons
<KprButton variant="primary">Shop Now</KprButton>
<KprButton variant="secondary">Learn More</KprButton>
```

## 🎨 Variants

### Primary Button
- **Style**: Giống `.cart-checkout-button`
- **Background**: Dark gray (#3f3f46)
- **Hover**: White fill animation từ trái qua phải
- **Use case**: CTA chính, checkout, submit

### Secondary Button  
- **Style**: Giống `.cart-discount-form button` + clip path
- **Background**: Transparent với border
- **Hover**: Dark gray fill animation
- **Use case**: Actions phụ, cancel, browse

## ⚙️ Props Reference

```jsx
<KprButton 
  variant="primary"        // 'primary' | 'secondary'
  size="md"               // 'sm' | 'md' | 'lg'
  fullWidth={false}       // boolean - full width
  as="button"             // React.ElementType - button, a, Link, etc.
  className="extra-class" // Additional CSS classes
  href="/shop"            // For links (when as="a")
  onClick={handleClick}   // Event handlers
>
  Button Text
</KprButton>
```

## 📏 Sizes

| Size | Padding | Text Size | Use Case |
|------|---------|-----------|----------|
| `sm` | 16px 32px | 14px | Small actions |
| `md` | 24px 48px | 16px | Standard buttons |
| `lg` | 32px 64px | 18px | Hero CTAs |

## 🔥 Quick Examples

### Hero Section CTA
```jsx
<KprButton variant="primary" size="lg" className="mt-8">
  Explore Collection
</KprButton>
```

### Product Card Actions
```jsx
<div className="flex gap-4">
  <KprButton variant="primary" fullWidth>
    Add to Cart
  </KprButton>
  <KprButton variant="secondary">
    Quick View
  </KprButton>
</div>
```

### Navigation Link
```jsx
<KprButton 
  variant="secondary" 
  as="a" 
  href="/collections/all"
>
  Browse All
</KprButton>
```

### Form Buttons
```jsx
<div className="flex gap-4">
  <KprButton variant="primary" type="submit" fullWidth>
    Submit Order
  </KprButton>
  <KprButton variant="secondary" type="button">
    Cancel
  </KprButton>
</div>
```

### Mobile Menu Actions
```jsx
<KprButton variant="primary" size="sm" fullWidth>
  Sign In
</KprButton>
```

## 🎭 Styling Features

### Clip Path
- Tất cả buttons có cyberpunk clip-path: `polygon(15px 0, 100% 0, 100% calc(100% - 15px), calc(100% - 15px) 100%, 0 100%, 0 15px)`

### Animations
- **Primary**: White fill từ trái qua phải (0.4s)
- **Secondary**: Dark gray fill từ trái qua phải (0.3s)
- **Text**: Smooth color transition (0.3s)

### Typography
- Font: `Oxanium` (cyberpunk font)
- Weight: `Bold`
- Transform: `Uppercase`

## 🎯 Best Practices

1. **Primary for main actions**: Checkout, submit, add to cart
2. **Secondary for support actions**: Browse, learn more, cancel
3. **Use fullWidth**: Cho mobile forms và card actions
4. **Size appropriately**: 
   - `lg` cho hero sections
   - `md` cho general use
   - `sm` cho compact spaces
5. **Combine với gradient text**: Cho special effects

## 🚨 Migration from existing buttons

```jsx
// Old way
<button className="cart-checkout-button">
  Checkout
</button>

// New way  
<KprButton variant="primary" fullWidth>
  Checkout
</KprButton>
```

---

💡 **Tip**: Combine với `GradientText` để tạo epic cyberpunk buttons! 