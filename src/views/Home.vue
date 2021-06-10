<template>
  <div class="home">
    <ListeEtats titre="Liste des états des lieux"/>
  </div>
</template>

<script>
// @ is an alias to /src
import ListeEtats from '@/components/ListeEtats.vue'

export default {
  name: 'Home',
  components: {
    ListeEtats
  }
}
</script>
