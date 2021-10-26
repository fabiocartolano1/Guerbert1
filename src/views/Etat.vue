<template>
  <div id="root">
    <b-button v-if="!printing" class="no-print retourBtn" @click="$router.push('/')"
      >Retour</b-button
    >
    <h5 v-if="etat.selected == 'entre'">
      Date d'entrée : {{ etat.date.split(",")[0] }}
    </h5>
    <h5 v-else>Date de sortie : {{ etat.date.split(",")[0] }}</h5>
    <h1 v-if="etat.selected == 'entre'">Etat des Lieux d'entrée</h1>
    <h1 v-else>Etat des Lieux de sortie</h1>
    <h4>Dressé en commun et contradictoirement entre les soussignés</h4>
    <b-row class="cadresSignature">
      <b-col class="cadreSignature">
        {{ etat.Proprio.societe }}
        <br />
        {{ etat.Proprio.adresse }}
        <br />
        {{ etat.Proprio.signataire }}
        <br />
        <div class="ciApresMarge"></div>
        <div class="ciApres">Ci-apres le Propriétaire</div>
      </b-col>
      <b-col class="cadreSignature">
        {{ etat.Mandataire.societe }}
        <br />
        {{ etat.Mandataire.adresse }}
        <br />
        {{ etat.Mandataire.signataire }}
        <br />
        <div class="ciApresMarge"></div>
        <div class="ciApres">Ci-apres le Mandataire</div>
      </b-col>
      <b-col class="cadreSignature">
        <div v-for="loc in etat.Locataires" :key="loc.id">
          {{ loc.signataire }}
          <br />
          {{ loc.adresse }}
          <br />
        </div>
        <div class="ciApresMarge"></div>
        <div class="ciApres">Ci-apres le(s) Locataire(s)</div>
      </b-col>
    </b-row>
    <div class="bienImmo">
      <b-row class="bienImmoTitre case">
        <b-col> Le Bien Immobilier </b-col>
      </b-row>
      <b-row align-h="start" class="case">
        <b-col> Adresse des lieux loués : {{ etat.Bien.Adresse }} </b-col>
      </b-row>
      <b-row align-h="start" class="case">
        <b-col> Type de bien : {{ etat.Bien.Type }} </b-col>
        <b-col> Reference : {{ etat.Bien.REF }} </b-col>
        <b-col> LOT : {{ etat.Bien.LOT }} </b-col>
        <b-col> BAL : {{ etat.Bien.BAL }} </b-col>
      </b-row>
      <b-row align-h="start" class="case">
        <b-col> Etage : {{ etat.Bien.NbEtages }} </b-col>
        <b-col> Pieces : {{ etat.Bien.NbPieces }} </b-col>
        <b-col> Surface : {{ etat.Bien.Surface }} m² </b-col>
      </b-row>
      <b-row align-h="start" class="case">
        <b-col> Annexes loués avec : {{ etat.Bien.annexes }} </b-col>
      </b-row>
      <b-row align-h="start" class="case">
        <b-col> Type de Chauffage : {{ etat.Bien.TypeDeChauffage }} </b-col>
        <b-col> Eau Chaude : {{ etat.Bien.EauChaude }} </b-col>
      </b-row>
    </div>
    <div v-for="piece in etat.Pieces" :key="piece.id" class="Pieces">
      <b-row class="nomPiece">
        <h4>{{ piece.nom }}</h4>
      </b-row>
      <b-row class="deco">
        <b-col class="casePiece">Décoration</b-col>
        <b-col class="casePiece">Nature</b-col>
        <b-col class="casePiece">Etat</b-col>
        <b-col class="casePiece">Photo</b-col>
        <b-col class="casePiece">Commentaires</b-col>
      </b-row>
      <div v-for="el in piece.elDeco" :key="el.id">
        <b-row>
          <b-col class="casePiece">{{ el.nom }}</b-col>
          <b-col class="casePiece">{{ el.nature }}</b-col>
          <b-col class="casePiece">
            <span v-if="el.etat == 'HS'">Hors-Service</span>
            <span v-if="el.etat == 'D'">Dégradé</span>
            <span v-if="el.etat == 'ME'">Mauvais état</span>
            <span v-if="el.etat == 'EU'">Etat d'usage</span>
            <span v-if="el.etat == 'BE'">Bon état</span>
          </b-col>
          <b-col class="casePiece"
            ><span v-for="(p, i) in el.photos" :key="p.id">
              <span v-if="i != 0">, </span>
              Image {{ getIndex(p) + 1 }}
            </span>
          </b-col>
          <b-col class="casePiece">{{ el.commentaires }}</b-col>
        </b-row>
        <b-row>
          <b-col class="casePieceRetour"></b-col>
          <b-col class="casePieceRetour">Sortie : </b-col>
          <b-col class="casePiece">
            <span v-if="el.etatSortie == 'HS'">Hors-Service</span>
            <span v-if="el.etatSortie == 'D'">Dégradé</span>
            <span v-if="el.etatSortie == 'ME'">Mauvais état</span>
            <span v-if="el.etatSortie == 'EU'">Etat d'usage</span>
            <span v-if="el.etatSortie == 'BE'">Bon état</span>
          </b-col>
          <b-col class="casePiece"
            ><span v-for="(p, i) in el.photosSortie" :key="p.id">
              <span v-if="i != 0">, </span>
              Image {{ getIndexSortie(p) + 1 }}B
            </span>
          </b-col>
          <b-col class="casePiece">{{ el.commentairesSortie }}</b-col>
        </b-row>
      </div>

      <b-row class="ele">
        <b-col class="casePiece">Electrique</b-col>
        <b-col class="casePiece">Nature</b-col>
        <b-col class="casePiece">Etat</b-col>
        <b-col class="casePiece">Photo</b-col>
        <b-col class="casePiece">Commentaires</b-col>
      </b-row>
      <b-row v-for="el in piece.elElec" :key="el.id">
        <b-col class="casePiece">{{ el.nom }}</b-col>
        <b-col class="casePiece">{{ el.nature }}</b-col>
        <b-col class="casePiece">
          <span v-if="el.etat == 'HS'">Hors-Service</span>
          <span v-if="el.etat == 'D'">Dégradé</span>
          <span v-if="el.etat == 'ME'">Mauvais état</span>
          <span v-if="el.etat == 'EU'">Etat d'usage</span>
          <span v-if="el.etat == 'BE'">Bon état</span>
        </b-col>
        <b-col class="casePiece"
          ><span v-for="(p, i) in el.photos" :key="p.id">
            <span v-if="i != 0">, </span>
            Image {{ getIndex(p) + 1 }}
          </span>
        </b-col>
        <b-col class="casePiece">{{ el.commentaires }}</b-col>
      </b-row>

      <b-row class="equip">
        <b-col class="casePiece">Equipement</b-col>
        <b-col class="casePiece">Nature</b-col>
        <b-col class="casePiece">Etat</b-col>
        <b-col class="casePiece">Photo</b-col>
        <b-col class="casePiece">Commentaires</b-col>
      </b-row>
      <b-row v-for="el in piece.elEquip" :key="el.id">
        <b-col class="casePiece">{{ el.nom }}</b-col>
        <b-col class="casePiece">{{ el.nature }}</b-col>
        <b-col class="casePiece">
          <span v-if="el.etat == 'HS'">Hors-Service</span>
          <span v-if="el.etat == 'D'">Dégradé</span>
          <span v-if="el.etat == 'ME'">Mauvais état</span>
          <span v-if="el.etat == 'EU'">Etat d'usage</span>
          <span v-if="el.etat == 'BE'">Bon état</span>
        </b-col>
        <b-col class="casePiece">
          <span v-for="(p, i) in el.photos" :key="p.id">
            <span v-if="i != 0">, </span>
            Image {{ getIndex(p) + 1 }}
          </span>
        </b-col>
        <b-col class="casePiece">{{ el.commentaires }}</b-col>
      </b-row>
    </div>
    <div class="pagebreak"></div>
    <div class="cle">
      <b-row class="nomPiece"> <h4>Compteur</h4> </b-row>
      <b-row class="deco">
        <b-col class="casePiece">Type de compteur</b-col>
        <b-col class="casePiece">Emplacement</b-col>
        <b-col class="casePiece">Date relevé</b-col>
        <b-col class="casePiece">Index</b-col>
      </b-row>

      <b-row>
        <b-col class="casePiece">Eau Chaude</b-col>
        <b-col class="casePiece">{{
          etat.Compteur.eauChaude.emplacement
        }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.eauChaude.date }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.eauChaude.index }}</b-col>
      </b-row>
      <b-row>
        <b-col class="casePiece">Eau Froide</b-col>
        <b-col class="casePiece">{{
          etat.Compteur.eauFroide.emplacement
        }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.eauFroide.date }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.eauFroide.index }}</b-col>
      </b-row>
      <b-row>
        <b-col class="casePiece">Electrique Heure Pleine</b-col>
        <b-col class="casePiece">{{ etat.Compteur.elecHP.emplacement }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.elecHP.date }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.elecHP.index }}</b-col>
      </b-row>
      <b-row>
        <b-col class="casePiece">Electrique Heure Creuse</b-col>
        <b-col class="casePiece">{{ etat.Compteur.elecHC.emplacement }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.elecHC.date }}</b-col>
        <b-col class="casePiece">{{ etat.Compteur.elecHC.index }}</b-col>
      </b-row>
    </div>
    <div class="cle">
      <b-row class="nomPiece"> <h4>Clés</h4> </b-row>
      <b-row class="deco">
        <b-col class="casePiece">Type de clés</b-col>
        <b-col class="casePiece">Nombre</b-col>
        <b-col class="casePiece">Commentaires</b-col>
      </b-row>
      <b-row>
        <b-col class="casePiece">{{ etat.Cle.type }}</b-col>
        <b-col class="casePiece">{{ etat.Cle.nombre }}</b-col>
        <b-col class="casePiece">{{ etat.Cle.commentaires }}</b-col>
      </b-row>
    </div>
    <div class="pagebreak"></div>
    <div class="autre">
      <div class="reserve">Commentaires :</div>
      <div class="reserve">Réserve :</div>
      <p>
        Les soussignés reconnaissent exactes les constatations sur l'état du
        logement, sous réserve du bon fonctionnement des canalisations,
        appareils et installations santaires, électriques et du chauffage qui
        n'a pu être vérifié ce jour, toute défectuosité dans le tonctonnernent
        de ceux-ci devant être signalée dans le délai maximum de dix jours, et
        pendant le premier mois de la période de chauffe en ce qui concerne les
        éléments de chauffage. Les cosignataires aux présentes ont convenu du
        caractère probant et indiscutable des signatures y figurant pour être
        recueillies selon procédé informatique sécurisé au contradictoire des
        parties, ils s'accordent pour y faire référence lors du départ du
        locataire. Le présent état des lieux établi contradictoirement entre les
        parties qui le reconnaissent exact, fait partie intégrante du contrat de
        location dont il ne peut être dissocié.
      </p>
      <div class="faita">Fait à METZ le {{ etat.date.split(",")[0] }}</div>
      <b-row>
        <b-col v-if="!etat.imgSignatureProprio" class="signBas">
          Signature du Propriétaire (Entrée) :
          <VueSignaturePad
            id="signature"
            v-if="!etat.imgSignatureProprio"
            width="100%"
            height="200px"
            ref="signaturePad"
          />

          <b-button
            v-if="!etat.imgSignatureProprio && !savedProprio"
            @click="saveProprio"
            >Sauvegarger</b-button
          >
          <b-button
            v-if="!etat.imgSignatureProprio && !savedProprio"
            @click="redoProprio"
            >Recommencer</b-button
          >
        </b-col>
        <b-col v-if="etat.imgSignatureProprio" class="signBas">
          <img
            v-if="etat.imgSignatureProprio"
            :src="etat.imgSignatureProprio"
            alt=""
          />
          <span v-if="etat.imgSignatureProprio">
            Signature du Propriétaire ou de son mandataire (Entrée)</span
          >
        </b-col>
        <b-col v-if="!etat.imgSignatureLoc" class="signBas">
          Signature du Locataire (Entrée):
          <VueSignaturePad
            id="signature"
            v-if="!etat.imgSignatureLoc"
            width="100%"
            height="200px"
            ref="signaturePad2"
          />
          <b-button v-if="!etat.imgSignatureLoc && !savedLoc" @click="saveLoc"
            >Sauvegarger</b-button
          >
          <b-button v-if="!etat.imgSignatureLoc && !savedLoc" @click="redoLoc"
            >Recommencer</b-button
          >
        </b-col>
        <b-col v-if="etat.imgSignatureLoc" class="signBas">
          <img v-if="etat.imgSignatureLoc" :src="etat.imgSignatureLoc" alt="" />
          <span v-if="etat.imgSignatureLoc">
            Signature du ou des locataires (Entrée)</span
          >
        </b-col>
      </b-row>
      <b-row >
        <b-col v-if="etat.imgSignatureProprioSortie" class="signBas">
          <img
            v-if="etat.imgSignatureProprioSortie"
            :src="etat.imgSignatureProprioSortie"
            alt=""
          />
          <span v-if="etat.imgSignatureProprioSortie">
            Signature du Propriétaire ou de son mandataire (Sortie)</span
          >
        </b-col>
        <b-col v-if="etat.imgSignatureLocSortie" class="signBas">
          <img
            v-if="etat.imgSignatureLocSortie"
            :src="etat.imgSignatureLocSortie"
            alt=""
          />
          <span v-if="etat.imgSignatureLocSortie">
            Signature du ou des locataires (Sortie)</span
          >
        </b-col>
      </b-row>
    </div>
    <div class="pagebreak"></div>

    <div class="grillePhotos">
      <h1 class="ml-5 mb-4" style="text-align: left">Photos</h1>
      <!-- <img class="image50" :src="getImgUrl(photo)" v-bin:alt="photo">
            <span>{{photo}}</span>  -->
      <b-card
        v-for="(photo, i) in photosEntree"
        :key="photo.id"
        :img-src="photo.webviewPath"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 25rem; display: inline-block"
        class="mb-4 ml-4 mr-4"
      >
        <b-card-text> Image {{ i + 1 }} </b-card-text>
      </b-card>
      <b-card
        v-for="(photo, i) in photosSortie"
        :key="photo.id"
        :img-src="photo.webviewPath"
        img-alt="Image"
        img-top
        tag="article"
        style="width: 25rem; display: inline-block"
        class="mb-4 ml-4 mr-4"
      >
        <b-card-text> Image {{ i + 1 }}B </b-card-text>
      </b-card>
    </div>
    <b-row class="no-print">
      
    </b-row>

    <form v-if="!printing" id="testEnvoi" class="contact-form" @submit.prevent="sendEmail">

      <input type="submit" value="Imprimer" />
    </form>
    <b-button @click="envoyer">Envoyer</b-button>
      <b-spinner v-if="printing" variant="guerb" type="grow" label="Spinning"></b-spinner>



  </div>
