import { createSlice, nanoid } from '@reduxjs/toolkit';

function getLocalData() {
  if (localStorage.getItem('todos')) {
    return JSON.parse(localStorage.getItem('todos'));
  } else {
    return {
      pendingTodos: {
        data: [],
      },

      completedTodos: {
        data: [],
      },

      deletedTodos: {
        data: [],
      },
    };
  }
}

const initialState = getLocalData();

export const STATUS = Object.freeze({
  PENDING: 'pending',
  COMPLETED: 'completed',
  DELETED: 'deleted',
});

function storeInLocal(state) {
  localStorage.setItem('todos', JSON.stringify(state));
}

export const todoSlice = createSlice({
  name: 'todo',
  initialState,
  reducers: {
    addTodo: (state, action) => {
      const newTodo = {
        id: nanoid(),
        text: action.payload,
        status: STATUS.PENDING,
      };
      state.pendingTodos.data.push(newTodo);

      storeInLocal(state);
    },

    completeTodo: (state, action) => {
      const pendingItem = state.pendingTodos.data.find(
        (todo) => todo.id === action.payload
      );

      if (pendingItem) {
        const changedStatus = { ...pendingItem, status: STATUS.COMPLETED };
        state.completedTodos.data.push(changedStatus);

        state.pendingTodos.data = state.pendingTodos.data.filter(
          (todo) => todo.id !== action.payload
        );
      }

      storeInLocal(state);
    },

    deleteTodo: (state, action) => {
      const pendingTtem = state.pendingTodos.data.find(
        (todo) => todo.id === action.payload
      );

      if (pendingTtem) {
        const changedStatus = { ...pendingTtem, status: STATUS.DELETED };
        state.deletedTodos.data.push(changedStatus);

        state.pendingTodos.data = state.pendingTodos.data.filter(
          (todo) => todo.id !== action.payload
        );
      }

      const completedItem = state.completedTodos.data.find(
        (todo) => todo.id === action.payload
      );

      if (completedItem) {
        const changedStatus = { ...completedItem, status: STATUS.DELETED };
        state.deletedTodos.data.push(changedStatus);

        state.completedTodos.data = state.completedTodos.data.filter(
          (todo) => todo.id !== action.payload
        );
      }
      storeInLocal(state);
    },

    addBackToPending: (state, action) => {
      const deletedItem = state.deletedTodos.data.find(
        (todo) => todo.id === action.payload
      );

      if (deletedItem) {
        const changedStatus = { ...deletedItem, status: STATUS.PENDING };
        state.pendingTodos.data.push(changedStatus);

        state.deletedTodos.data = state.deletedTodos.data.filter(
          (todo) => todo.id !== action.payload
        );
      }

      const completedItem = state.completedTodos.data.find(
        (todo) => todo.id === action.payload
      );

      if (completedItem) {
        const changedStatus = { ...completedItem, status: STATUS.PENDING };
        state.pendingTodos.data.push(changedStatus);

        state.completedTodos.data = state.completedTodos.data.filter(
          (todo) => todo.id !== action.payload
        );
      }

      storeInLocal(state);
    },

    addBackToCompleted: (state, action) => {
      const deletedItem = state.deletedTodos.data.find(
        (todo) => todo.id === action.payload
      );

      if (deletedItem) {
        const changedStatus = { ...deletedItem, status: STATUS.COMPLETED };
        state.completedTodos.data.push(changedStatus);

        state.deletedTodos.data = state.deletedTodos.data.filter(
          (todo) => todo.id !== action.payload
        );
      }

      storeInLocal(state);
    },

    updateTodo: (state, action) => {
      const itemToChange = state.pendingTodos.data.find(
        (todo) => todo.id === action.payload.id
      );

      if (itemToChange) {
        itemToChange.text = action.payload.text;
      }

      storeInLocal(state);
    },

    clearAll: (state) => {
      state.pendingTodos.data = [];
      state.completedTodos.data = [];
      state.deletedTodos.data = [];
      storeInLocal(state);
    },
  },
});

export const {
  addTodo,
  completeTodo,
  deleteTodo,
  addBackToPending,
  addBackToCompleted,
  updateTodo,
  clearAll,
} = todoSlice.actions;
export default todoSlice.reducer;
