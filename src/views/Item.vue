<template>
  <div class="item">
    <h1> {{ `This is an item page ${$route.params.id}`}} </h1>
  </div>
</template>

<script>
// import CardsList from '@/components/CardsList'

// import { mapGetters } from "vuex"

export default {
  name: "list",
  // components: {
  // 	CardsList
  // },
  // computed: {
  //   ...mapGetters({
  //     viewData: "viewData"
  //   })
  // },  
  async created() {
//    await this.$store.dispatch('getViewData', null)
//  	debugger
  }
}
</script>

<style scoped lang="scss">
.list {
	width: 100%;
}
</style>