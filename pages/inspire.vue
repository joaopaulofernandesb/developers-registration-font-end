<template>
  <div>
    <Table
      :data="level || []"
      :title="headers"
      tableTitle="Níveis Cadastrados"
      titleButton="Adicionar"
      style="border-radius: 12px"
    ></Table>
  </div>
</template>
<script>
import Table from '../components/table.vue'
export default {
  name: 'post-container',
  components: { Table },

  data() {
    return {
      headers: [
        { text: 'Nível', value: 'nivel' },
        { text: 'Nível', value: 'nivel' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
    }
  },

  computed: {
    level() {
      return this.$store.state.levels.level
    },
  },
  mounted() {
    this.$vuetify.theme.dark = false
  },

  created() {
    this.load()
  },
  methods: {
    formatDate(value) {
      return moment(value).format('MMMM DD YYYY')
    },
    load() {
      this.$store.dispatch('levels/load')
    },
  },
}
</script>
