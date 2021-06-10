<template>
  <div>
      
       <b-form class="formulaire" @submit="onSubmit" >
        <b-form-group>
            <b-form-radio-group
                class="radioVert"
                id="btn-radios-2"
                v-model="form.selected"
                :options="options"
                button-variant="outline-guerb"
                name="radio-btn-outline"
                buttons
            ></b-form-radio-group>
        </b-form-group>
        <!-- Partie Soussignés -->
        <b-container class="bv-example-row mb-5">
            <b-row>
                <b-col>
                    <h3 class="sousTitre">Soussignés</h3>
                </b-col>
            </b-row>
             <b-row class = "rowInner">
                <b-col>
                   
                        <strong>Propriétaire</strong>
                    
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Proprio.societe" 
                        placeholder="Société">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Proprio.adresse" 
                        placeholder="Adresse">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Proprio.signataire" 
                        placeholder="Signataire">
                    </b-form-input>
                </b-col>
            </b-row>
            <b-row class = "rowInner">
                <b-col>
                   
                        <strong>Mandataire</strong>
                    
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Mandataire.societe" 
                        placeholder="Société">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Mandataire.adresse" 
                        placeholder="Adresse">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Mandataire.signataire" 
                        placeholder="Signataire">
                    </b-form-input>
                </b-col>
            </b-row>
            <div>
                <b-row class = "rowInner" v-for="(locataire,n) in form.Locataires" :key="locataire.id">
                    <b-col>
                    
                            <strong>Locataire {{ n+1 }}</strong>
                        
                    </b-col>
                    
                <b-col>
                    <b-form-input 
                        v-model="form.Locataires[n].adresse" 
                        placeholder="Adresse">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Locataires[n].signataire" 
                        placeholder="Signataire">
                    </b-form-input>
                </b-col>
                <b-col>
                </b-col>
                </b-row>
                <b-row class = "rowInnerButtons">
                    <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addLocataire()">Ajouter un locataire</b-button>
                    </b-col>
                    <b-col>
                        <b-button size="sm" v-if="form.Locataires.length > 1" variant="outline-guerb" @click="popLocataire()">Supprimer le dernier locataire</b-button>
                    </b-col>
                <b-col>
                </b-col>
                </b-row>
            </div>
        </b-container>

        <!-- Partie Bien Immobilier -->
        <b-container class="bv-example-row mb-5" >
            <b-row>
                <b-col>
                    <h3 class="sousTitre">Bien Immobilier</h3>
                </b-col>
            </b-row>
             <b-row class = "rowInner">
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.Adresse" 
                        placeholder="Adresse">
                    </b-form-input>
                </b-col>
                
            </b-row>
            <b-row class = "rowInner">
                <b-col>
                       <b-form-select
                        v-model="form.Bien.Type"
                        :options="TypePossibles"
                        >
                        </b-form-select>
                </b-col>
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.REF" 
                        placeholder="REF">
                    </b-form-input>
                </b-col>
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.LOT" 
                        placeholder="LOT">
                    </b-form-input>
                </b-col>
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.BAL" 
                        placeholder="BAL">
                    </b-form-input>
                </b-col>
            </b-row>
            <b-row class = "rowInner" >  
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.NbEtages" 
                        placeholder="Nombre d'étages'">
                    </b-form-input>
                </b-col>
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.NbPieces" 
                        placeholder="Nombre de pièces">
                    </b-form-input>
                </b-col>
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.Surface" 
                        placeholder="Surface">
                    </b-form-input>
                </b-col>
                <b-col>
                       <b-form-select
                        v-model="form.Bien.TypeDeChauffage"
                        :options="TypeChauffagePossibles"
                        >
                        </b-form-select>
                </b-col>
                <b-col>
                       <b-form-select
                        v-model="form.Bien.EauChaude"
                        :options="TypeEauPossibles"
                        >
                        </b-form-select>
                </b-col>        
            </b-row> 
            <b-row class = "rowInner">
                <b-col>
                       <b-form-input 
                        v-model="form.Bien.annexes" 
                        placeholder="Annexes">
                    </b-form-input>
                </b-col>
                
            </b-row>
        </b-container>

        <!-- Pièces -->
        <b-container class="bv-example-row mb-5">
            <b-row>
                <b-col>
                    <h3 class="sousTitre">Liste des pièces</h3>
                </b-col>
            </b-row>
             <b-row class = "rowInner">
                <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addPiece('Chambre')">Chambre</b-button>
                </b-col>
                <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addPiece('Cuisine')">Cuisine</b-button>
                </b-col>
                <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addPiece('WC')">WC</b-button>
                </b-col>
                <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addPiece('Salle de Bains')">Sdb</b-button>
                </b-col>
                <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addPiece('Salon')">Salon</b-button>
                </b-col>
                <b-col cols="4">
                   
                        <b-form-input 
                        class="w-50"
                        style="display : inline-block ;
                        margin-right : 5px"
                        v-model="form.Bien.autrePiece" 
                        placeholder="Nom de la pièce">
                    </b-form-input>
                     <b-button size="sm" variant="outline-guerb" @click="addPiece(form.Bien.autrePiece),resetPiece()">Ajouter</b-button>
                
                </b-col>
                
                       
                </b-row>
                <!-- Liste des pièces -->
                <b-row>
                    <b-col>
                        <b-list-group>
                            <b-list-group-item v-for="piece in form.Pieces" :key="piece.id"> {{ piece.nom }} </b-list-group-item>
                        </b-list-group>
                    </b-col>
                </b-row>
                
        </b-container>

        <b-container class="bv-example-row mb-5">
            <b-row>
                <b-col>
                    <h3 class="sousTitre">Compteur</h3>
                </b-col>
            </b-row>
            <b-row class = "rowInner">
                <b-col>
                   
                        <strong>Eau Chaude</strong>
                    
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.eauChaude.emplacement" 
                        placeholder="emplacement">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.eauChaude.date" 
                        placeholder="date relevé">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Compteur.eauChaude.index" 
                        placeholder="Index">
                    </b-form-input>
                </b-col>
            </b-row>
             <b-row class = "rowInner">
                <b-col>
                   
                        <strong>Eau Froide</strong>
                    
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.eauFroide.emplacement" 
                        placeholder="emplacement">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.eauFroide.date" 
                        placeholder="date relevé">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Compteur.eauFroide.index" 
                        placeholder="Index">
                    </b-form-input>
                </b-col>
            </b-row>
             <b-row class = "rowInner">
                <b-col>
                   
                        <strong>Electricité heure pleine</strong>
                    
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.elecHP.emplacement" 
                        placeholder="emplacement">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.elecHP.date" 
                        placeholder="date relevé">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Compteur.elecHP.index" 
                        placeholder="Index">
                    </b-form-input>
                </b-col>
            </b-row>
             <b-row class = "rowInner">
                <b-col>
                   
                        <strong>Electricité Heure Creuse</strong>
                    
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.elecHC.emplacement" 
                        placeholder="emplacement">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Compteur.elecHC.date" 
                        placeholder="date relevé">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Compteur.elecHC.index" 
                        placeholder="Index">
                    </b-form-input>
                </b-col>
            </b-row>
        </b-container>
         <b-container class="bv-example-row mb-5">
            <b-row>
                <b-col>
                    <h3 class="sousTitre">Clés</h3>
                </b-col>
            </b-row>
            <b-row class = "rowInner">
               
                <b-col>
                    <b-form-input 
                        v-model="form.Cle.type" 
                        placeholder="Type de clés">
                    </b-form-input>
                </b-col>
                <b-col>
                    <b-form-input 
                        v-model="form.Cle.nombre" 
                        placeholder="nombre">
                    </b-form-input>
                </b-col>
                <b-col>
                   <b-form-input 
                        v-model="form.Cle.comm" 
                        placeholder="Commentaires">
                    </b-form-input>
                </b-col>
            </b-row>
            
        </b-container>
       </b-form>
  </div>
