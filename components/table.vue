<template>
  <div>
    <div v-if="create">
      <v-alert dense dismissible elevation="3" shaped text>{{
        create.message
      }}</v-alert>
    </div>

    <v-data-table
      :headers="title"
      :items="data"
      sort-by="calories"
      class="elevation tab"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>{{ tableTitle }}</v-toolbar-title>
          <v-divider class="mx-4" inset vertical></v-divider>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="1000px">
            <template v-slot:activator="{ on, attrs }">
              <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
                {{ titleButton }}
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
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.sexo"
                        label="Sexo"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.idade"
                        type="number"
                        label="Idade"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.datanascimento"
                        label="Idade"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-text-field
                        v-model="editedItem.nivel"
                        label="Nivel"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="12" sm="6" md="4">
                      <v-textarea
                        v-model="editedItem.hobby"
                        outlined
                        name="input-7-4"
                        label="Outlined textarea"
                        value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
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
                  >Cancel</v-btn
                >
                <v-btn
                  color="blue darken-1"
                  text
                  @click="deleteItemConfirm(item)"
                  >OK</v-btn
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
        <v-btn color="primary" @click="initialize"> Reset </v-btn>
      </template>
    </v-data-table>
  </div>
</template>
<script>
export default {
  props: ['data', 'title', 'tableTitle', 'titleButton', 'editData'],
  data: () => ({
    dialog: false,
    dialogDelete: false,
    headers: [],
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
  }),

  computed: {
    create() {
      return this.$store.state.developers.result
    },
  },

  watch: {
    dialog(val) {
      val || this.close()
    },
    dialogDelete(val) {
      val || this.closeDelete()
    },
  },

  created() {
    this.initialize()
    this.load()
  },

  methods: {
    load() {
      this.$store.dispatch('developers/load')
    },

    initialize() {
      this.desserts = []
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
      this.$store.dispatch('developers/delete', this.editedItem._id)
      this.$store.dispatch('developers/load')
      this.load()
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
    },

    save() {
      if (this.editedIndex > -1) {
        this.$store.dispatch('developers/update', { ...this.editedItem })
        this.$store.dispatch('developers/load')
        this.load()
      } else {
        this.$store.dispatch('developers/create', this.editedItem)
        this.$store.dispatch('developers/load')
        this.load()
      }
      this.close()
    },
  },
}
</script>
<style>
.tab {
  margin: 3rem;
}
</style>
