import axios from "axios";
import {TodoList, TodoItem} from '../types';

export const client = axios.create({
  baseURL: "https://645cd460250a246ae30f6d39.mockapi.io",
  headers: {
    "Content-type": "application/json",
  },
});

// Lists
export const getAllLists = async () => {
  const response = await client.get<TodoList[]>("/lists");
  return response.data;
} 

export const getList = async (id: number) => {
  const response = await client.get<TodoList>(`/lists/${id}`);
  return response.data;
} 

export const addList = async (list: TodoList) => {
  const response = await client.post<TodoList>("/lists", list);
  return response.data;
} 

export const deleteList = async (id: number) => {
  const response = await client.delete<TodoList>(`/lists/${id}`);
  return response.data;
} 

export const updateList = async (id: number, listTada: TodoList) => {
  const response = await client.put<TodoList>(`/lists/${id}`, listTada);
  return response.data;
} 

// Items

export const getItem = async (listId: number, itemId: number) => {
  const response = await client.get<TodoItem>(`/lists/${listId}/item/${itemId}`);
  return response.data;
} 

export const addItem = async (listId: number, item: TodoItem) => {
  const response = await client.post<TodoItem>(`/lists/${listId}/item`, item);
  return response.data;
} 

export const deleteItem = async (listId: number, itemId: number)  => {
  const response = await client.delete<TodoItem[]>(`/lists/${listId}/item/${itemId}`);
  return response.data;
} 

export const updateItem = async (listId: number, itemId: number, item: TodoItem)  => {
  const response = await client.put<TodoItem[]>(`/lists/${listId}/item/${itemId}`, item);
  return response.data;
} 