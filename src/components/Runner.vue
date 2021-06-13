<template>
  <h3 id="title" class="container animate__animated animate__slideInDown">Type Game</h3>
  <div class="runner container animate__animated animate__zoomIn">
    <h3 v-if="loading">Loading...</h3>
    <h4 v-if="!loading">Your Score: <span id="sc">{{ score }}</span> / <span id="sc">{{ mapKeywords.length }}</span></h4>
    <p>
      <span
        v-for="keyword in mapKeywords"
        v-bind:key="keyword.text"
        v-bind:class="{ correct: keyword.correct, wrong: keyword.wrong }"
      >
        {{ '||' }}
        {{ keyword.text }}
        {{ '||' }}
      </span>
    </p>
    <div class="row animate__animated animate__zoomIn" v-if="mapKeywords[index]">
      <div class="row">
        <div class="input-field col s6">
          <input
            id="last_name"
            type="text"
            class="validate"
            v-model="input"
            v-on:keyup.enter="calcword"
            required
          />
          <label for="last_name">Word</label>
        </div>
        <div class="timer">
          <Timer />
          <!-- @endTimer="timeLeft" -->
        </div>
      </div>
    </div>
    <div v-else class="thanks">
      <h4 v-if="!loading">Thanks for Playing !!!</h4>
      <a class="indigo darken-1 waves-effect waves-light btn-small" href="/">play Again</a>
    </div>
  </div>
</template>

<script>
import Timer from './Timer.vue'
import { computed, ref, onBeforeMount } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'

export default {
  data: function () {
    return {
      emitVal: 0
    }
  },
  components: {
    Timer
  },
  setup () {
    const index = ref(0)
    const input = ref('')
    const loading = ref(false)
    const words = ref([])
    const score = ref(0)

    // life cycle
    onBeforeMount(() => {
      loading.value = true
      axios
        .get('https://random-word-api.herokuapp.com/word?number=20')
        .then(response => {
          words.value = response.data
          loading.value = false
        })
        .catch(error => {
          Swal.fire({
            title: 'Error!',
            text: 'No words Found !',
            icon: 'error',
            confirmButtonText: 'OK'
          })
          console.log(error)
        })
    })

    // Get all words and convert them to Objects
    const mapKeywords = computed(() =>
      words.value.map(keyword => {
        return {
          text: keyword,
          correct: false,
          wrong: false
        }
      })
    )

    // Set the false and true answears
    const calcword = () => {
      const inpval = input.value
      if (mapKeywords.value[index.value].text === inpval) {
        mapKeywords.value[index.value].correct = true
        mapKeywords.value[index.value].wrong = false
        score.value++
      } else {
        mapKeywords.value[index.value].correct = false
        mapKeywords.value[index.value].wrong = true
      }

      input.value = ''
      index.value++
    }

    return {
      input,
      index,
      score,
      loading,
      mapKeywords,
      calcword
    }
  }
}
</script>
