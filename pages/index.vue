<template>
  <div>
    <Table
      :data="developer || []"
      :title="headers"
      tableTitle="Desenvolvedor(a) Cadastrados 🥳"
      titleButton="Adicionar"
      :editData="this.columEdit"
      style="border-radius: 12px"
    ></Table>
  </div>
</template>
<script>
import Table from '../components/table.vue'
import Wellcom from '../components/post.vue'
export default {
  name: 'post-container',
  components: { Table, Wellcom },

  data() {
    return {
      headers: [
        { text: 'Nome', value: 'nome' },
        { text: 'Nivel', value: 'nivel' },
        { text: 'Idade', value: 'idade' },
        { text: 'Sexo', value: 'sexo' },
        { text: 'Data de Nacimento', value: 'datanascimento' },
        { text: 'Hobby', value: 'hobby' },
        { text: 'Data de Criação', value: 'createdAt' },
        { text: 'Actions', value: 'actions', sortable: false },
      ],
      columEdit: {
        nome: '',
        nivel: '',
        idade: '',
        sexo: '',
        datanascimento: '',
        hobby: '',
      },
    }
  },

  computed: {
    developer() {
      return this.$store.state.developers.developer
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
      this.$store.dispatch('developers/load')
    },
  },
}
</script>
<style scoped>
.wellcome {
  margin: 1rem;
  margin-top: 2rem;
}
</style>
