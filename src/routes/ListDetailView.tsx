import {useState} from 'react';
import {useParams, useNavigate} from 'react-router-dom';
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query"
import {getList, addItem} from '../api/axios'
import PlusButton from '../components/base/PlusButton'
import TodoItemBox from '../components/TodoItemBox'
import AddItemForm from '../components/AddItemForm'
import Modal from '../components/base/Modal'
import {TodoItem} from '../types'

enum ActiveGroupEnum {
  ALL = 'all',
  DONE = 'done',
  PENDING = 'pending',
}

const ListDetailView: React.FC = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [activeGroup, setActiveGroup] = useState<ActiveGroupEnum>(ActiveGroupEnum.ALL)

  const navigate = useNavigate()
  const {id: listId} = useParams()

  const queryClient = useQueryClient()

  const { isLoading, error, data: list } = useQuery({
    queryKey: ["getList"],
    queryFn: () => getList(listId as string),
  });

  if (listId == null || error != null) navigate('/404')

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      // Invalidate and refetch
      setModalOpened(false)
      queryClient.invalidateQueries({ queryKey: ['getList'] })
    },
    onError: (err) => {
      console.log({err})
    }
  })

  const handleSubmit = (newItem: TodoItem) => {
    addItemMutation.mutate({listId: listId as string, item: {...newItem, completed: false}})
  }

  return (
    <>
      <div className="m-auto max-w-[800px] flex flex-col gap-4">
        <nav className="btn-group m-auto">
          {Object.values(ActiveGroupEnum).map((val) => (
            <button
              key={val}
              className={`btn w-24 hover:bg-purplerain-800 ${activeGroup === val ? 'bg-purplerain-800' : 'bg-purplerain'}`}
              onClick={() => setActiveGroup(val)}
            >
              {val}
            </button>
          ))}
        </nav>
        {isLoading && (
          Array(3).fill(0).map((_, i) => (
            <div
              key={i}
              className="bg-purplerain-800 animate-pulse h-[128px] w-full"
            ></div>
          ))
        )}
        {!isLoading && list != null && (
          list.items.length > 0
          ? (
            list?.items?.map((item) => (
              <TodoItemBox key={item.id} item={item}/>
            ))
          )
          : (
            <p className="w-full pt-4 text-white font-bold text-center">There are no items in this list yet</p>
          )
        )}
      </div>
      <PlusButton
        onClick={() => setModalOpened(true)}
      />
      {modalOpened && (
        <Modal closeFn={() => setModalOpened(false)}>
          <AddItemForm onSubmited={handleSubmit} isSubmiting={addItemMutation.isLoading}/>
        </Modal>
      )}
    </>
  );
}

export default ListDetailView