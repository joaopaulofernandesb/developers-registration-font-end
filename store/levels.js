export const state = () => ({
  level: null,
})

export const mutations = {
  LOAD_ARTICLE(state, levels) {
    state.level = levels
  },
}

export const actions = {
  async loadLevel({ commit }) {
    const levels = await this.$axios.$get('/api/level')

    commit('LOAD_ARTICLE', levels)
  },
}

export const getters = {
  load(state) {
    return state.level
  },
}
