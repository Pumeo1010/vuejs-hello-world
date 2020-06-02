<template>
  <div>{{remaining}} items left</div>
</template>

<script>
export default {
  name: "TodoRemaining",
  props: {
    remaining: {
      type: Number,
      required: true
    }
  }
};
</script>