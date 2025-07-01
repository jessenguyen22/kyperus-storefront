# Gradient Text - Quick Guide

## 🎨 Gradient Variants có sẵn

| Variant | Màu sắc | Use case |
|---------|---------|----------|
| `default` | White subtle | Text thông thường |
| `primary` | Red/Orange | CTA, highlights |
| `accent` | Purple | Secondary emphasis |
| `white` | White clean | Clean headings |
| `cyber` | Blue cyber | Tech/Gaming theme |
| `neon` | Pink/Purple | Neon effects |

## 📝 Cách sử dụng

### Method 1: CSS Classes (Nhanh)
```jsx
// Cho headings
<h1 className="heading-gradient-cyber">Title</h1>
<h2 className="heading-gradient-neon">Subtitle</h2>

// Cho text thường
<p className="text-gradient-primary">Description</p>
<span className="text-gradient-cyber text-gradient-animate">Animated text</span>
```

### Method 2: React Components (Recommended)
```jsx
import {GradientText, GradientHeading} from '~/components/GradientText';

// Headings
<GradientHeading level={1} variant="cyber">Main Title</GradientHeading>
<GradientHeading level={2} variant="neon" animate>Animated Title</GradientHeading>

// Text
<GradientText variant="primary">Normal text</GradientText>
<GradientText as="p" variant="cyber" animate>Paragraph text</GradientText>
```

## 🔥 Quick Copy-Paste Examples

### Hero Section
```jsx
<GradientHeading level={1} variant="cyber" className="text-6xl font-oxanium">
  Welcome to Kyperus
</GradientHeading>
<GradientText as="p" variant="white" className="text-xl">
  Premium gaming experience
</GradientText>
```

### Product Cards
```jsx
<GradientHeading level={3} variant="neon" className="text-2xl font-bold">
  {product.title}
</GradientHeading>
```

### Call to Action
```jsx
<GradientText variant="primary" animate className="text-lg font-semibold">
  Limited Time Offer!
</GradientText>
```

## 📋 CSS Classes Reference

### Heading Classes
- `.heading-gradient` - Default white gradient + bold
- `.heading-gradient-primary` - Red/orange + bold
- `.heading-gradient-cyber` - Blue cyber + bold  
- `.heading-gradient-neon` - Pink/purple + bold

### Text Classes
- `.text-gradient` - Default white gradient
- `.text-gradient-primary` - Red/orange gradient
- `.text-gradient-accent` - Purple gradient
- `.text-gradient-white` - Clean white gradient
- `.text-gradient-cyber` - Blue cyber gradient
- `.text-gradient-neon` - Pink/purple gradient

### Animation
- `.text-gradient-animate` - Thêm vào bất kỳ gradient class nào

## ⚡ Component Props

### GradientText
```jsx
<GradientText 
  variant="cyber"           // Gradient variant
  as="p"                   // HTML element (h1,h2,p,span)
  animate={true}           // Enable animation
  className="text-xl"      // Additional classes
>
  Your text
</GradientText>
```

### GradientHeading
```jsx
<GradientHeading 
  level={1}                // 1,2,3,4,5,6 (h1,h2,etc)
  variant="neon"           // Gradient variant  
  animate={false}          // Enable animation
  className="font-bold"    // Additional classes
>
  Your heading
</GradientHeading>
```

## 🎯 Best Practices

1. **Headings**: Dùng `GradientHeading` hoặc `.heading-gradient-*`
2. **Text**: Dùng `GradientText` hoặc `.text-gradient-*`  
3. **Animation**: Chỉ dùng cho text quan trọng
4. **Fonts**: Combine với `font-oxanium` cho cyberpunk feel
5. **Sizes**: Gradient đẹp nhất với text size lớn (text-xl+)

## 🚀 Quick Start Template

```jsx
import {GradientHeading, GradientText} from '~/components/GradientText';

function MyComponent() {
  return (
    <div className="text-center space-y-4">
      <GradientHeading level={1} variant="cyber" className="text-5xl font-oxanium">
        Amazing Title
      </GradientHeading>
      
      <GradientText as="p" variant="white" className="text-lg">
        Beautiful description text
      </GradientText>
      
      <GradientText variant="neon" animate className="text-sm font-semibold">
        Special offer text
      </GradientText>
    </div>
  );
}
```

---

💡 **Tip**: Combine với `font-oxanium` class để có cyberpunk aesthetic hoàn hảo! 