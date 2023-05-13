import {useForm} from "react-hook-form"
import {yupResolver} from '@hookform/resolvers/yup'
import * as yup from "yup"
import {TodoItem} from "../types"

type Props = {
  onSubmited: (item: TodoItem) => void
  isSubmiting: boolean
}

const schema = yup.object({
  title: yup.string().trim()
    .required('This field is required')
    .min(2, 'Should be at least 2 characters long'),
  content: yup.string().trim()
    .required('This field is required')
    .min(10, 'Please provide more detail'),
  deadline: yup.date()
    .typeError("${value}")
    .min(new Date(), 'Please select a date in future')
    .required('This field is required'),
}).required()

const AddItemForm = ({onSubmited, isSubmiting}: Props) => {
  const {register, handleSubmit, formState: {errors}} = useForm<TodoItem>({
    resolver: yupResolver(schema),
  })

  return (
    <form onSubmit={handleSubmit(onSubmited)} className="w-full max-w-[400px] p-5 rounded-sm bg-white flex flex-col items-center gap-5">
      <section className="w-full">
        <label htmlFor="title">Title</label>
        <input
          {...register("title")}
          className={`input-style ${errors.title?.message ? 'border-red-700' : ''}`}
        />
        <p className="text-red-700">{errors.title?.message}</p>
      </section>
      
      <section className="w-full">
        <label htmlFor="content">Content</label>
        <input
          {...register("content")}
          className={`input-style ${errors.content?.message ? 'border-red-700' : ''}`}
        />
        <p className="text-red-700">{errors.content?.message}</p>
      </section>

      <section className="w-full">
        <label htmlFor="deadline">Deadline</label>
        <input
          {...register("deadline")}
          type="datetime-local"
          name="deadline"
          className={`input-style ${errors.deadline?.message ? 'border-red-700' : ''}`}
        />
        <p className="text-red-700">{errors.deadline?.message}</p>
      </section>

      <button type="submit" className="button-style w-full" disabled={isSubmiting}>
        Create
      </button>
    </form>
  )
}

export default AddItemForm
