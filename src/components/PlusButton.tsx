type Props = {
  onClick: () => void;
}

const PlusButton = ({ onClick }: Props) => {
  return (
    <button
      className="btn btn-circle hover:bg-purplerain-800 bg-purplerain absolute bottom-4 right-4"
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 rotate-45" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
    </button>
  )
}

export default PlusButton