</template>

<script>
import { Filesystem, Directory, } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";
var pdfMake = require('pdfmake/build/pdfmake.js');
var pdfFonts = require('pdfmake/build/vfs_fonts.js')
pdfMake.vfs = pdfFonts.pdfMake.vfs;
//import {PreviewAnyFile} from '@ionic-native/preview-any-file'
//import html2pdf from "html2pdf.js"
import { Printer } from '@ionic-native/printer';


const PHOTO_STORAGE = "photos";
export default {
  data() {
    return {
      printing : false,
      outputs:[],
      component: "AddForm",
      etat: [],
      etats: [],
      photos: [],
      savedProprio: false,
      savedLoc: false,
      sortie: false,
      pdfsrc : '',
      pdfObj : null
    };
  },
  computed: {
    photosEntree: function () {
      return this.photos.filter((photo) => {
        if(this.etat.Photos){
          return this.etat.Photos.includes(photo.filepath);
        }
        
      });
    },
    photosSortie: function () {
      return this.photos.filter((photo) => {
        if(this.etat.PhotosSortie){
          return this.etat.PhotosSortie.includes(photo.filepath);
        }
      });
    },
  },
  mounted() {
    if (localStorage.getItem("etats")) {
      try {
        this.etats = JSON.parse(localStorage.getItem("etats"));
        this.etat = this.etats[this.$route.params.id];
        console.log(this.etat);

        switch (this.etat.Bien.Type ){
          case  'A':
          this.etat.Bien.Type = "Appartement";
          break;
          case  'M':
          this.etat.Bien.Type = "Maison";
          break;
          case  'S':
          this.etat.Bien.Type = "Studio";
          break;
          case  'LC':
          this.etat.Bien.Type = "Locaux Commerciaux";
          break;
          case  'B':
          this.etat.Bien.Type = "Bureaux";
          break;
        }

        switch (this.etat.Bien.TypeDeChauffage ){
          case  'IG':
          this.etat.Bien.TypeDeChauffage = "Chauffage individuel gaz";
          break;
          case  'CG':
          this.etat.Bien.TypeDeChauffage = "Chauffage collectif gaz";
          break;
          case  'CF':
          this.etat.Bien.TypeDeChauffage = "Chauffage collectif fuel";
          break;
          case  'E':
          this.etat.Bien.TypeDeChauffage = "Chauffage électrique";
          break;
        }

        switch (this.etat.Bien.EauChaude ){
          case  'IG':
          this.etat.Bien.EauChaude = "Chauffe eau individuel gaz";
          break;
          case  'CG':
          this.etat.Bien.EauChaude = "Chauffe eau collectif gaz";
          break;
          case  'CF':
          this.etat.Bien.EauChaude = "Chauffe eau collectif fuel";
          break;
          case  'E':
          this.etat.Bien.EauChaude = "Chauffe eau électrique";
          break;
        }


      } catch (e) {
        console.log("error");
      }
    }
    this.loadSaved();
    if (this.etat.selected == "sortie") {
      this.sortie = true;
      console.log(this.sortie);
    }
  },
  methods: {
    getImgUrl(photo) {
      //var images = require.context('../assets/', false, /\.png$/)
      return require("../assets/photos/" + photo.nom);
    },
    getIndex(p) {
      let index = "error";
      this.etat.Photos.forEach((photo, i) => {
        console.log(p + " = " + photo);
        if (photo == p) {
          console.log(i);
          index = i;
        }
      });
      return index;
    },
    getIndexSortie(p) {
      let index = "error";
      this.etat.PhotosSortie.forEach((photo, i) => {
        console.log(p + " = " + photo);
        if (photo == p) {
          console.log(i);
          index = i;
        }
      });
      return index;
    },
    async sharePhoto(){
     

    },
    onSuccess(){
      console.log("succes")
    },
    onError(){
      console.log("error")
    },
    async sendEmail() {   
      this.printing = true; 
      Printer.print();

     // Printer.print()
      /*var root = document.getElementById('root');  
      var response = html2pdf().set({
        pagebreak: { mode: 'avoid-all', before: '#page2el' }
      }).from(root).outputPdf();
      var b64 =  btoa(await response);
      console.log(b64);
      PreviewAnyFile.previewBase64( win => console.log("open status",win),
          error => console.error("open failed", error),
          b64,{mimeType:'application/pdf'});  
          */
      this.printing = false;
    },
    async envoyer() {  
      console.log(this.etat);
      console.log(this.PhotosSorties);
      var bien = this.etat.Bien;
      const docDefinition = {
        content : [
          {
            text : 'Date : ' + this.etat.date.split(',')[0] ,
            style : "date"
          },
          {
            text : "Etat des lieux " + ((this.etat.selected == "entre") ? "d'entrée" : "de sortie") ,
            style : "titre" 
          },
          {
            text : "Dressé en commun et contradictoirement entre les soussignés" ,
            style : "sousTitre" 
          },
          {
            style : 'sign',
            table : {
              heights : [80,20],
              widths : [150,150,150],
              
              body : [
                [{border : [true,true,true,false],text : this.etat.Proprio.signataire + this.etat.Proprio.adresse , style : 'signataire'},
                {border : [true,true,true,false],text : this.etat.Mandataire.signataire + this.etat.Mandataire.adresse,style : 'signataire'},
                {border : [true,true,true,false],table : { body : []},style : 'signataire'}],
                [{border : [true,false,true,true],text : 'Ci-après le Propriétaire ',style : 'signatures'},{border : [true,false,true,true],text : 'Ci-après le Mandataire',style : 'signatures'}, {border : [true,false,true,true],text :'Ci-après le(s) Locataire(s)',style : 'signatures'}]
              ]
            }
          },
          { style : 'bien',
          pageBreak: 'after',
            table : {
              widths : [113,113,113,113],
              heights : [20,20,20,20,20,20],
              
              body : [
                [{text : 'Bien immobilier', colSpan : 4, style : 'tableHeader',fillColor : '#c7c7f7'},'','',''],
                [{text : 'Adresse des lieux loués : ' + bien.Adresse, colSpan : 4},'','',''],
                ['Type de bien :  ' + bien.Type,'reference :  '+ bien.REF,'LOT :  '+ bien.LOT,'BAL :  '+ bien.BAL],
                ['Etage :  '+ bien.NbEtages,'Pieces :  '+ bien.NbPieces,{text : 'Surface :  '+ bien.Surface + ' m²', colSpan : 2} ,'' ],
                [{text : 'Annexes loués avec :  '+ bien.annexes, colSpan : 4},'','',''],
                [{text : 'Type de chauffage :  '+ bien.TypeDeChauffage, colSpan : 2},'',{text : 'Eau chaude :  '+ bien.EauChaude, colSpan : 2},''],
              ]
            }
          }
        ],
         defaultStyle: {
            fontSize: 10,
            bold: false
          },
        styles : {
          titre: {
            fontSize: 24,
            bold: true,
            alignment : 'center',
            margin : [0,0,0,10]
          },
          sign : {
            margin : [18,30,0,20]
          },
          sousTitre: {
            fontSize: 12,
            bold: false,
            alignment : 'center',
          },
          date : {
            fontSize : 12,
            alignment : 'right'
          },
          signatures : {
            alignment : 'right',
            margin : [20,20,0,0]
          },
          bien : {
            margin : [12,20,0,0]
          },
          tableHeader : {
            bold : true
          },
          nomPiece : {
            fontSize : 20,
            margin : [0,20,10,10]
          },
          signataire : {
            alignment : 'center',
            margin : [0,20,0,0]
          },
          
          loc : {
            alignment : 'center',
            margin : [20,0,0,0]
          },
          sous : {
            fontSize : 10,
            margin : [0,30,0,30]
          },
          img : {
            width : '100%'
          }
        }
      }
      this.etat.Locataires.forEach(e=>{
        docDefinition.content[3].table.body[0][2].table.body.push([{border : [false,false,false,false],text : e.signataire, style : 'loc' }]);
        docDefinition.content[3].table.body[0][2].table.body.push([{border : [false,false,false,false],text : e.adresse , style : 'loc'}]);
        
        docDefinition.content[3].table.body[0][2].table.body.push([{border : [false,false,false,false],text : ''}]);
        docDefinition.content[3].table.body[0][2].table.body.push([{border : [false,false,false,false],text : ''}]);
        docDefinition.content[3].table.body[0][2].table.body.push([{border : [false,false,false,false],text : ''}]);
      })
     
      if(this.etat.selected == "entre"){      
        this.etat.Pieces.forEach(p => {
          var titre = {
            text : p.nom,
            style : 'nomPiece'
          }
          var tableau = {
            table : {
              widths : [80,80,40,150,120],
              body : [
                [{text : 'Décoration',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'Nature',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'État',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'Photo',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'Commentaires',  style : 'tableHeader',fillColor : '#c7c7f7'}]
              ]
            }
          }

          p.elDeco.forEach(el => {
            tableau.table.body.push([el.nom,el.nature,el.etat,((el.photos)? el.photos : ''),((el.commentaires)? el.commentaires : '')])
          })

          if(p.elElec){
            tableau.table.body.push(
               [{text : 'Électrique',  style : 'tableHeader',fillColor : '#ffe4e4'},
                {text : 'Quantité',  style : 'tableHeader',fillColor : '#ffe4e4'},
                {text : 'État',  style : 'tableHeader',fillColor : '#ffe4e4'},
                {text : 'Photo',  style : 'tableHeader',fillColor : '#ffe4e4'},
                {text : 'Commentaires',  style : 'tableHeader',fillColor : '#ffe4e4'}]
            )
            p.elElec.forEach(el => {
            tableau.table.body.push([el.nom,el.nature,el.etat,((el.photos)? el.photos : ''),((el.commentaires)? el.commentaires : '')])
          })
          }

           if(p.elEquip){
            tableau.table.body.push(
               [{text : 'Équipement',  style : 'tableHeader',fillColor : '#dcfddc'},
                {text : 'Marque',  style : 'tableHeader',fillColor : '#dcfddc'},
                {text : 'État',  style : 'tableHeader',fillColor : '#dcfddc'},
                {text : 'Photo',  style : 'tableHeader',fillColor : '#dcfddc'},
                {text : 'Commentaires',  style : 'tableHeader',fillColor : '#dcfddc'}]
            )
            p.elEquip.forEach(el => {
            tableau.table.body.push([el.nom,el.nature,el.etat,((el.photos)? el.photos : ''),((el.commentaires)? el.commentaires : '')])
          })
          }

          docDefinition.content.push(titre);
          docDefinition.content.push(tableau);
        });
      }

      var cpt = this.etat.Compteur;
      var titreCompteur = {
            text : 'Compteur',
            style : 'nomPiece',
            
            pageBreak: 'before',
          }
      var compteur = {
        table : { 
          widths : [120,120,120,120],
          body : [
                [{text : 'Type de compteur',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'Emplacement',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'Date relevé',  style : 'tableHeader',fillColor : '#c7c7f7'},
                {text : 'Index',  style : 'tableHeader',fillColor : '#c7c7f7'},
              ],
              ['Eau chaude',cpt.eauChaude.emplacement, cpt.eauChaude.date, cpt.eauChaude.index],
              ['Eau Froide',cpt.eauFroide.emplacement,cpt.eauFroide.date,cpt.eauFroide.index],
              ['Electrique heures pleines',cpt.elecHP.emplacement,cpt.elecHP.date,cpt.elecHP.index ],  
              ['Electrique heures creuses',cpt.elecHC.emplacement,cpt.elecHC.date,cpt.elecHC.index ]
          ]
        }
      }
      docDefinition.content.push(titreCompteur);
      docDefinition.content.push(compteur);

      var sous = {
        style : 'sous',
        text : "Les soussignés reconnaissent exactes les constatations sur l'état du logement, sous réserve du bon fonctionnement des canalisations, appareils et installations santaires, électriques et du chauffage qui n'a pu être vérifié ce jour, toute défectuosité dans le tonctonnernent de ceux-ci devant être signalée dans le délai maximum de dix jours, et pendant le premier mois de la période de chauffe en ce qui concerne les éléments de chauffage. Les cosignataires aux présentes ont convenu du caractère probant et indiscutable des signatures y figurant pour être recueillies selon procédé informatique sécurisé au contradictoire des parties, ils s'accordent pour y faire référence lors du départ du locataire. Le présent état des lieux établi contradictoirement entre les parties qui le reconnaissent exact, fait partie intégrante du contrat de location dont il ne peut être dissocié."      }

      docDefinition.content.push(sous);

      var faita = {
        text : 'Fait à Metz le ' + this.etat.date.split(',')[0]
      }

      docDefinition.content.push(faita);

      if(this.etat.imgSignatureProprio && this.etat.imgSignatureLoc){

      
        var sign1 = {
          style : 'signataire',
          pageBreak : 'after',
          table : {
            widths : [250,250],
            body : [
              [
                {
                  image : this.etat.imgSignatureProprio,
                  width : 200,
                  border : [true,true,true,false]
                },
                {
                  image : this.etat.imgSignatureLoc,
                  width : 200,
                  border : [true,true,true,false]
                }
              ],
              [{ border : [true,false,true,true] , text : 'Signature du propriétaire ou de son mandataire'},
              { border : [true,false,true,true] , text : 'Signature du ou des locataires'}]
            ]
          }
          
        } 
        docDefinition.content.push(sign1);
      }
      if(this.etat.Photos){
        var titrephotos = {
          text : 'Photos',
          style : 'nomPiece'
        }
        docDefinition.content.push(titrephotos)
        var tablePhotos = {
          table : {
            widths : [250,250],
            body : []
          }
        }
        for (let index = 0; index < this.photosEntree.length; index++) {
          console.log(index + '   ' + this.photosEntree.length)
         tablePhotos.table.body.push([
           {border : [false,false,false,false],
             image : this.photosEntree[index].webviewPath,
             width : 200
           },
            ((this.photosEntree[index+1]) ? {
              border : [false,false,false,false],
             image : this.photosEntree[index+1].webviewPath,
             width : 200
           } : {border : [false,false,false,false],text : ''} ),
             
           

         ]);
         tablePhotos.table.body.push([
           {border : [false,false,false,false],
             text : this.photosEntree[index].filepath,
             width : 200
           },
            ((this.photosEntree[index+1]) ? {
              border : [false,false,false,false],
             text : this.photosEntree[index+1].filepath,
             width : 200
           } : {text : '',border : [false,false,false,false],} ),
         ])
         index ++;
          
        }
        docDefinition.content.push(tablePhotos);
      }
      this.pdfObj = pdfMake.createPdf(docDefinition);
      this.pdfObj.open();
     /* this.pdfObj.getBase64(async (data) =>{
        PreviewAnyFile.previewBase64( win => console.log("open status",win),
          error => console.error("open failed", error),
          data,{mimeType:'application/pdf'}); 
      });*/
      //try pdfmake

      //page blanche pue la merde
      /*this.printing = true; 
      
      var root = document.getElementById('root');  
      var response = html2pdf().set({
        pagebreak: { mode: 'avoid-all', before: '#page2el' }
      }).from(root).outputPdf();
      var b64 =  await btoa(await response);
      PreviewAnyFile.previewBase64( win => console.log("open status",win),
          error => console.error("open failed", error),
          b64,{mimeType:'application/pdf'});  
          
      this.printing = false;*/
    },
    saveProprio() {
      const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if (!isEmpty) {
        this.savedProprio = true;
        this.$refs.signaturePad.lockSignaturePad();
        this.etat.imgSignatureProprio = data;
        this.etats.forEach((e, index) => {
          if (index == this.$route.params.id) {
            this.etats[index] = this.etat;
            console.log(e);
            const parsedEtats = JSON.stringify(this.etats);
            localStorage.setItem("etats", parsedEtats);
          }
        });
      }
    },
    redoProprio() {
      this.$refs.signaturePad.clearSignature();
    },
    saveLoc() {
      const { isEmpty, data } = this.$refs.signaturePad2.saveSignature();
      if (!isEmpty) {
        this.savedLoc = true;
        this.$refs.signaturePad2.lockSignaturePad();
        this.etat.imgSignatureLoc = data;
        console.log("oui");
        this.etats.forEach((e, index) => {
          if (index == this.$route.params.id) {
            this.etats[index] = this.etat;
            console.log(e);
            const parsedEtats = JSON.stringify(this.etats);
            localStorage.setItem("etats", parsedEtats);
          }
        });
      }
    },
    redoLoc() {
      this.$refs.signaturePad2.clearSignature();
    },
    async loadSaved() {
      const photoList = await Storage.get({ key: PHOTO_STORAGE });
      const photosInStorage = [];
      JSON.parse(photoList.value).forEach((element) => {
        if (
          this.etat.Photos && this.etat.Photos.includes(element.filepath) ||
           this.etat.PhotosSortie && this.etat.PhotosSortie.includes(element.filepath)
        ) {
          photosInStorage.push(element);
        }
      });
      console.log(photosInStorage);
      for (const photo of photosInStorage) {
        const file = await Filesystem.readFile({
          path: photo.filepath,
          directory: Directory.Data,
        });
        photo.webviewPath = `data:image/jpeg;base64,${file.data}`;
      }

      this.photos = photosInStorage;
    },
  },
};
</script>
<style lang="scss">
@media print {
  .pagebreak {
    page-break-before: always;
  }

  .no-print,
  .no-print * {
    display: none !important;
  } /* page-break-after works, as well */
}
p {
  text-align: left;
}
h5 {
  position: absolute;
  right: 10px;
}
.signBas {
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 0px 10px 10px;
  margin-left: 40px;
  margin-right: 40px;
  text-align: center;
  position: relative;
}
.signBas2 {
  height: 140px;
}

