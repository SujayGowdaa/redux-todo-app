import { useRef, useState } from 'react';
import { Card, CardTitle } from './ui/card';
import { CheckCircle, Edit, Trash } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { updateTodo } from '../slices/todoSlice';

export default function PendingTodo({
  todo,
  dispatch,
  completeTodo,
  deleteTodo,
}) {
  const [isEditFormOpen, setIsEditFormOpen] = useState(false);
  const inputField = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    if (inputField.current.value) {
      const updatedTodo = {
        id: todo.id,
        text: inputField.current.value,
      };

      dispatch(updateTodo(updatedTodo));
      setIsEditFormOpen(false);
    } else {
      alert('add task');
    }
  }

  return (
    <Card className={' p-3 px-4 flex'}>
      <div className=' flex justify-between'>
        {isEditFormOpen ? (
          <form onSubmit={handleSubmit} className=' flex gap-2 w-full'>
            <Input
              defaultValue={todo.text}
              className={'w-full'}
              ref={inputField}
            />
            <Button className={' cursor-pointer'}>Update</Button>
            <Button
              className={' cursor-pointer'}
              variant={'outline'}
              onClick={() => setIsEditFormOpen(false)}
            >
              Close
            </Button>
          </form>
        ) : (
          <>
            <CardTitle>{todo.text}</CardTitle>
            <div className=' flex gap-4'>
              <Edit
                size={'20px'}
                className=' cursor-pointer'
                onClick={() => {
                  setIsEditFormOpen(true);
                }}
              />
              <CheckCircle
                size={'20px'}
                className=' cursor-pointer'
                onClick={() => dispatch(completeTodo(todo.id))}
              />
              <Trash
                size={'20px'}
                className=' cursor-pointer'
                onClick={() => dispatch(deleteTodo(todo.id))}
              />
            </div>
          </>
        )}
      </div>
    </Card>
  );
}
