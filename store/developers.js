export const state = () => ({
  developer: [],
  result: null,
})

export const mutations = {
  LOAD_ARTICLE(state, developers) {
    state.developer = developers
  },
  RESULT_DEV(state, result) {
    state.result = result
  },
}

export const actions = {
  async load({ commit }) {
    const developers = await this.$axios.$get('/api/developer')
    console.log(developers)
    commit('LOAD_ARTICLE', developers)
  },

  async create({ commit }, dados) {
    console.log(dados)
    const result = await this.$axios.$post('/api/developer', dados)

    commit('RESULT_DEV', result)
  },

  async update({ commit }, dados) {
    console.log(dados)
    const result = await this.$axios.$put(`/api/developer/${dados._id}`, dados)

    commit('RESULT_DEV', result)
  },

  async delete({ commit }, id) {
    const result = await this.$axios.$delete(`/api/developer/${id}`)

    commit('RESULT_DEV', result)
  },
}

export const getters = {
  load(state) {
    return state.developer
  },
}
