<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed Tasks</button>
  </div>
</template>

<script>
export default {
  name: "todo-clear-completed",
  computed: {
    showClearCompletedButton() {
      return this.$store.getters.showClearCompletedButton;
    }
  },
  methods: {
    clearCompleted() {
      this.$store.commit("clearCompleted");
      this.$store.state.todos = this.$store.state.todos.filter(
        item => !item.completed
      );
    }
  }
};
</script>