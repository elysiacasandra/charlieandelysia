import { Fragment, useState } from 'react';
import { Listbox, Transition } from '@headlessui/react';
import { ChevronDown } from 'react-feather';

export interface IInputSelectOption {
  label: string;
  value: string;
}

export interface IInputSelect {
  id: string;
  label?: string;
  placeholder?: string;
  options: IInputSelectOption[];
  value: string;
  onChange: (value: string) => void;
  light?: boolean;
  fullWidth?: boolean;
  small?: boolean;
}

export default function InputSelect({
  id,
  label,
  placeholder,
  options,
  value,
  onChange,
  light = false,
  fullWidth = false,
  small = false,
}: IInputSelect): JSX.Element {
  const [customOption, setCustomOption] = useState('');

  const handleCustomOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCustomOption(event.target.value);
  };

  const handleCustomOptionSelect = () => {
    onChange(customOption);
    setCustomOption('');
  };

  return (
    <div
      className={`${
        light ? 'w-auto' : ''
      } ${fullWidth ? 'w-full' : 'w-72 max-w-full'}`}
      id={id}
    >
      <Listbox value={value} onChange={onChange}>
        <div className="relative">
          <Listbox.Button
            className={`relative text-base bg-white py-5 leading-5 pl-3 pr-10 text-left rounded-md focus:outline-none border ${
              value === '' ? 'text-grey-500' : ''
            } ${
              light
                ? 'border-grey-100 text-grey-50 w-auto'
                : 'border-grey-300 text-grey-700 w-full'
            } ${small ? 'py-1.5' : 'py-3.5'} ${label ? 'mt-1' : ''}`}
          >
            <span className="block truncate">
              {value === ''
                ? placeholder
                : options.find((item) => item.value === value)?.label}
            </span>
            <span className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
              <ChevronDown
                className="w-5 h-5 text-grey-400"
                aria-hidden="true"
              />
            </span>
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="absolute w-full py-1 mt-1 overflow-auto text-base bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm z-10">
              {options.map((item) => (
                <Listbox.Option
                  key={item.value}
                  className={({ active }) =>
                    `cursor-default select-none relative py-2 px-3 ${
                      active ? 'text-purple-900 bg-purple-100' : 'text-grey-900'
                    }`
                  }
                  value={item.value}
                >
                  {({ selected }) => (
                    <span
                      className={`block truncate ${
                        selected ? 'font-bold' : 'font-normal'
                      }`}
                    >
                      {item.label}
                    </span>
                  )}
                </                Listbox.Option>
              ))}
              <Listbox.Option
                className={({ active }) =>
                  `cursor-default select-none relative py-2 px-3 ${
                    active ? 'text-purple-900 bg-purple-100' : 'text-grey-900'
                  }`
                }
                value={customOption}
              >
                {({ selected }) => (
                  <span
                    className={`block truncate ${
                      selected ? 'font-bold' : 'font-normal'
                    }`}
                  >
                    {customOption}
                  </span>
                )}
              </Listbox.Option>
            </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  );
}

