export const state = () => ({
  developer: [],
  level: [],
  result: null,
})

export const mutations = {
  LOAD_ARTICLE(state, developers) {
    state.developer = developers
  },

  LOAD_LEVEL(state, levels) {
    state.level = levels
  },

  RESULT_DEV(state, result) {
    state.result = result
  },

  RELOAD_DEV(state, result) {
    state.developer = result
  },
}

export const actions = {
  async load({ commit }) {
    const developers = await this.$axios.$get('/api/developer')
    console.log('LOAD', developers)

    commit('LOAD_ARTICLE', developers)
  },

  async create({ commit }, dados) {
    const result = await this.$axios.$post('/api/developer', dados)

    commit('RESULT_DEV', result)
  },

  async update({ commit }, dados) {
    console.log('DADOS UPDA D', dados._id)
    const result = await this.$axios.$put(`/api/developer/${dados._id}`, dados)
    console.log('DADOS UPDA D', result)
    commit('RESULT_DEV', result)
  },

  async delete({ commit }, dados) {
    console.log(dados)
    const result = await this.$axios.$delete(`/api/developer/${dados._id}`)
    console.log(result)
    commit('RESULT_DEV', result)
  },

  async createlevel({ commit }, dados) {
    const result = await this.$axios.$post('/api/level', dados)

    commit('RESULT_DEV', result)
  },

  async loadlevel({ commit }) {
    const levels = await this.$axios.$get('/api/level')

    commit('LOAD_LEVEL', levels)
  },

  async updatelevel({ commit }, dados) {
    console.log('DADOS UPDA L', dados._id)
    const result = await this.$axios.$put(`/api/level/${dados._id}`, dados)
    console.log('DADOS UPDA L', result)
    commit('RESULT_DEV', result)
  },

  async deletelevel({ commit }, dados) {
    console.log(dados)
    const result = await this.$axios.$delete(`/api/level/${dados._id}`)
    console.log(result)
    commit('RESULT_DEV', result)
  },
}

export const getters = {
  loadDeveloper(state) {
    return state.developer
  },
  loadLevel(state) {
    return state.level
  },
}
