<template>
  <div class="day">
    <button v-on:click="handleClick" v-bind:class="selected?'selected':''">
      <div class="full" v-if="full"></div>
    </button>
  </div>
</template>

<script>
export default {
  name: "day",
  methods: {
    handleClick: function() {
      this.$emit("select-day", { day: this.day, month: this.month });
      console.log("emiting from day: ", this.day, this.month);
    }
  },
  props: {
    full: Boolean,
    day: Number,
    month: Number,
    selected: Boolean
    //select: Function
  }
};
</script>

<style lang="scss">
$main-color: rgb(151, 150, 135);
.day {
  margin-top: 8px;
  margin-left: 8px;
  width: 16px;
  height: 16px;
  border: 1px $main-color solid;
  border-radius: 2px;
  //background-color: rgb(151, 150, 135);
  .selected {
    outline: 3px $main-color solid;
    //box-shadow: 0 0 0pt 2pt $main-color;
    border: none;
    animation: push 1s linear infinite;
  }
  @keyframes push {
    0% {
      outline: 1px $main-color solid;
    }
    33% {
      outline: 3px $main-color solid;
    }
    66% {
      outline: 3px $main-color solid;
    }
    100% {
      outline: 1px $main-color solid;
    }
  }
}
button {
  margin: 0;
  padding: 1px;
  width: 100%;
  height: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
}

.full {
  width: 14px;
  margin: 0px;
  height: 14px;
  background-color: $main-color;
}
</style>