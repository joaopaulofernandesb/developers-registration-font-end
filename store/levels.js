export const state = () => ({
  level: [],
})

export const mutations = {
  LOAD_ARTICLE(state, levels) {
    state.level = levels
  },
}

export const actions = {
  async loadLevel({ commit }) {
    const levels = await this.$axios.$get('/api/level')
    console.log(levels)
    commit('LOAD_ARTICLE', levels)
  },
}

export const getters = {
  loadLevel(state) {
    return state.level
  },
}
