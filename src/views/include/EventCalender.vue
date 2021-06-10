<template>
  <div>
    
      <div style="padding-bottom: 10px">
        
        <v-btn
            outlined
            class="mr-4"
            color="grey darken-2"
            @click="setToday"
          >
            Today
          </v-btn>
          
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="prev"
          >
            <v-icon small>
              mdi-chevron-left
            </v-icon>
          </v-btn>
          <v-btn
            fab
            text
            small
            color="grey darken-2"
            @click="next"
          >
            <v-icon small>
              mdi-chevron-right
            </v-icon>
          </v-btn>
            <span v-if="$refs.calendar">
            {{ $refs.calendar.title }}
          </span>
        
          <v-toolbar-title  style="    width: 20%;float: right;">
              <select class="form-control" v-model="type" >
                <option value='day'>Day</option>
                <option value='week'>Week</option>
                <option value='month'>Month</option>
                <option value='4day'>4 days</option>
              </select>
          </v-toolbar-title>


      </div>
   
   <div class="mt-2">
     <v-calendar
          ref="calendar"
          v-model="focus"
          color="primary"
          :events="events"
          :event-color="getEventColor"
          :type="type"
          @click:event="showEvent"
          @click:more="viewDay"
          @click:date="viewDay"
          @change="updateRange"
        ></v-calendar>
   </div>
  </div>
</template>

<script>
import axios from 'axios'

  export default {
    data: () => ({
      focus: '',
      type: 'week',
      typeToLabel: {
        month: 'Month',
        week: 'Week',
        day: 'Day',
        '4day': '4 Days',
      },
      selectedEvent: {},
      selectedElement: null,
      selectedOpen: false,
      events: [],
      colors: ['blue', 'indigo', 'deep-purple', 'cyan', 'green', 'orange', 'grey darken-1'],
      names: ['Meeting', 'Holiday', 'PTO', 'Travel', 'Event', 'Birthday', 'Conference', 'Party'],
    }),
    mounted () {
      this.$refs.calendar.checkChange()
      this.$refs.calendar.scrollToTime('07:00')
    },
    methods: {
      viewDay ({ date }) {
        this.focus = date
        this.type = 'day'
      },
      getEventColor (event) {
        return event.color
      },
      setToday () {
        this.focus = ''
      },
      prev () {
        this.$refs.calendar.prev()
      },
      next () {
        this.$refs.calendar.next()
      },
      showEvent ({ nativeEvent, event }) {
        const open = () => {
          this.selectedEvent = event
          this.selectedElement = nativeEvent.target
          requestAnimationFrame(() => requestAnimationFrame(() => this.selectedOpen = true))
        }

        if (this.selectedOpen) {
          this.selectedOpen = false
          requestAnimationFrame(() => requestAnimationFrame(() => open()))
        } else {
          open()
        }

        nativeEvent.stopPropagation()
      },
      updateRange () {
        const events = []

         axios.get("/get-user").then(
                res => {
                    this.events = res.data.appointments
                },
                error => {
                    console.log(error)
                }
          );

        this.events = events
      },
      rnd (a, b) {
        return Math.floor((b - a + 1) * Math.random()) + a
      },
    },
  }
</script>

<style >
.v-calendar .v-event-timed {
    position: absolute;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    font-size: 12px;
    cursor: pointer;
    border-radius: 4px;
    pointer-events: all;
    background: #28b97b;
    color: #fff;
    margin: 5px;
}
button.v-btn.v-btn--fab.v-btn--has-bg.v-btn--round.theme--light.v-size--default.primary {
    background: #28b97b !important;
}
</style>