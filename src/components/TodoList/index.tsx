/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState<unknown[]>([]);
  const [newTodo, setNewTodo] = useState('');

  const addTodo = () => {
    setTodos([...todos, { id: Date.now(), text: newTodo, completed: false }]);
    setNewTodo('');
  };

  return (
    <div className="p-4">
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="Adicione uma tarefa"
        className="w-full p-2 mb-2 border rounded"
      />
      <button onClick={addTodo} className="bg-blue-500 text-white px-4 py-2 rounded">
        Adicionar
      </button>
      <ul className="mt-4 space-y-2">
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => {}}
              className="mr-2"
            />
            <span
              onDoubleClick={() => {}}
              className={`cursor-text ${todo.completed ? 'line-through' : ''}`}
            >
              {todo.text}
            </span>
            <button onClick={() => {}} className="ml-2">
              Remover
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;