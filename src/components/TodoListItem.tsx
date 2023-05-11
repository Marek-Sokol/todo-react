import { useNavigate } from 'react-router-dom';
import { TodoList } from '../types';

type Props = {
  list: TodoList;
}

const TodoListItem: React.FC<Props> = ({ list }) => {
  const navigate = useNavigate()
  return (
    <div
      className="w-full p-4 cursor-pointer hover:bg-purplerain-800 bg-purplerain text-white flex overflow-hidden"
      onClick={() => navigate(`/${list.id}`)}
    >
      <strong className="whitespace-nowrap overflow-ellipsis overflow-hidden">{list.title}</strong>
    </div>
  )
}

export default TodoListItem