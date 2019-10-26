<template>
  <div class="list">
    <div  class="list__title">
    	{{ listTitle }}
    </div>
    
    <cards-list 
    	class="list__content"
    	:listData="viewData"
    />

    <pagination-component />
  </div>
</template>

<script>
import CardsList from '@/components/CardsList'
import PaginationComponent from '@/components/PaginationComponent'

import { mapGetters } from "vuex"

export default {
  name: "list",
  components: {
  	CardsList,
  	PaginationComponent
  },
  computed: {
    ...mapGetters({
    	listTitle: "currentTitle",
      viewData: "viewData"
    })
  },  
  async created() {
    await this.$store.dispatch('getViewData', null)
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.list {
	box-sizing: border-box;
	width: 100%;
	padding: 10px;
	display: flex;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	background: $back_prim;

	&__title {
		box-sizing: border-box;
		padding-left: 10px;
		padding-top: 10px;
		padding-bottom: 10px;
		align-self: flex-start;
		font-size: $title;
		font-weight: bold;
		color: $black;
	}
}
</style>