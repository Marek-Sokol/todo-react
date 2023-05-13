import axios from "axios"
import {TodoList, TodoItem} from '../types'

export const client = axios.create({
  baseURL: "https://645cd460250a246ae30f6d39.mockapi.io",
  headers: {
    "Content-type": "application/json",
  },
})

// Lists
export const getAllLists = async () => {
  const response = await client.get<TodoList[]>("/lists")
  return response.data
} 

export const getList = async (id: string) => {
  const response = await client.get<TodoList>(`/lists/${id}`)
  return response.data
} 

export const addList = async (title: string) => {
  const response = await client.post<TodoList>("/lists", {title, items: []})
  return response.data
}

export const deleteList = async (id: string) => {
  const response = await client.delete<TodoList>(`/lists/${id}`)
  return response.data
} 

export const updateList = async (options: {id: string, listTada: TodoList}) => {
  const {id, listTada} = options
  const response = await client.put<TodoList>(`/lists/${id}`, listTada)
  return response.data
} 

// Items

export const getItem = async (options: {listId: string, itemId: string}) => {
  const {listId, itemId} = options
  const response = await client.get<TodoItem>(`/lists/${listId}/item/${itemId}`)
  return response.data
} 

export const addItem = async (options: {listId: string, item: TodoItem}) => {
  const {listId, item} = options
  const response = await client.post<TodoItem>(`/lists/${listId}/item`, item)
  return response.data
} 

export const deleteItem = async (options: {listId: string, itemId: string})  => {
  const {listId, itemId} = options
  const response = await client.delete<TodoItem[]>(`/lists/${listId}/item/${itemId}`)
  return response.data
} 

export const updateItem = async (options: {listId: string, itemId: string, item: TodoItem})  => {
  const {listId, itemId, item} = options
  const response = await client.put<TodoItem[]>(`/lists/${listId}/item/${itemId}`, item)
  return response.data
} 