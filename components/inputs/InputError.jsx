import { ExclamationCircleIcon } from "@heroicons/react/20/solid";

export default function InputError({title,value,name,changeFunction, type='text', errorMessage,id}) {
  
  return (
    <div>
      <label
        htmlFor={id}
        className="block text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="relative mt-1 rounded-md shadow-sm">
        <input
          type={type}
          name={name}
          id={id}
          onChange={(e) => changeFunction(e.target.value)}
          value={value}
          
          className="block w-full rounded-md border-red-300 pr-10 text-red-900 placeholder-red-300 focus:border-red-500 focus:outline-none focus:ring-red-500 sm:text-sm"
          aria-invalid="true"
        />
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <ExclamationCircleIcon
            className="h-5 w-5 text-red-500"
            aria-hidden="true"
          />
        </div>
      </div>
      <p className="mt-2 text-sm text-red-600" id="email-error">
        {errorMessage}
      </p>
    </div>
  );
}
