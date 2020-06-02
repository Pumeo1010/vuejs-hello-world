<template>
  <div class="todo-item">
    <div class="todo-item-left">
      <input type="checkbox" v-model="completed" @change="doneEdit" />
      <div
        class="todo-item-label"
        v-if="!editing"
        @dblclick="editTodo"
        :class="{completed:completed}"
      >{{title}}</div>
      <input
        class="todo-item-edit"
        v-else
        type="text"
        v-model="title"
        v-focus
        @blur="doneEdit"
        @keyup.enter="doneEdit"
        @keyup.esc="cancelEdit"
      />
    </div>
    <div>
      <button @click="pluralize">Plural</button>
      <span class="remove-item" @click="removeTodo(todo.id)">&times;</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "TodoItem",
  props: {
    todo: {
      type: Object,
      required: true
    },
    checkAll: {
      type: Boolean,
      required: true
    }
  },
  directives: {
    focus: {
      // directive definition
      inserted: function(el) {
        el.focus();
      }
    }
  },
  data() {
    return {
      id: this.todo.id,
      title: this.todo.title,
      completed: this.todo.completed,
      editing: this.todo.editing,
      beforeEditCache: ""
    };
  },
  created() {
    this.$eventBus.$on("pluralize", this.handlePluralize);
  },
  beforeDestroy() {
    this.$eventBus.$off("pluralize", this.handlePluralize);
  },
  watch: {
    checkAll() {
      // if (this.checkAll) {
      //   this.completed = true;
      // } else {
      //   this.completed = this.todo.completed
      // }
      this.completed = this.checkAll ? true : this.todo.completed;
    }
  },
  methods: {
    removeTodo(id) {
      this.$eventBus.$emit("removedTodo", id);
    },
    editTodo() {
      this.beforeEditCache = this.title;
      this.editing = true;
    },
    doneEdit() {
      if (this.title.trim() == "") {
        this.title = this.beforeEditCache;
      }
      this.editing = false;
      this.$eventBus.$emit("finishedEdit", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    },
    cancelEdit() {
      this.title = this.beforeEditCache;
      this.editing = false;
    },
    pluralize() {
      this.$eventBus.$emit("pluralize");
    },
    handlePluralize() {
      this.title = this.title + "s";
      this.$eventBus.$emit("finishedEdit", {
        id: this.id,
        title: this.title,
        completed: this.completed,
        editing: this.editing
      });
    }
  }
};
</script>