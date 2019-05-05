<template>
  <div class="calendar">
    <div class="month" v-for="m in 12" :key="m">
      <div class="days" v-for="d in daysInMonth(m,2019)" :key="d+m">
        <day
          :full="isFull(d,m-1)"
          :selected="m-1==selected[1] && d==selected[0]"
          :month="m-1"
          :day="d"
          v-on:select-day="selectDay($event)"
        ></day>
      </div>
    </div>
  </div>
</template>

<script>
import day from "./Day.vue";
export default {
  name: "calendar",
  components: {
    day
  },
  methods: {
    isFull: function(day, month) {
      for (let i = 0; i < this.json[0].days.length; i++) {
        if (
          this.json[0].days[i].day === day &&
          this.json[0].days[i].month - 1 === month
        ) {
          return true;
        }
      }
      return false;
    },
    daysInMonth: function(month, year) {
      return new Date(year, month, 0).getDate();
    },
    selectDay: function(params) {
      this.$emit("select-day", params);
    }
  },
  props: {
    json: Array,
    selected: Array
  }
};
</script>

<style lang="scss">
.month {
  float: left;
}
.calendar {
  float: right;
  top: 6%;
  right: 6%;
  position: absolute;
  width: 320px;
}
</style>