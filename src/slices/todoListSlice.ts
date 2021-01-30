import { createSlice, PayloadAction, createEntityAdapter } from "@reduxjs/toolkit";

let nextId = 0

export type TodoType = {
  id: number;
  message: string;
};

const initialState: TodoType[] = [];

const todoListAdapter = createEntityAdapter<TodoType>({
  selectId: (todo) => todo.id,
  sortComparer: (a, b) => a.id - b.id
})

const todoListSlice = createSlice({
    name: "todo",
    initialState: todoListAdapter.getInitialState(initialState),
    reducers: {
      addTodo: {
        // INFO: EntityAdapterを使うとこれが
        // reducer: (state, action: PayloadAction<TodoType>) => {
        //   const { id, message } = action.payload;
        //   state.push({ id, message })
        // },
        // INFO: こうかける
        reducer: todoListAdapter.addOne,
        prepare: (message: string) => {
          return { payload: { id: nextId++, message } }
        }
      },
    },
});

export const { selectAll } = todoListAdapter.getSelectors();
export const { addTodo } = todoListSlice.actions;
export default todoListSlice.reducer;