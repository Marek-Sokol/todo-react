import {useState, useMemo} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query"
import {getList, addItem} from '../api/axios'
import PlusButton from '../components/base/PlusButton'
import SearchInput from '../components/base/SearchInput'
import TodoItemBox from '../components/TodoItemBox'
import AddItemForm from '../components/AddItemForm'
import Modal from '../components/base/Modal'
import {TodoItem} from '../types'

enum ActiveGroupEnum {
  ALL = 'all',
  DONE = 'done',
  PENDING = 'pending',
}

const ListDetailView = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const [activeGroup, setActiveGroup] = useState<ActiveGroupEnum>(ActiveGroupEnum.ALL)
  const [searchText, setSearchText] = useState<string>('')

  const navigate = useNavigate()
  const {id: listId} = useParams()

  const queryClient = useQueryClient()

  const {isLoading, error, data: list} = useQuery({
    queryKey: ["getList"],
    queryFn: () => getList(listId as string),
  })

  const activeGroupitems = useMemo(() => {
    if (activeGroup === ActiveGroupEnum.ALL) return list?.items ?? []
    if (activeGroup === ActiveGroupEnum.PENDING) return list?.items?.filter(item => !item.completed) ?? []
    return list?.items?.filter(item => item.completed) ?? []
  }, [list, activeGroup])

  const filteredActiveItems = useMemo(() => {
    if (searchText == null || searchText === '') return activeGroupitems
    const regexObj = new RegExp(searchText)
    return activeGroupitems.filter(item => regexObj.test(item.title) || regexObj.test(item.content))
  }, [activeGroupitems, searchText])

  if (listId == null || error != null || (list == null && !isLoading)) navigate('/404')

  const addItemMutation = useMutation({
    mutationFn: addItem,
    onSuccess: () => {
      // Invalidate and refetch
      setModalOpened(false)
      queryClient.invalidateQueries({queryKey: ['getList']})
    },
    onError: (err) => {
      console.log({err})
    },
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
              className={`btn w-24 text-white hover:bg-purplerain-800 ${activeGroup === val ? 'bg-purplerain-800' : 'bg-purplerain'}`}
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
        {!isLoading && list?.items.length === 0 && ((
          <>
            <p className="w-full mt-16 text-white font-bold text-center">There are no items in this list yet</p>
            <button
              className="button-style m-auto mt-5"
              onClick={() => setModalOpened(true)}
            >
              Create your firs item
            </button>
          </>
        ))}
        {!isLoading && list != null && list.items.length > 0 && (filteredActiveItems.length > 0
          ? (
            filteredActiveItems.map((item) => (
              <TodoItemBox key={item.id} item={item}/>
            )))
          : (
            <p className="w-full mt-16 text-white font-bold text-center">There are no items matching your search</p>          
          ))}
      </div>
      <PlusButton
        className="fixed bottom-4 right-4"
        onClick={() => setModalOpened(true)}
      />
      <SearchInput
        className="fixed bottom-20 right-4"
        onChange={(e) => setSearchText(e)}
        value={searchText}
      />
      {modalOpened && (
        <Modal closeFn={() => setModalOpened(false)}>
          <AddItemForm onSubmited={handleSubmit} isSubmiting={addItemMutation.isLoading}/>
        </Modal>
      )}
    </>
  )
}

export default ListDetailView