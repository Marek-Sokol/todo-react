import PlusButton from '../components/PlusButton'
import TodoListItem from '../components/TodoListItem'
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query"
import {getAllLists, addList} from '../api/axios'
import Modal from '../components/Modal'
import {useState, useRef} from 'react'
import {v4 as uuid} from 'uuid';

const HomeView: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const importRef = useRef<HTMLInputElement>(null)
  const queryClient = useQueryClient()

  const { isLoading, error, data: lists } = useQuery({
    queryKey: ["allLists"],
    queryFn: getAllLists,
  });

  const mutation = useMutation({
    mutationFn: addList,
    onSuccess: () => {
      // Invalidate and refetch
      setModalOpened(false)
      queryClient.invalidateQueries({ queryKey: ['allLists'] })
    },
    onError: (err) => {
      console.log({err})
    }
  })

  if (error) return <p>An error has occurred: " + error.message</p>

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    mutation.mutate({
      id: uuid(),
      title: importRef?.current?.value ?? '',
      items: [],
    })
    // setModalOpened(false)
  }

  return (
    <>
      <div className="m-auto max-w-[900px] flex flex-col gap-4 px-[52px]">
        {isLoading && (
          Array(8).fill(0).map((_, i) => (
            <div
              key={i}
              className="bg-purplerain-800 animate-pulse h-[56px] w-full"
            ></div>
          ))
        )}
        {!isLoading && (
          lists?.map((list) => (
            <TodoListItem key={list.id} list={list}/>
          ))
        )}
      </div>
      <PlusButton
        onClick={() => setModalOpened(true)}
      />
      {modalOpened && (
        <Modal closeFn={() => setModalOpened(false)}>
          <form
            onSubmit={handleSubmit}
            className="w-full max-w-[400px] p-5 rounded-sm bg-white flex flex-col items-center gap-5">
            <h1 className="text-2xl"><strong>Create new list</strong></h1>
            <input ref={importRef} type="text" placeholder="New list title.." className="input input-ghost input-bordered focus:outline-0 focus:border-purplerain w-full" />
            <button type="submit" className="btn  hover:bg-purplerain-800 bg-purplerain w-full">
              Create
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default HomeView