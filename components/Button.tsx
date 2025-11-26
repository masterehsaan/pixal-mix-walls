import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'glass';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  className, 
  variant = 'primary', 
  isLoading, 
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 overflow-hidden font-medium transition-all duration-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 disabled:opacity-50 disabled:cursor-not-allowed group";
  
  const variants = {
    primary: "bg-gradient-to-r from-violet-600 to-indigo-600 text-white hover:shadow-[0_0_20px_rgba(124,58,237,0.5)] focus:ring-violet-500 border border-violet-500/50",
    secondary: "bg-slate-800 text-slate-200 border border-slate-700 hover:bg-slate-700 hover:border-slate-600 focus:ring-slate-500",
    ghost: "bg-transparent text-slate-400 hover:text-white hover:bg-white/5",
    glass: "bg-white/10 backdrop-blur-md border border-white/20 text-white hover:bg-white/20 hover:border-white/30 hover:shadow-[0_0_15px_rgba(255,255,255,0.2)]"
  };

  return (
    <button 
      className={twMerge(baseStyles, variants[variant], className)}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {isLoading ? (
        <span className="flex items-center gap-2">
          <svg className="animate-spin h-5 w-5 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Generating...
        </span>
      ) : (
        <>
           {/* Shine effect for primary button */}
           {variant === 'primary' && (
             <span className="absolute top-0 right-0 -mt-12 -mr-12 w-24 h-24 rounded-full bg-white opacity-10 blur-xl group-hover:animate-pulse"></span>
           )}
           {children}
        </>
      )}
    </button>
  );
};