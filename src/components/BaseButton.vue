<script>
export default {
  name: "BaseButton",
  props: {
    color: {
      type: String,
      default: "pink",
    },
  },
  computed: {
    bgColor() {
      switch (this.color) {
        case "orange":
          return "bg-orange hover:bg-pink";

        case "lightblue":
          return "bg-lightblue hover:bg-pink";
        case "green":
          return "bg-green  text-dark hover:bg-pink";

        default:
          return "bg-pink hover:bg-lightblue";
      }
    },
  },
};
</script>

<template>
  <button
    type="submit"
    :class="`transition text-sm md:text-base xl:text-xl font-medium py-2 px-6 rounded-3xl ${bgColor}`"
  >
    <slot></slot>
  </button>
</template>
