<template>
  <div v-if="!loading">
    <h3 id="title" class="container animate__animated animate__slideInDown">Random Words</h3>
    <div class="runner container animate__animated animate__zoomIn">
      <p class="word-box">
        <span
          v-for="keyword in mapKeywords"
          v-bind:key="keyword.text"
          v-bind:class="{ correct: keyword.correct, wrong: keyword.wrong }"
        >
          <img src="https://img.icons8.com/material/50/000000/fuse-symbol.png" width="20" />
          {{ keyword.text }}
        </span>
      </p>
      <div
        class="row animate__animated animate__zoomIn"
        v-if="disableInput === false && mapKeywords[index]"
      >
        <div class="row">
          <div class="input-field col s6" style="margin-left: 100px;">
            <input
              style="width: 300px;"
              id="word"
              type="text"
              required
              v-model="input"
              v-on:keyup.enter="calcword"
            />
            <label for="word">Word</label>
          </div>
          <div class="timer">
            <Timer @endTimer="timeLeft" />
          </div>
        </div>
      </div>
      <div v-else class="thanks">
        <h4 v-if="!loading">Thanks for Playing !!!</h4>
        <h4 v-if="!loading">
          Your Score: <span id="sc">{{ score }}</span> /
          <span id="sc">{{ mapKeywords.length }}</span>
        </h4>
        <a v-if="!loading" class="indigo darken-1 waves-effect waves-light btn-small" href="/"
          >play Again</a
        >
      </div>
    </div>
  </div>
  <div class="container logo" v-else>
    <img src="../assets/load.gif" width="150" height="100" alt="logo" style="margin-top: 90px" />
  </div>
</template>

<script>
import Timer from './Timer.vue'
import { computed, ref, onBeforeMount } from 'vue'
import Swal from 'sweetalert2'
import axios from 'axios'
export default {
  components: {
    Timer
  },
  setup () {
    const index = ref(0)
    const input = ref('')
    const loading = ref(false)
    const words = ref([])
    const score = ref(0)
    const disableInput = ref(false)

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

    const timeLeft = () => {
      console.log('time 0')
      disableInput.value = true
    }

    return {
      input,
      index,
      score,
      loading,
      mapKeywords,
      calcword,
      timeLeft,
      disableInput
    }
  }
}
</script>
