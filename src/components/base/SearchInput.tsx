import {useRef} from 'react'

type Props = {
  onChange: (e: string) => void
  value: string
  className?: string
}

const SearchInput = ({onChange, className, value}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null)
  return (
    <div
      onClick={() => inputRef.current?.focus()}
      onMouseOver={() => inputRef.current?.focus()}
      className={`flex items-center p-[9px] bg-white overflow-hidden transition-all w-fit rounded-full ${className}`}
    >
      <svg className="text-purplerain cursor-pointer" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" width="30" height="30">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"></path>
      </svg>
      <input
        type="text"
        onChange={(e) => onChange(e.target.value)}
        value={value}
        ref={inputRef}
        className={`input input-ghost h-[30px] p-0 border-0 focus:outline-0 overflow-hidden transition-all w-0 focus:w-56 focus:pl-2`}
      />
    </div>
  )
}

export default SearchInput