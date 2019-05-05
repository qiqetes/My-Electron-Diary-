<template>
  <div class="main">
    <div class="diary">
      <h3>{{this.textDate()}}</h3>
      <textarea v-model="this.dayJson.diary" placeholder="Escriu algo prim"></textarea>
      <div v-for="diary in this.dayJson.pastDiary" :key="diary.day">
        <h2>
          {{diary.thought}}
          <span>{{shortTextDate(diary.day,diary.month)}}</span>
        </h2>
      </div>
    </div>

    <calendar
      v-bind:json="json.days"
      v-bind:selected="[selectedDay,selectedMonth]"
      v-on:select-day="select($event)"
    ></calendar>
  </div>
</template>

<script>
import Calendar from "./components/Calendar.vue";
import emptyJson from "../../static/emptySave.json";

export default {
  name: "app",
  components: {
    Calendar
  },
  methods: {
    // Required by electron
    open(link) {
      require("electron").shell.openExternal(link);
    },

    // Called when the signal select-day is recieved
    // Handles the change of the attributes when another day is selected
    // params is an object {day:1, month:2}
    select(params) {
      this.selectedDay = params.day;
      this.selectedMonth = params.month;
      this.selectedYear = 2019;
      for (let i = 0; i < this.json.days[0].days.length; i++) {
        if (
          this.json.days[0].days[i].day === params.day &&
          this.json.days[0].days[i].month - 1 === params.month
        ) {
          console.log("day found");
          this.dayJson = this.json.days[0].days[i];
          return;
        }
      }
      this.dayJson = "";
    },

    // Return the selectedDate in text format
    // Todo: add other languajes
    textDate() {
      let daysOfWeek = [
        "Lunes",
        "Martes",
        "Miercoles",
        "Jueves",
        "Viernes",
        "Sábado",
        "Domingo"
      ];
      let months = [
        "Enero",
        "Febrero",
        "Marzo",
        "Abril",
        "Mayo",
        "Junio",
        "Julio",
        "Agosto",
        "Septiembre",
        "Octubre",
        "Noviembre",
        "Diciembre"
      ];

      let date = new Date(2019, this.selectedMonth, this.selectedDay);
      date = new Date(date.getTime());
      //let dayNum = date.getDay() > 0? date.getDay() -1:6;
      return (
        daysOfWeek[date.getUTCDay()] +
        ", " +
        ("0" + date.getDate()).slice(-2) +
        " " +
        months[date.getUTCMonth()] +
        " " +
        date.getFullYear()
      );
    },

    // Return date in text format
    shortTextDate(day, month) {
      let months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dic"
      ];
      let date = new Date(2019, day, month);
      return (
        ("0" + date.getDate()).slice(-2) +
        " " +
        months[date.getMonth()] +
        " " +
        date
          .getFullYear()
          .toString()
          .substr(2, 4)
      );
    }
  },

  data() {
    return {
      diary: "",
      json: "",
      dayJson: "",
      selectedDay: null,
      selectedMonth: null,
      selectedYear: 2019, // TODO: year has to be also selectable
      dataFolder: "" // App data folder path
    };
  },

  // Launched at the creation of the component
  created: function() {
    // Select by defect the day of today
    let todayDate = new Date();
    this.selectedDay = ("0" + todayDate.getDate()).slice(-2);
    this.selectedMonth = todayDate.getUTCMonth();

    // Get %appdata% folder
    const remote = require("electron").remote;
    const app = remote.app;
    // TODO: check if linux and mac work with it.
    // Careful, doesn't get the same path running on developement server.
    this.dataFolder = app.getPath("userData") + "\\savedata.json";

    // Check if json exists, if it doesn't create a new json savedata
    const fs = require("fs"); // File system import from node
    fs.access(this.dataFolder, fs.constants.F_OK, err => {
      if (err) {
        // File doesn't exist
        // Todo create a formated json file
        console.log("creating json file...");
        let newData = "";
        newData = emptyJson.toString();
        fs.writeFile(this.dataFolder, newData, function(err) {
          if (err) {
            return console.log(err);
          }

          console.log("savedata.json created");
        });
      } else {
        // File exists
        console.log("json savedata found: ");
      }
    });
  }
};
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css?family=Ubuntu+Mono:400,700");
$dark-text: #4e4e4e;
$main-color: rgb(151, 150, 135);
body {
  background-color: #191919;
  color: $main-color;
  font-family: "Ubuntu Mono", monospace;
  height: 100%;
  //overflow: hidden;
  h3 {
    color: $dark-text;
    font-weight: 400;
  }
}
h2 {
  font-weight: 400;
  font-size: 1.5em;
  span {
    font-size: 0.6em;
    font-weight: 200;
    color: $dark-text;
  }
}
.main {
  height: 100%;
}
.diary {
  box-sizing: border-box;
  padding: 2% 0 5% 6%;
  margin-right: calc(320px + 8%);
  height: 100%;
}
textarea {
  font-family: "Ubuntu mono", monospace;
  width: 100%;
  background-color: transparent;
  border: none;
  outline: none;
  color: $main-color;
  resize: none;
  font-size: 1.5em;
  height: 20vh;
}
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  -webkit-border-radius: 10px;
  border-radius: 10px;
  background: $dark-text;
}
::-webkit-scrollbar-track {
  background-color: transparent;
  -webkit-border-radius: 10px;
  border-radius: 10px;
}
::placeholder {
  /* Chrome, Firefox, Opera, Safari 10.1+ */
  color: $dark-text;
}
</style>