</template>

<script>
  export default {
    data() {
      return {
          
          form:{
              Photos: [],
              date : '',
              Cle:{
                  type:'',
                  nombre:'',
                  comm:''
              },
              Compteur:{
                  eauFroide : {
                      emplacement : '',
                      date : '',
                      index : ''
                  },
                  eauChaude : {
                      emplacement : '',
                      date : '',
                      index : ''
                  },
                  elecHP : {
                      emplacement : '',
                      date : '',
                      index : ''
                  },
                  elecHC : {
                      emplacement : '',
                      date : '',
                      index : ''
                  },
              },
            Proprio : {
                societe : '',
                adresse : '',
                signataire : '',
            },
            Mandataire : {
                societe : '',
                adresse : '',
                signataire : '',
            },
            Locataires : [
                {
                    id : 0,
                    adresse : '',
                    signataire : '',
                }
            ],
            Bien : {
                Adresse : '',
                Type : null,
                REF : '',
                LOT : '',
                BAL : '',
                NbEtages : null,
                NbPieces :null,
                Surface : null,
                TypeDeChauffage: null,
                EauChaude : null,
                autrePiece : '',
                annexes : ''

            },
            Pieces : [],
            selected: 'entre',
          },
          nouvellePiece : '',
           locale: 'fr-FR',
        hideHeader: false,
        etats : [],
        TypePossibles: [
          { value: null, text: 'Type de Bien', disabled : true },
          { value: 'A', text: 'Appartement' },
          { value: 'M', text: 'Maison' },
          { value: 'S', text: 'Studio'},
          { value: 'LC', text: 'Locaux Commerciaux'},
          { value: 'B', text: 'Bureaux'},
        ],
         TypeChauffagePossibles: [
          { value: null, text: 'Type de Chauffage', disabled : true },
          { value: 'IG', text: 'Chauffage individuel gaz' },
          { value: 'CG', text: 'Chauffage collectif gaz' },
          { value: 'CF', text: 'Chauffage collectif fuel'},
          { value: 'E', text: 'Chauffage électrique'}
        ],
         TypeEauPossibles: [
          { value: null, text: 'Eau Chaude', disabled : true },
          { value: 'IG', text: 'Eau individuel gaz' },
          { value: 'CG', text: 'Eau collectif gaz' },
          { value: 'CF', text: 'Eau collectif fuel'},
          { value: 'E', text: 'Eau electrique'}
        ],
       
        options: [
          { text: 'Etat des lieux d\'entrée', value: 'entre' },
          { text: 'Etat des lieux de sortie', value: 'sortie' },
        ]
      }
    },
    methods: {
      onSubmit() {

        //event.preventDefault()

        //recup la liste des etats de la base
        if (localStorage.getItem('etats')) {
            try {
                this.etats = JSON.parse(localStorage.getItem('etats'));
            } catch(e) {
                localStorage.removeItem('etats');
            }
        }
        var today = new Date();
        this.form.date = today.toLocaleString('fr-FR');
        this.etats.push(this.form);

        this.saveEtats()

        //alert('Etat des lieux bien ajouté !');
       // this.reset();
      },
      addPiece(nom){
          var nbExistant = 0;
          //var taille = 0;
          if (this.form.Pieces != null){
              console.log('entre');
              //taille = this.form.Pieces.length
          }
          this.form.Pieces.forEach(element => {
              if (element.nom.includes( nom)){
                  nbExistant += 1;
              }
          });
          var piece = {
                    id : this.form.Pieces.length,
                    nom : null
                };
          if ( nbExistant == 0 ){
                piece.nom = nom;
          }else {
              piece.nom = nom + ' ' + (nbExistant+1);
          }
          
          this.form.Pieces.push(piece);
      },
      resetPiece(){
        this.form.Bien.autrePiece = '';
      },
      popLocataire(){
          this.form.Locataires.pop();
      },
      addLocataire(){
          var locataire = {
                id: this.form.Locataires.length,
                adresse : '',
                signataire : '',
          };
          this.form.Locataires.push(locataire);
      },
      saveEtats(){
        const parsedEtats = JSON.stringify(this.etats);
        localStorage.setItem('etats', parsedEtats);
      },
      reset(){
        this.form.NomLocataire = '';
        this.form.NomProprio = '';
        this.form.DateEtat = '';
        this.form.Adresse = '';
      }
    }
  }
</script>
<style >
.rowInner{
    margin-top: 5px;
    margin-bottom: 5px;
}
.rowInnerButtons{
    margin-top: 25px;
}
.formulaire {
    margin-top: 40px !important;
}

.valider {
     margin-top: 30px !important;
}

h3{
    text-align: left;
    color: #42b983;
}

</style>

<style lang="scss">
    // Your variable overrides
    $theme-colors: (
    "guerb": #42b983
    );

    // Bootstrap and its default variables
    @import '../../node_modules/bootstrap/scss/bootstrap';
    // BootstrapVue and its default variables
    @import '../../node_modules/bootstrap-vue/src/index.scss';
</style>