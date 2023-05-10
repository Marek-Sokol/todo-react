import PlusButton from '../components/PlusButton'

export default function NotFound() {
  return (
    <>
      <div className="m-auto max-w-[800px] rounded-md bg-white flex flex-col">
        <h1>Todos</h1>
      </div>
      <PlusButton
        onClick={() => console.log('cau')}
      />
    </>
  );
}