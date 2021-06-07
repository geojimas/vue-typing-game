<template>
  <h3>Typer Game</h3>
  <div class="runner">
    <h4>Your Score: {{mapKeywords.filter(keyword => keyword.correct).length}} / {{mapKeywords.length}}</h4>
    <p>
      <span
        v-for="keyword in mapKeywords"
        v-bind:key="keyword.text"
        v-bind:class="{ correct: keyword.correct, wrong: keyword.wrong }"
      >
        {{ '|' }}
        {{ keyword.text }}
        {{ '|' }}
      </span>
    </p>
    <div class="row container">
      <div class="row">
        <div class="input-field col s6">
          <input
            id="last_name"
            type="text"
            class="validate"
            v-model="input"
            v-on:keyup.enter="calcword"
          />
          <label for="last_name">Word</label>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, ref } from 'vue'
import { useStore } from 'vuex'
export default {
  setup () {
    const index = ref(0)
    const store = useStore()
    const input = ref('')

    const allKeywords = computed(() => store.getters.getKeywords)
    const mapKeywords = computed(() =>
      allKeywords.value.map(keyword => {
        return {
          text: keyword,
          correct: false,
          wrong: false
        }
      })
    )

    const calcword = () => {
      console.log(mapKeywords.value.length)
      const inpval = input.value
      if (mapKeywords.value[index.value].text === inpval) {
        mapKeywords.value[index.value].correct = true
        mapKeywords.value[index.value].wrong = false
      } else {
        mapKeywords.value[index.value].correct = false
        mapKeywords.value[index.value].wrong = true
      }

      input.value = ''
      index.value++
    }

    const score = mapKeywords.value.filter(keyword => keyword.correct).length
    // {{mapKeywords.filter(keyword => keyword.correct).length}}

    return {
      input,
      mapKeywords,
      score,
      calcword
    }
  }
}
</script>
