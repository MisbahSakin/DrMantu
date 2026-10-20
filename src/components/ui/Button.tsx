import React from 'react';
import { Link } from 'react-router-dom';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  className?: string;
  children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  to,
  href,
  icon,
  iconPosition = 'left',
  className = '',
  children,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#A84E36] focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none whitespace-nowrap shrink-0 text-center select-none';

  const sizeStyles = {
    sm: 'text-xs px-3 py-1.5 gap-1.5 rounded-sm',
    md: 'text-sm px-4 py-2 gap-2 rounded-sm',
    lg: 'text-base px-6 py-3 gap-2.5 rounded-sm',
  };

  const variantStyles = {
    primary: 'bg-[#A84E36] hover:bg-[#8F3E28] text-white shadow-xs',
    secondary: 'bg-[#EAE4D8] hover:bg-[#DDD6C8] text-[#211F1C] border border-[#211F1C]/10',
    outline: 'bg-transparent border border-[#211F1C]/25 text-[#211F1C] hover:bg-[#EAE4D8]/50',
    ghost: 'bg-transparent text-[#625D52] hover:text-[#211F1C] hover:bg-[#EAE4D8]/40',
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  const content = (
    <>
      {icon && iconPosition === 'left' && <span className="shrink-0">{icon}</span>}
      <span>{children}</span>
      {icon && iconPosition === 'right' && <span className="shrink-0">{icon}</span>}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} className={combinedClasses} target="_blank" rel="noopener noreferrer">
        {content}
      </a>
    );
  }

  return (
    <button className={combinedClasses} {...props}>
      {content}
    </button>
  );
};
