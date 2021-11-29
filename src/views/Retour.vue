<template>
  <div id="root">
    <b-button class="no-print retourBtn" @click="$router.push('/')"
      >Retour</b-button
    >
    <h5 v-if="etat.selected == 'entre'">
      Date d'entrée : {{ ((etat.date) ? etat.date.split(",")[0] : "pas de date") }}
    </h5>
    <h5 v-else>Date de sortie : {{ ((etat.date) ? etat.date.split(",")[0] : "pas de date") }}</h5>
    <h1 >Etat des Lieux de sortie</h1>
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
            <b-form-select v-model="el.etatSortie" :options="TypeEtatPossibles">
            </b-form-select>
          </b-col>
          <b-col class="casePiece">
            <b-button variant="outline-guerb" @click="takePhoto2(el)"
              >📷</b-button
            >
            <span v-for="(p, i) in el.photosSortie" :key="p.id">
              <span v-if="i != 0"> , </span> {{ p }}</span
            >
          </b-col>
          <b-col class="casePiece">
            <b-form-input
              v-model="el.commentaireSortie"
              placeholder="commentaires à propos l'élement"
            >
            </b-form-input>
          </b-col>
        </b-row>
      </div>
      <b-row class="ele">
        <b-col class="casePiece">Electrique</b-col>
        <b-col class="casePiece">Nature</b-col>
        <b-col class="casePiece">Etat</b-col>
        <b-col class="casePiece">Photo</b-col>
        <b-col class="casePiece">Commentaires</b-col>
      </b-row>
      <div v-for="el in piece.elElec" :key="el.id">
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
            <b-form-select v-model="el.etatSortie" :options="TypeEtatPossibles">
            </b-form-select>
          </b-col>
          <b-col class="casePiece">
            <b-button variant="outline-guerb" @click="takePhoto2(el)"
              >📷</b-button
            >
            <span v-for="(p, i) in el.photosSortie" :key="p.id">
              <span v-if="i != 0"> , </span> {{ p }}</span
            >
          </b-col>
          <b-col class="casePiece">
            <b-form-input
              v-model="el.commentaireSortie"
              placeholder="commentaires à propos l'élement"
            >
            </b-form-input>
          </b-col>
        </b-row>
      </div>
      <b-row class="equip">
        <b-col class="casePiece">Equipment</b-col>
        <b-col class="casePiece">Nature</b-col>
        <b-col class="casePiece">Etat</b-col>
        <b-col class="casePiece">Photo</b-col>
        <b-col class="casePiece">Commentaires</b-col>
      </b-row>
      <div v-for="el in piece.elEquip" :key="el.id">
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
          <b-col class="casePiece">
            <span v-for="(p, i) in el.photos" :key="p.id">
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
            <b-form-select v-model="el.etatSortie" :options="TypeEtatPossibles">
            </b-form-select>
          </b-col>
          <b-col class="casePiece">
            <b-button variant="outline-guerb" @click="takePhoto2(el)"
              >📷</b-button
            >
            <span v-for="(p, i) in el.photosSortie" :key="p.id">
              <span v-if="i != 0"> , </span> {{ p }}</span
            >
          </b-col>
          <b-col class="casePiece">
            <b-form-input
              v-model="el.commentaireSortie"
              placeholder="commentaires à propos l'élement"
            >
            </b-form-input>
          </b-col>
        </b-row>
      </div>
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
      <div class="faita">Fait à METZ le {{ ((etat.date) ? etat.date.split(",")[0] : "pas de date") }}</div>
      <b-row>
        <b-col v-if="!etat.imgSignatureProprioSortie" class="signBas">
          Signature du Propriétaire :
          <VueSignaturePad
            id="signature"
            v-if="!etat.imgSignatureProprioSortie"
            width="100%"
            height="200px"
            ref="signaturePad"
          />

          <b-button v-if="!etat.imgSignatureProprioSortie && !savedProprio" @click="saveProprio"
            >Sauvegarger</b-button
          >
          <b-button v-if="!etat.imgSignatureProprioSortie && !savedProprio" @click="redoProprio"
            >Recommencer</b-button
          >
        </b-col>
        <b-col v-if="etat.imgSignatureProprioSortie" class="signBas">
          <img
            v-if="etat.imgSignatureProprioSortie"
            :src="etat.imgSignatureProprioSortie"
            alt=""
          />
          <span v-if="etat.imgSignatureProprioSortie">
            Signature du Propriétaire ou de son mandataire</span
          >
        </b-col>
        <b-col v-if="!etat.imgSignatureLocSortie" class="signBas">
          Signature du Locataire :
          <VueSignaturePad
            id="signature"
            v-if="!etat.imgSignatureLocSortie"
            width="100%"
            height="200px"
            ref="signaturePad2"
          />
          <b-button v-if="!etat.imgSignatureLocSortie && !savedLoc" @click="saveLoc"
            >Sauvegarger</b-button
          >
          <b-button v-if="!etat.imgSignatureLocSortie && !savedLoc" @click="saveLoc"
            >Recommencer</b-button
          >
        </b-col>
        <b-col v-if="etat.imgSignatureLocSortie" class="signBas">
          <img v-if="etat.imgSignatureLocSortie" :src="etat.imgSignatureLocSortie" alt="" />
          <span v-if="etat.imgSignatureLocSortie">
            Signature du ou des locataires</span
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
        v-for="(photo, i) in photos"
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
    </div>
    <b-row class="no-print">
      <b-col>
        <b-button variant="guerb" @click="onSubmit"> Valider </b-button>
      </b-col>
    </b-row>
  </div>
