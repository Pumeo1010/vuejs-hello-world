<template>
  <div>
    <button v-if="showClearCompletedButton" @click="clearCompleted">Clear Completed Tasks</button>
  </div>
</template>

<script>
export default {
  name: "todo-clear-completed",
  props: {
    showClearCompletedButton: {
      type: Boolean,
      required: true
    }
  },
  methods: {
    clearCompleted() {
      this.$eventBus.$emit('clearCompletedTodos')
    }
  }
};
</script>