.image50 {
  width: 30%;
}
.grpImg {
  display: block;
}

.grillePhotos {
  margin-top: 400px;
}
.faita {
  margin-top: 40px;
  text-align: left;
  margin-bottom: 20px;
}
.autre {
  margin-top: 100px;
  margin-left: 40px;
  margin-right: 40px;
}
.reserve {
  margin-bottom: 20px;
  text-align: left;
  border: 1px solid black;
  border-radius: 10px;
  padding: 10px 0px 10px 10px;
  height: 150px;
}
h4 {
  text-align: center;
}
#root {
  margin-top: 20px;
}
.bienImmoTitre {
  background-color: rgb(199, 199, 247);
}
.Pieces {
  margin-top: 100px;
  margin-left: 40px;
  margin-right: 40px;
}
.cle {
  margin-top: 100px;
  margin-left: 40px;
  margin-right: 40px;
}
.casePiece {
  border: 1px solid black;
  padding: 10px 0px 10px 10px;
  margin-top: -1px;
  margin-right: -1px;
}
.case {
  text-align: left;
  border: 1px solid black;
  margin-top: -1px;
  padding: 10px 0px 10px 10px;
}
.bienImmo {
  margin-top: 30px;
  margin-left: 40px;
  margin-right: 40px;
}
.cadreSignature {
  border: 1px solid black;
  margin-left: 5px;
  margin-right: 5px;
}
.nomPiece {
  margin-left: 20px;
}

.cadresSignature {
  margin-top: 30px;
  margin-left: 20px;
  margin-right: 20px;
}
.ciApresMarge {
  margin-top: 50px;
}
.ciApres {
  position: absolute;
  bottom: 0;
  right: 10px;
}
.deco {
  background-color: rgb(230, 230, 255);
}
.ele {
  background-color: rgb(255, 228, 228);
}
.equip {
  background-color: rgb(220, 253, 220);
}
.retourBtn {
  position: absolute;
  left: 10px;
}
</style>