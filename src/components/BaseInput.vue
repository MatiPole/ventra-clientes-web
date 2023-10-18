<script>
export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: String,
    },
    color: {
      type: String,
      default: "orange",
    },
  },
  computed: {
    borderColor() {
      switch (this.color) {
        case "lightblue":
          return "border-lightblue";

        default:
          return "border-orange";
      }
    },
  },
};
</script>

<template>
  <input
    :value="modelValue"
    :class="`bg-transparent border-solid border-b-2 border-t-0 ${borderColor} border-l-0 border-r-0 mb-8 w-full rounded-md`"
    @input="$emit('update:modelValue', $event.target.value)"
  />
</template>
