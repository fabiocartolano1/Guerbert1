<template>
  <div class="tabEtat">
    <div id="nav">
      <router-link to="/">Accueil</router-link> |
      <router-link to="/create">Créer un état des lieux</router-link>
    </div>
    <h1>{{ titre }}</h1>
    <b-row class="justify-content-md-center mb-3">
      <b-col lg="6" class="my-1">
        <b-input-group size="sm">
          <b-form-input
            id="filter-input"
            v-model="filter"
            type="search"
            placeholder="Rechercher"
          ></b-form-input>
        </b-input-group>
      </b-col>
    </b-row>
    <b-table
      striped
      hover
      :fields="fields"
      :items="etats"
      :bordered="true"
      :filter="filter"
    >
      <template #cell(show_d2)="row">
       <span v-if="row.item.selected == 'entre'">Entrée</span>
       <span v-else>Sortie</span>
      </template>

      <template #cell(show_d)="row">
        <span class="btnEtat" @click="voir(row.index)">📖</span>
        <span class="btnEtat" @click="supprimer(row.index)">❌</span>
        <b-button variant="outline-guerb" v-if="row.item.selected == 'entre'" @click="retour(row.index)"
          >Éditer retour</b-button
        >
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: "ListeEtats",
  props: {
    titre: String,
  },
  methods: {
    supprimer(x) {
      this.etats.splice(x, 1);
      this.saveItems();
    },
    voir(x) {
      this.$router.push("etat/" + x);
    },
    retour(x) {
      this.$router.push("retour/" + x);
    },
    saveItems() {
      const parsed = JSON.stringify(this.etats);
      localStorage.setItem("etats", parsed);
    },
  },
  data() {
    return {
      fields: [
        {
          key: "Locataires[0].signataire",
          label: "Locataire",
          sortable: true,
        },
        {
          key: "Proprio.signataire",
          label: "Propriétaire",
          sortable: true,
        },
        {
          key: "Bien.Adresse",
          label: "Adresse",
          sortable: true,
        },
        {
          key: "show_d2",
          sortable: false,
          label: "Type",
        },
        {
          key: "show_d",
          sortable: false,
          label: "📝",
        },
      ],
      etats: [],
      filter: null,
    };
  },
  beforeMount() {
    if (localStorage.getItem("etats")) {
      try {
        this.etats = JSON.parse(localStorage.getItem("etats"));
      } catch (e) {
        localStorage.removeItem("etats");
      }
    }
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1 {
  margin-bottom: 40px;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.tabEtat {
  margin-left: 40px;
  margin-right: 40px;
}

.btnEtat {
  padding-left: 15px;
  padding-right: 15px;
  cursor: pointer;
}
</style>
