import {TodoItem} from '../types'
import TrashIcon from '../components/base/TrashIcon'
import {useQueryClient, useMutation} from "@tanstack/react-query"
import {deleteItem, updateItem} from '../api/axios'
import toast from 'react-hot-toast';

type Props = {
  item: TodoItem;
}

const TodoItemBox: React.FC<Props>  = ({ item }) => {
  const queryClient = useQueryClient()

  const completeItemMutation = useMutation({
    mutationFn: updateItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getList'] })
    },
    onError: () => {
      toast('An error occured while updating item')
    }
  })

  const deleteItemMutation = useMutation({
    mutationFn: deleteItem,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['getList'] })
    },
    onError: () => {
      toast('An error occured while deleting item')
    }
  })

  return (
    <div className="flex flex-row items-center p-5 bg-purplerain">
      <input
        type="checkbox"
        className="checkbox mr-5 accent-current border-white checked:text-purpleback checked:border-purpleback"
        checked={item.completed}
        disabled={completeItemMutation.isLoading || deleteItemMutation.isLoading}
        onChange={() =>
          completeItemMutation.mutate({
            listId: item.listId,
            itemId: item.id,
            item: {...item, completed: !item.completed}
          })
        }
      />
      <div className="flex flex-col grow gap-2">
        <section className="text-white text-lg font-bold capitalize">
          {item.title}
        </section>
        <section className="text-mist">
          {item.content}
        </section>
        <section className="text-purpleback text-sm">
          {`${new Date(item.deadline).toDateString()} ${new Date(item.deadline).toLocaleTimeString()}`}
        </section>
      </div>
      <TrashIcon
        className="cursor-pointer text-white hover:text-red-700 transition-all ease-in-out delay-150"
        width={30}
        height={30}
        disabled={completeItemMutation.isLoading || deleteItemMutation.isLoading}
        onClick={() =>
          deleteItemMutation.mutate({
            listId: item.listId,
            itemId: item.id,
          })
        }
      />
    </div>
  )
}

export default TodoItemBox