</template>

<script>
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";

import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";

const PHOTO_STORAGE = "photos";

export function usePhotoGallery() {
  const takePhoto = async () => {
    const cameraPhoto = await Camera.getPhoto({
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera,
      quality: 100,
    });
    this.loadSaved();
    console.log(cameraPhoto);
  };

  return {
    takePhoto,
  };
}

export default {
  setup() {
    const { takePhoto } = usePhotoGallery();

    return {
      takePhoto,
    };
  },
  data() {
    return {
      component: "AddForm",
      etat: [],
      etats: [],
      photos: [],
      savedProprio: false,
      savedLoc: false,
      TypeEtatPossibles: [
        { value: "", text: "Etat à la sortie", disabled: true },
        { value: "HS", text: "Hors-Service" },
        { value: "D", text: "Dégradé" },
        { value: "ME", text: "Mauvais état" },
        { value: "EU", text: "Etat d'usage" },
        { value: "BE", text: "Bon état" },
      ],
    };
  },
  mounted() {
    if (localStorage.getItem("etats")) {
      try {
        this.etats = JSON.parse(localStorage.getItem("etats"));
        this.etat = this.etats[this.$route.params.id];
        console.log(this.etat);
      } catch (e) {
        console.log("error");
      }
    }
    this.loadSaved();
    this.etat.PhotosSortie = [];
    this.etat.Pieces.forEach((p) => {
      if (p.elDeco != null) {
        p.elDeco.forEach((e) => {
          e.etatSortie = "";
          e.photosSortie = [];
          e.commentaireSortie = "";
        });
      }
      if (p.elElec != null) {
        p.elElec.forEach((e) => {
          e.etatSortie = "";
          e.photosSortie = [];
          e.commentaireSortie = "";
        });
      }
      if (p.elEquip != null) {
        p.elEquip.forEach((e) => {
          e.etatSortie = "";
          e.photosSortie = [];
          e.commentaireSortie = "";
        });
      }
    });
  },
  methods: {
    async takePhoto2(el) {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      console.log(cameraPhoto);
      var fileName = new Date().getTime() + ".jpeg";
      el.photosSortie.push(fileName);
      this.etat.PhotosSortie.push(fileName);
      this.photos.push(await this.savePicture(cameraPhoto, fileName));
    },
    onSubmit() {
      Storage.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });

      if (localStorage.getItem("etats")) {
        try {
          var etats = JSON.parse(localStorage.getItem("etats"));
          //this.etat.Pieces = this.pieces;
          this.etat.selected = "sortie";
          etats.push(this.etat);
          const parsedEtats = JSON.stringify(etats);
          localStorage.setItem("etats", parsedEtats);
          this.$router.push("/");
        } catch (e) {
          localStorage.removeItem("etats");
        }
      }
    },
    convertBlobToBase64(blob) {
      return new Promise(function (resolve, reject) {
        var reader = new FileReader();
        reader.onerror = reject;
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.readAsDataURL(blob);
      });
    },
    async savePicture(photo, fileName) {
      let base64Data;

      // Fetch the photo, read as a blob, then convert to base64 format
      const response = await fetch(photo.webPath);
      const blob = await response.blob();
      base64Data = await this.convertBlobToBase64(blob);

      const savedFile = await Filesystem.writeFile({
        path: fileName,
        data: base64Data,
        directory: Directory.Data,
      });
      console.log(savedFile);

      // Use webPath to display the new image instead of base64 since it's
      // already loaded into memory
      return {
        filepath: fileName,
        webviewPath: photo.webPath,
      };
    },
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
  saveProprio() { 
    const { isEmpty, data } = this.$refs.signaturePad.saveSignature();
      if(!isEmpty){
        this.savedProprio = true;
        this.$refs.signaturePad.lockSignaturePad();
        this.etat.imgSignatureProprioSortie = data;
        
      }
    },
  redoProprio(){
    this.$refs.signaturePad.clearSignature();
  },
  saveLoc() { 
    const { isEmpty, data } = this.$refs.signaturePad2.saveSignature();
      if(!isEmpty){
        
        this.savedLoc = true;
        this.$refs.signaturePad2.lockSignaturePad();
        this.etat.imgSignatureLocSortie = data;
        console.log("oui")
        
      }
    },
  redoLoc(){
    this.$refs.signaturePad2.clearSignature();
  },
    async loadSaved() {
      const photoList = await Storage.get({ key: PHOTO_STORAGE });
      const photosInStorage = [];
      JSON.parse(photoList.value).forEach((element) => {
        if (this.etat.Photos.includes(element.filepath)) {
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
.casePieceRetour {
  padding: 10px 0px 10px 10px;
  margin-top: -1px;
  margin-right: 1px;
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