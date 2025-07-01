import React from 'react';

interface GradientTextProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'accent' | 'white' | 'cyber' | 'neon';
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span';
  animate?: boolean;
  className?: string;
}

export function GradientText({
  children,
  variant = 'default',
  as: Component = 'span',
  animate = false,
  className = '',
}: GradientTextProps) {
  const getGradientClass = () => {
    const baseClass = Component.startsWith('h') ? 'heading-gradient' : 'text-gradient';
    
    switch (variant) {
      case 'primary':
        return `${baseClass}-primary`;
      case 'accent':
        return `${baseClass}-accent`;
      case 'white':
        return `${baseClass}-white`;
      case 'cyber':
        return `${baseClass}-cyber`;
      case 'neon':
        return `${baseClass}-neon`;
      default:
        return baseClass;
    }
  };

  const gradientClass = getGradientClass();
  const animateClass = animate ? 'text-gradient-animate' : '';
  const combinedClassName = `${gradientClass} ${animateClass} ${className}`.trim();

  return <Component className={combinedClassName}>{children}</Component>;
}

// Convenience components for common use cases
export function GradientHeading({
  children,
  level = 1,
  variant = 'default',
  animate = false,
  className = '',
}: {
  children: React.ReactNode;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
  variant?: 'default' | 'primary' | 'accent' | 'white' | 'cyber' | 'neon';
  animate?: boolean;
  className?: string;
}) {
  const HeadingComponent = `h${level}` as 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  
  return (
    <GradientText
      as={HeadingComponent}
      variant={variant}
      animate={animate}
      className={className}
    >
      {children}
    </GradientText>
  );
} 