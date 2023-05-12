import { useNavigate } from 'react-router-dom';
import { TodoList } from '../types';
import TrashIcon from '../components/base/TrashIcon'
import {useQueryClient, useMutation} from "@tanstack/react-query"
import {deleteList} from '../api/axios'

type Props = {
  list: TodoList;
}

const TodoListItem: React.FC<Props> = ({ list }) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const deleteListMutation = useMutation({
    mutationFn: deleteList,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['allLists'] })
    },
    onError: (err) => {
      console.log({err})
    }
  })

  return (
    <div
      className="w-full flex justify-between p-4 cursor-pointer hover:bg-purplerain-800 bg-purplerain text-white overflow-hidden"
      onClick={() => navigate(`/list/${list.id}`)}
    >
      <strong className="whitespace-nowrap overflow-ellipsis overflow-hidden">{list.title}</strong>
      <TrashIcon
        className="cursor-pointer text-white hover:text-red-700 transition-all ease-in-out delay-150 my-auto"
        width={20}
        height={20}
        onClick={(e: MouseEvent) => {
          e.stopPropagation()
          deleteListMutation.mutate(list.id)}
        }
      />
    </div>
  )
}

export default TodoListItem