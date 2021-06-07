import { createStore } from 'vuex'

export default createStore({
  state: {
    keywords: [
      'platform',
      'superior',
      'gradual',
      'established',
      'radiation',
      'housing',
      'consideration',
      'entitlement',
      'absence',
      'association',
      'countryside',
      'episode',
      'prejudice',
      'sympathetic',
      'privilege',
      'interference',
      'marketing',
      'paragraph',
      'advertising',
      'snarl'
    ]
  },
  getters: {
    getKeywords (state) {
      return state.keywords
    }
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
