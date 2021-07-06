<template>
    <div>
        <b-form class="formulaire" @submit="onSubmit">
            <b-container v-for="(piece,n) in etat.Pieces" :key="piece.id" class="bv-example-row mb-5">
                <b-row >
                    <b-col>
                        <h3 class="sousTitre">{{piece.nom}}</h3>
                    </b-col>
                </b-row>
                <b-row class="sousPartie1">
                    <b-col>
                       <h4 >Décoration </h4>
                    </b-col>
                    <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addElement(1,n)">Ajouter un élement</b-button>
                    </b-col>
                    <b-col>
                        <b-button v-if="pieces[n].elDeco.length > 0" size="sm" variant="outline-guerb" @click="popElement(1,n)">Supprimer le dernier</b-button>
                    </b-col>
                </b-row>
                 <b-row class="rowInner" v-for="(el) in pieces[n].elDeco" :key="el.id">
                   <b-col>
                        <b-form-input 
                        v-model="el.nom" 
                        placeholder="Nom de l'élement">
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-select 
                        v-model="el.nature" 
                        :options="NaturePossibles">
                        </b-form-select>
                    </b-col>
                    <b-col>
                        <b-form-select
                        v-model="el.etat"
                        :options="TypeEtatPossibles"
                        >
                        </b-form-select>
                    </b-col>
                    <b-col class="photo" cols="4" >
                    
                         <b-form-file multiple
                        v-model="el.photos"
                       size="sm"
                       placeholder="Ajouter photo(s)"></b-form-file> 
                    </b-col>
                    <b-col>
                        <b-form-input 
                        v-model="el.commentaires" 
                        placeholder="commentaires de l'élement">
                        </b-form-input>
                    </b-col>
                 </b-row>
                <b-row class="sousPartie2">
                    <b-col>
                        <h4 >Electrique</h4>
                    </b-col>
                    <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addElement(2,n)">Ajouter un élement</b-button>
                    </b-col>
                    <b-col>
                        <b-button v-if="pieces[n].elElec.length > 0" size="sm" variant="outline-guerb" @click="popElement(2,n)">Supprimer le dernier</b-button>
                    </b-col>
                </b-row>
                 <b-row class="rowInner" v-for="(el) in pieces[n].elElec" :key="el.id">
                   <b-col>
                        <b-form-input 
                        v-model="el.nom" 
                        placeholder="Nom de l'élement">
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input 
                        v-model="el.nature" 
                        placeholder="Quantité">
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-select
                        v-model="el.etat"
                        :options="TypeEtatPossibles"
                        >
                        </b-form-select>
                    </b-col>
                    <b-col class="photo" cols="4" >
                        
                      <b-form-file multiple
                        v-model="el.photos"
                       size="sm"
                       placeholder="Ajouter photo(s)"></b-form-file> 
                    </b-col>
                    <b-col>
                        <b-form-input 
                        v-model="el.commentaires" 
                        placeholder="commentaires de l'élement">
                        </b-form-input>
                    </b-col>
                
                </b-row>
                <b-row class="sousPartie2">
                    <b-col>
                        <h4 >Equipment</h4>
                    </b-col>
                    <b-col>
                        <b-button size="sm" variant="outline-guerb" @click="addElement(3,n)">Ajouter un élement</b-button>
                    </b-col>
                    <b-col>
                        <b-button v-if="pieces[n].elEquip.length > 0" size="sm" variant="outline-guerb" @click="popElement(3,n)">Supprimer le dernier</b-button>
                    </b-col>
                </b-row>
                 <b-row class="rowInner" v-for="(el) in pieces[n].elEquip" :key="el.id">
                   <b-col>
                        <b-form-input 
                        v-model="el.nom" 
                        placeholder="Nom de l'élement">
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-input 
                        v-model="el.nature" 
                        placeholder="Marque/Objet">
                        </b-form-input>
                    </b-col>
                    <b-col>
                        <b-form-select
                        v-model="el.etat"
                        :options="TypeEtatPossibles"
                        >
                        </b-form-select>
                    </b-col>
                    <b-col class="photo" cols="4" >
                        
                        <b-form-file multiple
                        v-model="el.photos"
                       size="sm"
                       placeholder="Ajouter photo(s)"></b-form-file> 
                    </b-col>
                    <b-col>
                       <b-form-input 
                        v-model="el.commentaires" 
                        placeholder="commentaires de l'élement">
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
          file : null,
          etat :{},
          pieces : [
          ],
          idDispo : 0,

            TypeEtatPossibles: [
                { value: '', text: 'Etat', disabled : true },
                { value: 'HS', text: 'Hors-Service' },
                { value: 'D', text: 'Dégradé' },
                { value: 'ME', text: 'Mauvais état'},
                { value: 'EU', text: 'Etat d\'usage'},
                { value: 'BE', text: 'Bon état'},
            ],
            NaturePossibles: [
                { value: '', text: 'Nature', disabled : true },
                { value: 'Bois', text: 'Bois' },
                { value: 'Aluminium', text: 'Aluminium' },
                { value: 'PVC', text: 'PVC'},
                { value: 'Verre', text: 'Verre'},
                { value: 'Composite', text: 'Composite'},
                { value: 'Parquet', text: 'Parquet'},
                { value: 'Stratifie', text: 'Stratifié'},
                { value: 'Carrelage', text: 'Carrelage'},
                { value: 'Linoleum', text: 'Linoléum'},
                { value: 'Beton-cire', text: 'Béton ciré'},
                { value: 'Jonc-de-mer', text: 'Jonc de mer'},
                { value: 'Peinture', text: 'Peinture'},
                { value: 'Papier-peint', text: 'Papier peint'},
                { value: 'Crepi', text: 'Crépi'},
                { value: 'Lambri', text: 'Lambri'},
                { value: 'Toile-de-verre', text: 'Toile de verre'},
                { value: 'Tissu-mural', text: 'Tissu mural'},
            ],
      }
    },
    methods:{
        nomPhoto(files){
            //this.etat.Photos.push(files[0].name);
            return files.length === 1 ? files[0].name : `${files.length} fichiers sélectionnés`
        },
        onSubmit(){
            var compteur = 1;
            this.pieces.forEach(piece => {
                piece.elDeco.forEach(el => {
                   el.photos.forEach(photo => {
                    var p = {
                        label : compteur,
                        nom : photo.name
                    }
                    photo.label = compteur;
                    compteur+=1;
                    this.etat.Photos.push(p);
                   })
                })
                piece.elElec.forEach(el => {
                   el.photos.forEach(photo => {
                      var p = {
                        label : compteur,
                        nom : photo.name
                    }
                    photo.label = compteur;
                    compteur+=1;
                    this.etat.Photos.push(p);
                   })
                })
                piece.elEquip.forEach(el => {
                   el.photos.forEach(photo => {
                       var p = {
                        label : compteur,
                        nom : photo.name
                    }
                    photo.label = compteur;
                    compteur+=1;
                    this.etat.Photos.push(p);
                   })
                })
            });
           
             if (localStorage.getItem('etats')) {
                try {
                    var etats = JSON.parse(localStorage.getItem('etats'));
                    etats.pop();
                    this.etat.Pieces = this.pieces;
                    etats.push(this.etat);
                    const parsedEtats = JSON.stringify(etats);
                    localStorage.setItem('etats', parsedEtats);
                    this.$router.push('/');
                } catch(e) {
                    localStorage.removeItem('etats');
                }
        }
        

        },
        addElement(type,numPiece){

            var element = {
                id : this.idDispo,
                nom : '',
                nature : '',
                etat : '',
                photos : [],
                commentaires :'',
            }
            this.idDispo += 1;   
            if (type == 1){ //deco
                this.pieces[numPiece].elDeco.push(element)
            }else if (type == 2){ //elec
                this.pieces[numPiece].elElec.push(element)
            }else{ //equipment
                this.pieces[numPiece].elEquip.push(element)
            }
            console.log("apres");
            console.log(this.pieces[numPiece].elDeco)
        },
        popElement(type,numPiece){
            if (type == 1){ //deco
                this.pieces[numPiece].elDeco.pop()
            }else if (type == 2){ //elec
                this.pieces[numPiece].elElec.pop()
            }else{ //equipment
                this.pieces[numPiece].elEquip.pop()
            }
        }
    },
    mounted(){
    if (localStorage.getItem('etats')) {
            try {
                var etats = JSON.parse(localStorage.getItem('etats'));
                this.etat = etats[etats.length - 1];
            } catch(e) {
                localStorage.removeItem('etats');
            }
        }
    for ( var i = 0 ; i < this.etat.Pieces.length ; i++){
        var p = {
            id : this.etat.Pieces[i].id,
            nom : this.etat.Pieces[i].nom,
            elDeco : [
                {id: 0, nom: "Porte", nature: "", etat: ""},
                {id: 1, nom: "Murs", nature: "", etat: ""},
                {id: 2, nom: "Sols", nature: "", etat: ""}    
            ],
            elEquip : [],
            elElec : [],

        }
       
        this.pieces.push(p)
    }   
console.log(this.etat.Pieces)
  }
}   
</script>

<style lang="scss">
.custom-file-input {
  content: 'Photo';
}

h4{
    text-align: left;
}
.photo{
    padding-top: 4px;
}
.rowElt{
    margin-top:10px ;
}
.sousPartie1{
    margin-top: 20px;
}
.sousPartie2{
    margin-top: 30px;
}
</style>