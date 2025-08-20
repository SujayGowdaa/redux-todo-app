import { useDispatch, useSelector } from 'react-redux';
import { Button } from './components/ui/button';
import { Input } from './components/ui/input';
import { Card, CardTitle } from './components/ui/card';
import { TypographyH1 } from './components/ui/typographyH1';
import { TypographyH3 } from './components/ui/typographyH3';
import {
  CheckCircle,
  CloudDownload,
  PlusCircle,
  Trash,
  Undo2,
} from 'lucide-react';
import { useRef } from 'react';
import {
  addBackToCompleted,
  addBackToPending,
  addTodo,
  clearAll,
  completeTodo,
  deleteTodo,
  fetchTodo,
} from './slices/todoSlice';
import PendingTodo from './components/PendingTodo';

function App() {
  const inputRef = useRef();
  const todos = useSelector((state) => state.todo);
  const dispatch = useDispatch();

  const { pendingTodos, completedTodos, deletedTodos } = todos;

  function handleSubmit(e) {
    e.preventDefault();

    if (inputRef.current.value) {
      dispatch(addTodo(inputRef.current.value));
      inputRef.current.value = '';
    } else {
      alert('enter todo');
    }
  }

  return (
    <div className=' flex flex-col gap-16 p-8 container mx-auto h-screen'>
      <header>
        <TypographyH1>
          TODO List Powered by{' '}
          <span className=' text-purple-600'>React-Redux-Toolkit</span>
        </TypographyH1>
      </header>
      <main className=' flex flex-col gap-10'>
        <form className=' container mx-auto space-y-4' onSubmit={handleSubmit}>
          <TypographyH3>What is your next task?</TypographyH3>
          <div className=' flex flex-col gap-4'>
            <Input
              type={'text'}
              placeholder={'Enter your todo'}
              ref={inputRef}
            />
            <div className=' flex grow gap-4 w-full'>
              <Button
                className={` ${
                  todos.isLoading ? 'cursor-not-allowed' : 'cursor-pointer'
                }  grow bg-purple-600 hover:bg-purple-500`}
                variant={'destructive'}
                onClick={() => dispatch(fetchTodo())}
                type={'button'}
              >
                {`${todos.isLoading ? 'Fetching...' : 'Fetch Todo'}`}{' '}
                <CloudDownload />
              </Button>
              <Button className={' cursor-pointer grow'}>
                Add Todo <PlusCircle />
              </Button>
              <Button
                className={
                  ' cursor-pointer grow text-red-800 hover:bg-red-600 hover:text-white'
                }
                variant={'outline'}
                type='button'
                onClick={() => dispatch(clearAll())}
              >
                Clear All <Trash />
              </Button>
            </div>
            {todos.isError && (
              <p className=' text-red-800 text-sm'>Something went wrong!</p>
            )}
          </div>
        </form>
        <div className=' space-y-6'>
          <section className=' space-y-2'>
            <h2 className=' font-bold uppercase text-purple-600'>Pending</h2>
            <div className=' space-y-4'>
              {pendingTodos.data.length > 0 ? (
                <>
                  {pendingTodos.data.map((todo) => (
                    <PendingTodo
                      key={todo.id}
                      todo={todo}
                      dispatch={dispatch}
                      completeTodo={completeTodo}
                      deleteTodo={deleteTodo}
                    />
                  ))}
                </>
              ) : (
                <Card
                  className={
                    ' p-3 px-4 flex capitalize text-gray-600 text-sm font-medium bg-gray-100'
                  }
                >
                  no pending tasks
                </Card>
              )}
            </div>
          </section>
          <section className=' space-y-2'>
            <h2 className=' font-bold uppercase text-green-600'>Completed</h2>
            <div className=' space-y-4'>
              {completedTodos.data.length > 0 ? (
                <>
                  {completedTodos.data.map((todo) => (
                    <Card
                      className={' p-3 px-4 bg-green-50 text-green-600'}
                      key={todo.id}
                    >
                      <div className=' flex justify-between'>
                        <CardTitle>{todo.text}</CardTitle>
                        <div className=' flex gap-4'>
                          <Undo2
                            size={'20px'}
                            className=' cursor-pointer'
                            onClick={() => dispatch(addBackToPending(todo.id))}
                          />
                          <Trash
                            size={'20px'}
                            className=' cursor-pointer'
                            onClick={() => dispatch(deleteTodo(todo.id))}
                          />
                        </div>
                      </div>
                    </Card>
                  ))}
                </>
              ) : (
                <Card
                  className={
                    ' p-3 px-4 flex capitalize text-gray-600 text-sm font-medium bg-gray-100'
                  }
                >
                  no completed tasks
                </Card>
              )}
            </div>
          </section>
          <section className=' space-y-2'>
            <h2 className=' font-bold uppercase text-red-600'>Deleted</h2>
            {deletedTodos.data.length > 0 ? (
              <>
                {deletedTodos.data.map((todo) => (
                  <Card
                    className={' p-3 px-4 bg-red-50 text-red-600'}
                    key={todo.id}
                  >
                    <div className=' flex justify-between'>
                      <CardTitle className={' line-through'}>
                        {todo.text}
                      </CardTitle>
                      <div className=' flex gap-4'>
                        <Undo2
                          size={'20px'}
                          className=' cursor-pointer'
                          onClick={() => dispatch(addBackToPending(todo.id))}
                        />
                        <CheckCircle
                          size={'20px'}
                          className=' cursor-pointer'
                          onClick={() => dispatch(addBackToCompleted(todo.id))}
                        />
                      </div>
                    </div>
                  </Card>
                ))}
              </>
            ) : (
              <Card
                className={
                  ' p-3 px-4 flex capitalize text-gray-600 text-sm font-medium bg-gray-100'
                }
              >
                no deleted tasks
              </Card>
            )}
          </section>
        </div>
      </main>
      <footer className=' text-center text-gray-400 grow pb-12'>
        Practice Project by{' '}
        <span className='  font-medium'>SUJAY GOWDA 💀</span>
      </footer>
    </div>
  );
}

export default App;
