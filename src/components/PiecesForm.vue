<template>
  <div>
    <b-form class="formulaire" @submit="onSubmit">
      <b-container
        v-for="(piece, n) in etat.Pieces"
        :key="piece.id"
        class="bv-example-row mb-5"
      >
        <b-row>
          <b-col>
            <h3 class="sousTitre">{{ piece.nom }}</h3>
          </b-col>
        </b-row>
        <b-row class="sousPartie1">
          <b-col>
            <h4>Décoration</h4>
          </b-col>
        </b-row>
        <div
          class="rowInner"
          style="margin-bottom: 1rem"
          v-for="el in pieces[n].elDeco"
          :key="el.id"
        >
          <b-row style="margin-bottom: 0.5rem">
            <b-col>
              <b-form-input v-model="el.nom" placeholder="Nom de l'élement">
              </b-form-input>
            </b-col>
            <b-col>
              <b-form-select v-model="el.nature" :options="NaturePossibles">
              </b-form-select>
            </b-col>
            <b-col>
              <b-form-select v-model="el.etat" :options="TypeEtatPossibles">
              </b-form-select>
            </b-col>
            <b-col class="photo" cols="1">
              <b-button variant="guerb" @click="takePhoto2(el)">📷</b-button>
            </b-col>
            <b-col v-if="el.photos[0]">
              <span v-for="(p, i) in el.photos" :key="p.id">
                <span v-if="i != 0"> , </span> {{ p }}</span
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col md="9">
              <b-form-input
                v-model="el.commentaires"
                placeholder="commentaires à propos l'élement"
              >
              </b-form-input>
            </b-col>
            <b-col>
              <b-button variant="danger" @click="supprimerElt(el, piece)">
                Supprimer
              </b-button>
            </b-col>
          </b-row>
          <b-row> </b-row>
        </div>

        <b-col>
          <b-button size="sm" variant="outline-guerb" @click="addElement(1, n)"
            >Ajouter un élement</b-button
          >
        </b-col>
        <b-row class="sousPartie2">
          <b-col>
            <h4>Electrique</h4>
          </b-col>
        </b-row>
        <div
          class="rowInner"
          style="margin-bottom: 1rem"
          v-for="el in pieces[n].elElec"
          :key="el.id"
        >
          <b-row style="margin-bottom: 0.5rem">
            <b-col>
              <b-form-input v-model="el.nom" placeholder="Nom de l'élement">
              </b-form-input>
            </b-col>
            <b-col>
              <b-form-input v-model="el.nature" placeholder="Quantité">
              </b-form-input>
            </b-col>
            <b-col>
              <b-form-select v-model="el.etat" :options="TypeEtatPossibles">
              </b-form-select>
            </b-col>
            <b-col class="photo" cols="1">
              <b-button variant="guerb" @click="takePhoto2(el)">📷</b-button>
            </b-col>
            <b-col v-if="el.photos[0]">
              <span v-for="(p, i) in el.photos" :key="p.id">
                <span v-if="i != 0"> , </span> {{ p }}</span
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col md="9">
              <b-form-input
                v-model="el.commentaires"
                placeholder="commentaires à propos l'élement"
              >
              </b-form-input>
            </b-col>
            <b-col>
              <b-button variant="danger" @click="supprimerElt(el, piece)">
                Supprimer
              </b-button>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col>
            <b-button
              size="sm"
              variant="outline-guerb"
              @click="addElement(2, n)"
              >Ajouter un élement</b-button
            >
          </b-col>
        </b-row>
        <b-row class="sousPartie2">
          <b-col>
            <h4>Equipment</h4>
          </b-col>
        </b-row>
        <div
          class="rowInner"
          style="margin-bottom: 1rem"
          v-for="el in pieces[n].elEquip"
          :key="el.id"
        >
          <b-row style="margin-bottom: 0.5rem">
            <b-col>
              <b-form-input v-model="el.nom" placeholder="Nom de l'élement">
              </b-form-input>
            </b-col>
            <b-col>
              <b-form-input v-model="el.nature" placeholder="Marque/Objet">
              </b-form-input>
            </b-col>
            <b-col>
              <b-form-select v-model="el.etat" :options="TypeEtatPossibles">
              </b-form-select>
            </b-col>
            <b-col class="photo" cols="1">
              <b-button variant="guerb" @click="takePhoto2(el)">📷</b-button>
            </b-col>
            <b-col v-if="el.photos[0]">
              <span v-for="(p, i) in el.photos" :key="p.id">
                <span v-if="i != 0"> , </span> {{ p }}</span
              >
            </b-col>
          </b-row>
          <b-row>
            <b-col md="9">
              <b-form-input
                v-model="el.commentaires"
                placeholder="commentaires à propos l'élement"
              >
              </b-form-input>
            </b-col>
            <b-col>
              <b-button variant="danger" @click="supprimerElt(el, piece)">
                Supprimer
              </b-button>
            </b-col>
          </b-row>
        </div>
        <b-row>
          <b-col>
            <b-button
              size="sm"
              variant="outline-guerb"
              @click="addElement(3, n)"
              >Ajouter un élement</b-button
            >
          </b-col>
        </b-row>
      </b-container>
    </b-form>
  </div>
