import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

interface BaseFieldProps {
  label?: string;
  labelBn?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
  className?: string;
}

export const FieldWrapper: React.FC<BaseFieldProps & { children: React.ReactNode }> = ({
  label,
  labelBn,
  error,
  helperText,
  required,
  className = '',
  children,
}) => {
  const { isBn } = useLanguage();
  const displayLabel = isBn ? (labelBn || label) : label;

  return (
    <div className={`space-y-1.5 ${className}`}>
      {displayLabel && (
        <label className={`block text-xs font-medium uppercase tracking-wider text-[#625D52] ${isBn ? 'font-bengali-sans normal-case' : 'font-sans'}`}>
          {displayLabel}
          {required && <span className="text-[#A84E36] ml-1">*</span>}
        </label>
      )}
      {children}
      {helperText && !error && <p className="text-xs text-[#8A8375] font-sans">{helperText}</p>}
      {error && <p className="text-xs text-[#A84E36] font-medium">{error}</p>}
    </div>
  );
};

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement>, BaseFieldProps {}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, labelBn, error, helperText, required, className = '', ...props }, ref) => {
    return (
      <FieldWrapper label={label} labelBn={labelBn} error={error} helperText={helperText} required={required}>
        <input
          ref={ref}
          className={`w-full px-3.5 py-2 text-sm bg-white/80 border ${
            error ? 'border-[#A84E36]' : 'border-[#211F1C]/20'
          } rounded-xs text-[#211F1C] placeholder:text-[#8A8375]/60 transition-colors focus:bg-white focus:border-[#A84E36] focus-visible:outline-2 focus-visible:outline-[#A84E36] disabled:bg-[#EAE4D8]/50 disabled:cursor-not-allowed ${className}`}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Input.displayName = 'Input';

export interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement>, BaseFieldProps {}

export const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, labelBn, error, helperText, required, rows = 4, className = '', ...props }, ref) => {
    return (
      <FieldWrapper label={label} labelBn={labelBn} error={error} helperText={helperText} required={required}>
        <textarea
          ref={ref}
          rows={rows}
          className={`w-full px-3.5 py-2 text-sm bg-white/80 border ${
            error ? 'border-[#A84E36]' : 'border-[#211F1C]/20'
          } rounded-xs text-[#211F1C] placeholder:text-[#8A8375]/60 transition-colors focus:bg-white focus:border-[#A84E36] focus-visible:outline-2 focus-visible:outline-[#A84E36] disabled:bg-[#EAE4D8]/50 disabled:cursor-not-allowed resize-y ${className}`}
          {...props}
        />
      </FieldWrapper>
    );
  }
);
Textarea.displayName = 'Textarea';

export interface SelectOption {
  value: string;
  label: string;
}

export interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement>, BaseFieldProps {
  options: SelectOption[];
}

export const Select = React.forwardRef<HTMLSelectElement, SelectProps>(
  ({ label, labelBn, error, helperText, required, options, className = '', ...props }, ref) => {
    return (
      <FieldWrapper label={label} labelBn={labelBn} error={error} helperText={helperText} required={required}>
        <select
          ref={ref}
          className={`w-full px-3.5 py-2 text-sm bg-white/80 border ${
            error ? 'border-[#A84E36]' : 'border-[#211F1C]/20'
          } rounded-xs text-[#211F1C] transition-colors focus:bg-white focus:border-[#A84E36] focus-visible:outline-2 focus-visible:outline-[#A84E36] disabled:bg-[#EAE4D8]/50 disabled:cursor-not-allowed ${className}`}
          {...props}
        >
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      </FieldWrapper>
    );
  }
);
Select.displayName = 'Select';
