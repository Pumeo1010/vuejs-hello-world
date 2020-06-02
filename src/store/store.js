import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    todos: [
      // {
      //   id: 1,
      //   title: "Finish First Thing",
      //   completed: false,
      //   editing: false,
      // },
      // {
      //   id: 2,
      //   title: "Finish Second Thing",
      //   completed: false,
      //   editing: false,
      // },
    ],
    filter: "all",
  },
  getters: {
    remaining(state) {
      return state.todos.filter((item) => !item.completed).length;
    },
    anyRemaining(state, getters) {
      return getters.remaining != 0;
    },
    todosFiltered(state) {
      if (state.filter == "all") {
        return state.todos;
      } else if (state.filter == "active") {
        return state.todos.filter((item) => !item.completed);
      } else if (state.filter == "completed") {
        return state.todos.filter((item) => item.completed);
      }
      return state.todos;
    },
    showClearCompletedButton(state) {
      return state.todos.filter((item) => item.completed).length > 0;
    },
  },
  mutations: {
    addTodo(state, todo) {
      state.todos.push({
        id: todo.id,
        title: todo.title,
        completed: false,
        editing: false,
      });
    },
    updateTodo(state, todo) {
      const index = state.todos.findIndex((item) => item.id == todo.id);
      state.todos.splice(index, 1, {
        id: todo.id,
        title: todo.title,
        completed: todo.completed,
        editing: todo.editing,
      });
    },
    deleteTodo(state, id) {
      const index = state.todos.findIndex((item) => item.id == id);
      state.todos.splice(index, 1);
    },
    checkAll(state, checked) {
      state.todos.forEach((item) => (item.completed = checked));
    },
    updateFilter(state, filter) {
      state.filter = filter;
    },
    clearCompleted(state) {
      state.todos = state.todos.filter((item) => !item.completed);
    },
  },
});
