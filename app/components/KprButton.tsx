import React from 'react';

export interface KprButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  as?: React.ElementType;
  href?: string;
  children: React.ReactNode;
}

export function KprButton({
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  as: Component = 'button',
  className = '',
  children,
  ...props
}: KprButtonProps) {
  const baseClasses = 'kpr-button relative overflow-hidden font-oxanium font-bold text-center cursor-pointer transition-all duration-300 ease-in-out uppercase inline-block text-decoration-none';
  
  const variantClasses = {
    primary: 'kpr-button-primary bg-zinc-700 text-white hover:text-black border-0',
    secondary: 'kpr-button-secondary bg-transparent text-white border border-white/20 hover:bg-zinc-700 hover:text-white'
  };
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3 text-base',
    lg: 'px-8 py-4 text-lg'
  };
  
  const combinedClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${fullWidth ? 'w-full block' : ''}
    ${className}
  `.trim();

  return (
    <Component
      className={combinedClasses}
      {...props}
    >
      <span className="relative z-10 transition-all duration-300 ease-in-out">
        {children}
      </span>
    </Component>
  );
} 