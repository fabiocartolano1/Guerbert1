<template>
  <div class="about">
    <div id="nav">
        <router-link to="/">Accueil</router-link> |
        <router-link to="/create">Créer un état des lieux</router-link>
    </div>
    <h1 >Créer un état des lieux</h1>
    <component ref="compo" v-bind:is="component"></component>
    <b-button class="valider " variant="guerb" @click="valider" >Valider</b-button>

  </div>
</template>

<script>
// @ is an alias to /src
import AddForm from '@/components/AddForm.vue'
import PiecesForm from '@/components/PiecesForm.vue'

export default {
  data(){
    return{
      component : "AddForm"
    }
    
  },
  name: 'Create',
  components: {
    AddForm,PiecesForm
  },
  methods:{
    switchVue(){
      if (this.component == AddForm){
        this.component = PiecesForm
      }else if (this.component == PiecesForm){
        alert("etat bien ajouté")
      }
    },
    valider(){
      console.log(this.component == AddForm);
      this.$refs.compo.onSubmit() 
      this.switchVue()
    }
  },
   beforeMount(){
     this.component = AddForm
  }

}
</script>
