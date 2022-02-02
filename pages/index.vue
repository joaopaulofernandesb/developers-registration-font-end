<template>
  <div>
    <div v-if="create">
      <v-alert dense dismissible elevation="3" shaped text>{{
        create.message
      }}</v-alert>
    </div>

    <v-data-table
      ref="table"
      search
      :headers="headers"
      :items="desserts"
      sort-by="calories"
      class="elevation tab"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Desenvolvedor(a) Cadastrados 🥳</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                Adicionar
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="text-h5">{{ formTitle }}</span>
              </v-card-title>

              <v-card-text>
                <v-container>
                  <v-row>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nome"
                        label="Nome"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.sexo"
                        label="Sexo"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.idade"
                        type="number"
                        label="Idade"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="8">
                      <v-menu
                        ref="menu1"
                        v-model="menu1"
                        :close-on-content-click="false"
                        transition="scale-transition"
                        offset-y
                        max-width="290px"
                        min-width="auto"
                      >
                        <template v-slot:activator="{ on, attrs }">
                          <v-text-field
                            v-model="editedItem.datanascimento"
                            label="Data de Nacimento"
                            persistent-hint
                            prepend-icon="mdi-calendar"
                            v-bind="attrs"
                            v-on="on"
                          ></v-text-field>
                        </template>
                        <v-date-picker
                          v-model="editedItem.datanascimento"
                          no-title
                          @input="menu1 = false"
                        ></v-date-picker>
                      </v-menu>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nivel"
                        label="Nivel"
                        required
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="12">
                      <v-textarea
                        v-model="editedItem.hobby"
                        outlined
                        required
                        name="input-7-4"
                        label="Hobby"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="close">
                  Cancel
                </v-btn>
                <v-btn color="blue darken-1" text @click="save()">
                  Salvar
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="402px">
            <v-card>
              <v-card-title class="text-h5"
                >Gostaria de Excluir esses dados?</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm()"
                  >Apagar</v-btn
                >
                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:[`item.datanascimento`]="{ item }">
        <span>{{ new Date(item.datanascimento).toLocaleString('pt-br') }}</span>
      </template>
      <template v-slot:[`item.createdAt`]="{ item }">
        <span>{{ new Date(item.createdAt).toLocaleString('pt-br') }}</span>
      </template>
      <template v-slot:[`item.actions`]="{ item }">
        <v-icon small class="mr-2" @click="editItem(item)"> mdi-pencil </v-icon>
        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn color="primary" @click="load"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  props: ['data', 'title', 'tableTitle', 'titleButton', 'editData'],

  data: (vm) => ({
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: 'Nome', value: 'nome' },
      { text: 'Nivel', value: 'nivel' },
      { text: 'Idade', value: 'idade' },
      { text: 'Sexo', value: 'sexo' },
      { text: 'Data de Nacimento', value: 'datanascimento' },
      { text: 'Hobby', value: 'hobby' },
      { text: 'Actions', value: 'actions', sortable: false },
    ],
    desserts: [],
    editedIndex: -1,
    editedItem: {
      nome: '',
      sexo: '',
      idade: '',
      datanascimento: '',
      nivel: '',
      hobby: '',
    },
    defaultItem: {
      nome: '',
      sexo: '',
      idade: '',
      datanascimento: '',
      nivel: '',
      hobby: '',
    },
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    dateFormatted: vm.formatDate(
      new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10)
    ),
    menu1: false,
    menu2: false,
  }),

  computed: {
    ...mapState({
      developer: (state) => state.developer,
      create: (state) => state.result,
    }),

    formTitle() {
      return this.editedIndex === -1 ? 'Novo Cadastro' : 'Edit Cadastro'
    },
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },

  watch: {
    date(val) {
      this.dateFormatted = this.formatDate(this.date)
    },

    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.load()
  },

  methods: {
    load() {
      console.log(this.developer)
      this.$store.dispatch('load')
      this.desserts = this.developer
    },

    editItem(item) {
      console.log(item._id)
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign([], item)
      this.dialog = true
      this.editedIndex = 1
    },

    deleteItem(item) {
      this.editedIndex = this.desserts.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialogDelete = true
    },

    deleteItemConfirm() {
      this.$store.dispatch('delete', this.editedItem)
      this.desserts.splice(this.editedIndex, 1)
      this.closeDelete()
    },

    close() {
      this.dialog = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
    },

    closeDelete() {
      this.dialogDelete = false
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      })
      this.load()
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('update', this.editedItem)
      } else {
        this.$store.dispatch('create', this.editedItem)
        this.desserts.push(this.editedItem)
      }
      this.load()
      this.close()
    },

    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
<style>
.tab {
  margin: 3rem;
}
</style>