</template>

<script>
import { Camera, CameraResultType, CameraSource } from "@capacitor/camera";
import { Filesystem, Directory } from "@capacitor/filesystem";
import { Storage } from "@capacitor/storage";

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
  computed: {
    cachePhotos: function () {
      return Storage.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });
    },
  },
  data() {
    return {
      photos: [],
      file: null,
      etat: {},
      pieces: [],
      idDispo: 0,

      TypeEtatPossibles: [
        { value: "", text: "Etat", disabled: true },
        { value: "HS", text: "Hors-Service" },
        { value: "D", text: "Dégradé" },
        { value: "ME", text: "Mauvais état" },
        { value: "EU", text: "Etat d'usage" },
        { value: "BE", text: "Bon état" },
      ],
      NaturePossibles: [
        { value: "", text: "Nature", disabled: true },
        { value: "Bois", text: "Bois" },
        { value: "Aluminium", text: "Aluminium" },
        { value: "PVC", text: "PVC" },
        { value: "Verre", text: "Verre" },
        { value: "Composite", text: "Composite" },
        { value: "Parquet", text: "Parquet" },
        { value: "Stratifie", text: "Stratifié" },
        { value: "Carrelage", text: "Carrelage" },
        { value: "Linoleum", text: "Linoléum" },
        { value: "Beton-cire", text: "Béton ciré" },
        { value: "Jonc-de-mer", text: "Jonc de mer" },
        { value: "Peinture", text: "Peinture" },
        { value: "Papier-peint", text: "Papier peint" },
        { value: "Crepi", text: "Crépi" },
        { value: "Lambri", text: "Lambri" },
        { value: "Toile-de-verre", text: "Toile de verre" },
        { value: "Tissu-mural", text: "Tissu mural" },
      ],
    };
  },
  methods: {
    nomPhoto(files) {
      //this.etat.Photos.push(files[0].name);
      return files.length === 1
        ? files[0].name
        : `${files.length} fichiers sélectionnés`;
    },
    supprimerElt(elementASupprimer, piece) {
      console.log(this.pieces);
      this.pieces.forEach((p) => {
        if (p.nom == piece.nom) {
          p.elDeco.forEach((el, index) => {
            if (el.id == elementASupprimer.id) {
              p.elDeco.splice(index, 1);
            }
          });
          p.elEquip.forEach((el, index) => {
            if (el.id == elementASupprimer.id) {
              p.elEquip.splice(index, 1);
            }
          });
          p.elElec.forEach((el, index) => {
            if (el.id == elementASupprimer.id) {
              p.elElec.splice(index, 1);
            }
          });
        }
      });
    },
    ID() {
      return "_" + Math.random().toString(36).substr(2, 9);
    },
    onSubmit() {
      Storage.set({
        key: PHOTO_STORAGE,
        value: JSON.stringify(this.photos),
      });

      if (localStorage.getItem("etats")) {
        try {
          var etats = JSON.parse(localStorage.getItem("etats"));
          etats.pop();
          this.etat.Pieces = this.pieces;
          etats.push(this.etat);
          const parsedEtats = JSON.stringify(etats);
          localStorage.setItem("etats", parsedEtats);
          this.$router.push("/");
        } catch (e) {
          localStorage.removeItem("etats");
        }
      }
    },
    addElement(type, numPiece) {
      var element = {
        id: this.idDispo,
        nom: "",
        nature: "",
        etat: "",
        photos: [],
        commentaires: "",
      };
      this.idDispo += 1;
      if (type == 1) {
        //deco
        this.pieces[numPiece].elDeco.push(element);
      } else if (type == 2) {
        //elec
        this.pieces[numPiece].elElec.push(element);
      } else {
        //equipment
        this.pieces[numPiece].elEquip.push(element);
      }
      console.log("apres");
      console.log(this.pieces[numPiece].elDeco);
    },
    popElement(type, numPiece) {
      if (type == 1) {
        //deco
        this.pieces[numPiece].elDeco.pop();
      } else if (type == 2) {
        //elec
        this.pieces[numPiece].elElec.pop();
      } else {
        //equipment
        this.pieces[numPiece].elEquip.pop();
      }
    },
    async takePhoto2(el) {
      const cameraPhoto = await Camera.getPhoto({
        resultType: CameraResultType.Uri,
        source: CameraSource.Camera,
        quality: 100,
      });
      console.log(cameraPhoto);
      var fileName = new Date().getTime() + ".jpeg";
      el.photos.push(fileName);
      this.etat.Photos.push(fileName);
      this.photos.push(await this.savePicture(cameraPhoto, fileName));
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
    async loadSaved() {
      const photoList = await Storage.get({ key: PHOTO_STORAGE });
      const photosInStorage = photoList.value
        ? JSON.parse(photoList.value)
        : [];

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
  mounted() {
    this.loadSaved();
    if (localStorage.getItem("etats")) {
      try {
        var etats = JSON.parse(localStorage.getItem("etats"));
        this.etat = etats[etats.length - 1];
      } catch (e) {
        localStorage.removeItem("etats");
      }
    }
    for (var i = 0; i < this.etat.Pieces.length; i++) {
      var p = {
        id: this.etat.Pieces[i].id,
        nom: this.etat.Pieces[i].nom,
        elDeco: [
          { id: this.ID(), nom: "Porte", nature: "", etat: "", photos: [] },
          { id: this.ID(), nom: "Murs", nature: "", etat: "", photos: [] },
          { id: this.ID(), nom: "Sols", nature: "", etat: "", photos: [] },
        ],
        elEquip: [],
        elElec: [
          { id: this.ID(), nom: "Ampoule", nature: "", etat: "", photos: [] },
          { id: this.ID(), nom: "Luminaire", nature: "", etat: "", photos: [] },
          { id: this.ID(), nom: "Applique", nature: "", etat: "", photos: [] },
          { id: this.ID(), nom: "Prises", nature: "", etat: "", photos: [] },
          {
            id: this.ID(),
            nom: "Interrupteurs",
            nature: "",
            etat: "",
            photos: [],
          },
        ],
      };
      if (p.nom.includes("Salon")) {
        p.elEquip.push({
          id: this.ID(),
          nom: "Placards",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Volets",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Armoire",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Thermostat",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Cheminée",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Rideaux",
          nature: "",
          etat: "",
          photos: [],
        });
      }
      if (p.nom.includes("Chambre")) {
        p.elEquip.push({
          id: this.ID(),
          nom: "Placards",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Volets",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Armoire",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Miroir",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Cheminée",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Rideaux",
          nature: "",
          etat: "",
          photos: [],
        });
      }
      if (p.nom.includes("bain")) {
        p.elEquip.push({
          id: this.ID(),
          nom: "Baignoire",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Volets",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Douche",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Miroir",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Tablette",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Armoire",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Meuble-lavabo",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Joints",
          nature: "",
          etat: "",
          photos: [],
        });
      }

      if (p.nom.includes("WC")) {
        p.elEquip.push({
          id: this.ID(),
          nom: "Chasse d'eau",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Volets",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Réservoir",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Cuvette",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Abattant",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Brosse",
          nature: "",
          etat: "",
          photos: [],
        });
      }
      if (p.nom.includes("Cuisine")) {
        p.elEquip.push({
          id: this.ID(),
          nom: "Meuble haut",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Volets",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Meuble bas",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Evier",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Four",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Lave-vaisselle",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Hotte",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Plaque de cuisson",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Robinetterie",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Joints",
          nature: "",
          etat: "",
          photos: [],
        });
      }
      if (p.nom.includes("Entr")) {
        p.elEquip.push({
          id: this.ID(),
          nom: "Interphone",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Volets",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Visiophone",
          nature: "",
          etat: "",
          photos: [],
        });
        p.elEquip.push({
          id: this.ID(),
          nom: "Détecteur de fumée",
          nature: "",
          etat: "",
          photos: [],
        });
      }
      this.pieces.push(p);
    }
    console.log(this.etat.Pieces);
  },
};
</script>

<style lang="scss">
.custom-file-input {
  content: "Photo";
}

h4 {
  text-align: left;
}
.photo {
  padding-top: 4px;
}
.rowElt {
  margin-top: 10px;
}
.sousPartie1 {
  margin-top: 20px;
}
.sousPartie2 {
  margin-top: 30px;
}
</style>