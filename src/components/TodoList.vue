<template>
  <div>
    <input
      type="text"
      class="todo-input"
      placeholder="What are you doing today?"
      v-model="newTodo"
      @keyup.enter="addTodo"
    />
    <transition-group
      name="fade"
      enter-active-class="animated fadeInUp"
      leave-active-class="animated fadeOutDown"
    >
      <todo-item
        v-for="todo in todosFiltered"
        :key="todo.id"
        :todo="todo"
        :checkAll="!anyRemaining"
      ></todo-item>
    </transition-group>

    <div class="extra-container">
      <todo-check-all :anyRemaining="anyRemaining"></todo-check-all>
      <todo-item-remaining></todo-item-remaining>
    </div>

    <div class="extra-container">
      <todo-filter></todo-filter>

      <div>
        <transition name="fade">
          <todo-clear-completed></todo-clear-completed>
        </transition>
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem";
import TodoItemRemaining from "./TodoItemRemaining";
import TodoCheckAll from "./TodoCheckAll";
import TodoFilter from "./TodoFilter";
import TodoClearCompleted from "./TodoClearCompleted";

export default {
  name: "TodoList",
  components: {
    TodoItem,
    TodoItemRemaining,
    TodoCheckAll,
    TodoFilter,
    TodoClearCompleted
  },
  data() {
    return {
      newTodo: "",
      idForTodo: 0
    };
  },
  computed: {
    anyRemaining() {
      return this.$store.getters.anyRemaining;
    },
    todosFiltered() {
      return this.$store.getters.todosFiltered;
    }
  },
  methods: {
    addTodo() {
      if (this.newTodo.trim().length == 0) {
        return;
      }

      this.$store.commit("addTodo", {
        id: this.idForTodo,
        title: this.newTodo
      });
      this.newTodo = "";
      this.idForTodo++;
    }
  }
};
</script>

<style lang="scss">
@import url("https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.0.0/animate.compat.css");

.todo-input {
  width: 100%;
  padding: 10px 18px;
  font-size: 18px;
  margin-bottom: 16px;
  &:focus {
    outline: 0;
  }
}

.todo-item {
  margin-bottom: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  animation-duration: 0.4s;
}

.remove-item {
  cursor: pointer;
  &:hover {
    color: black;
  }
}

.todo-item-left {
  display: flex;
  align-items: center;
}

.todo-item-label {
  padding: 10px;
  border: 1px solid white;
  margin-left: 12px;
}

.todo-item-edit {
  font-size: 24px;
  color: #2c3e50;
  margin-left: 12px;
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  &:focus {
    outline: none;
  }
}

.completed {
  text-decoration: line-through;
  color: grey;
}

.extra-container {
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 16px;
  border-top: 1px solid lightgray;
  padding-top: 14px;
  margin-bottom: 14px;
}

button {
  font-size: 14px;
  background-color: white;
  appearance: none;
  margin-right: 10px;
  &:hover {
    background: lightgreen;
  }
  &:focus {
    outline: none;
  }
}

.active {
  background: lightgreen;
}
</style>