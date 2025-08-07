import React from 'react';
import { Popover, Transition } from '@headlessui/react';
import { Copy, Check } from 'react-feather';

interface IInput {
  autocomplete?: string;
  className?: string;
  copy?: boolean;
  description?: string;
  disabled?: boolean;
  error?: boolean;
  icon?: JSX.Element;
  id?: string;
  message?: string;
  onChange: (value: string) => void;
  onFocus?: () => void;
  placeholder?: string;
  preLabel?: string;
  required?: boolean;
  type: string;
  value: string;
  simple?: boolean;
}

export default function Input({
  autocomplete,
  className = '',
  copy,
  description,
  disabled,
  error,
  icon,
  id,
  message,
  onChange,
  onFocus,
  placeholder,
  preLabel,
  required,
  type,
  value,
  simple = false,
}: IInput): JSX.Element {
  return (
    <div className="font-poppins">
      {description && (
        <p className="mt-2 text-sm text-grey-500">{description}</p>
      )}
      <div
        className={
          'relative flex rounded-md'
        }
      >
        {preLabel && (
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-grey-300 bg-grey-50 text-grey-500 text-sm">
            {preLabel}
          </span>
        )}
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-grey-400">
            {React.cloneElement(icon, { className: 'h-5 w-5' })}
          </div>
        )}
        <input
          id={id}
          name={id}
          type={type}
          autoComplete={autocomplete || type}
          required={required}
          placeholder={placeholder}
          className={
            'appearance-none transition-all flex-1 block w-full placeholder-grey-500 text-grey-900 focus:outline-none disabled:bg-grey-200 disabled:cursor-not-allowed'
            }
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          disabled={disabled}
        />
        {value && copy && (
          <Popover className="absolute inset-y-0 right-0 pr-3 flex items-center">
            <Popover.Button as="div" className="h-5 w-5">
              <button
                type="button"
                className="appearance-none"
                onClick={() => {
                  navigator.clipboard.writeText(value).finally(() => {});
                }}
              >
                <Copy className="h-5 w-5" aria-hidden="true" />
              </button>
            </Popover.Button>

            <Transition
              enter="transition-opacity duration-100 ease-out"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="transition-opacity duration-75 ease-out"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Popover.Panel className="absolute z-10 -top-6 leading-3 right-0 text-xs text-green-700 bg-white w-20 text-center">
                {({ close }) => {
                  setTimeout(() => {
                    close();
                  }, 2000);
                  return (
                    <div className="flex items-center justify-end">
                      <Check className="h-5 w-5 mr-1" /> Copied
                    </div>
                  );
                }}
              </Popover.Panel>
            </Transition>
          </Popover>
        )}
      </div>
      {message && (
        <p
          className={
           
            'mt-2 text-sm leading-5'
          }
        >
          {message}
        </p>
      )}
    </div>
  );
}
