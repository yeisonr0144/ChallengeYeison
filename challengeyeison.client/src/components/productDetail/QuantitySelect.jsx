import { Fragment, useState } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

export default function QuantitySelect({ stock = 4, onChange }) {
    const [selected, setSelected] = useState(1);
    const options = Array.from({ length: stock }, (_, i) => i + 1);

    const handleChange = (value) => {
        setSelected(value);
        if (onChange) onChange(value);
    };

    return (
        <div className="relative inline-block text-left">
            <Listbox value={selected} onChange={handleChange}>
                <div className="relative">
                    {/* Botón desplegable */}
                    <Listbox.Button className="flex items-center text-sm text-blue-600 font-normal bg-transparent focus:outline-none focus:ring-0 focus:border-0">
                        <span className="font-semibold text-black">
                            {selected} {selected === 1 ? "unidad" : "unidades"}
                        </span>
                        <span className="ml-1 text-[10px] text-blue-600">
                            <ChevronDownIcon className="h-3 w-3" />
                        </span>
                    </Listbox.Button>

                    {/* Opciones */}
                    <Transition
                        as={Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options className="absolute mt-1 w-40 rounded-md bg-white shadow-lg border border-gray-200 z-10 text-sm">
                            {options.map((number) => (
                                <Listbox.Option
                                    key={number}
                                    value={number}
                                    className={({ active }) =>
                                        `cursor-pointer px-4 py-2 select-none ${active
                                            ? "text-blue-600 bg-blue-50"
                                            : "text-gray-900"
                                        }`
                                    }
                                >
                                    {number} {number === 1 ? "unidad" : "unidades"}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            </Listbox>
        </div>
    );
}
