import PlusButton from '../components/base/PlusButton'
import TodoListItem from '../components/TodoListItem'
import {useQuery, useQueryClient, useMutation} from "@tanstack/react-query"
import {getAllLists, addList} from '../api/axios'
import Modal from '../components/base/Modal'
import {useState} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import toast from 'react-hot-toast';

const schema = yup.object({
  title: yup.string().trim()
    .required('This field is required')
    .min(2, 'Should be at least 2 characters long'),
}).required()

const HomeView = () => {
  const [modalOpened, setModalOpened] = useState<boolean>(false)
  const queryClient = useQueryClient()

  const { isLoading, error, data: lists } = useQuery({
    queryKey: ["allLists"],
    queryFn: getAllLists,
  });

  const mutation = useMutation({
    mutationFn: addList,
    onSuccess: () => {
      setModalOpened(false)
      queryClient.invalidateQueries({ queryKey: ['allLists'] })
    },
    onError: () => {
      toast('An error occured while creating list')
    }
  })

  const { register, handleSubmit, formState: { errors } } = useForm<{title: string}>({
    resolver: yupResolver(schema)
  })

  if (error) return <h1 className="text-white text-2xl w-full align-middle">There was a problem loading this content</h1>

  return (
    <>
      <div className="m-auto max-w-[800px] flex flex-col gap-4">
        {isLoading && (
          Array(4).fill(0).map((_, i) => (
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
        className="fixed bottom-4 right-4"
        onClick={() => setModalOpened(true)}
      />
      {modalOpened && (
        <Modal closeFn={() => setModalOpened(false)}>
          <form
            onSubmit={handleSubmit((val) => mutation.mutate(val.title))}
            className="w-full max-w-[400px] p-5 rounded-sm bg-white flex flex-col items-center gap-5">
            <h1 className="text-2xl"><strong>Create new list</strong></h1>
            <section className="w-full">
              <input
                {...register("title")}
                className={`input-style ${errors.title?.message ? 'border-red-700' : ''}`}
                type="text"
                placeholder="New list title.."
              />
              <p className="text-red-700">{errors.title?.message}</p>
            </section>
            <button type="submit" className="button-style w-full">
              Create
            </button>
          </form>
        </Modal>
      )}
    </>
  );
}

export default HomeView