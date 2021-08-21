<template>
  <div class="base-timer">
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <g class="base-timer__circle">
        <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
        <path
          :stroke-dasharray="circleDasharray"
          class="base-timer__path-remaining"
          :class="remainingPathColor"
          d="
            M 50, 50
            m -45, 0
            a 45,45 0 1,0 90,0
            a 45,45 0 1,0 -90,0
          "
        ></path>
      </g>
    </svg>
    <span class="base-timer__label">{{ formattedTimeLeft }}</span>
  </div>
</template>

<script>
import { computed, onMounted, ref, watch } from 'vue'

const FULL_DASH_ARRAY = 283
const WARNING_THRESHOLD = 10
const ALERT_THRESHOLD = 5

const COLOR_CODES = {
  info: {
    color: 'green'
  },
  warning: {
    color: 'orange',
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: 'red',
    threshold: ALERT_THRESHOLD
  }
}

const TIME_LIMIT = 95

export default {
  setup (_, { emit }) {
    const timePassed = ref(0)
    const timerInterval = ref(null)

    const timeLeft = computed(() => {
      return TIME_LIMIT - timePassed.value
    })

    const timeFraction = computed(() => {
      const rawTimeFraction = timeLeft.value / TIME_LIMIT
      return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction)
    })

    const circleDasharray = computed(() => {
      return `${(timeFraction.value * FULL_DASH_ARRAY).toFixed(0)} 283`
    })

    const formattedTimeLeft = computed(() => {
      const timeL = timeLeft.value
      const minutes = Math.floor(timeL / 60)
      let seconds = timeL % 60

      if (seconds < 10) {
        seconds = `0${seconds}`
      }

      return `${minutes}:${seconds}`
    })

    const remainingPathColor = computed(() => {
      const { alert, warning, info } = COLOR_CODES

      if (timeLeft.value <= alert.threshold) {
        return alert.color
      } else if (timeLeft.value <= warning.threshold) {
        return warning.color
      } else {
        return info.color
      }
    })

    watch(timeLeft, (newValue, oldValue) => {
      if (newValue === 0) {
        onTimesUp()
      }
    })

    const onTimesUp = () => {
      clearInterval(timerInterval.value)
      emit('endTimer')
    }

    const startTimer = () => {
      timerInterval.value = setInterval(() => (timePassed.value += 1), 1000)
    }

    onMounted(() => {
      startTimer()
    })

    return {
      timePassed,
      timerInterval,
      circleDasharray,
      formattedTimeLeft,
      remainingPathColor
    }
  }
}
</script>
