<template>
  <div class="pagination">
    <div
      :class="`pagination__control ${currentPage === 1? 'disabled':''}`"
      @click="handleControlClicked('prev')"
    >
      &lt; Prev
    </div>

    <div class="pagination__state">
      <input 
        class="pagination__state__input"
        :value="currentPage" 
        @change="handlePageChanged"
      />

      <div class="pagination__state__total">
        {{ ` from  ${totalPages}` }}
      </div>
    </div>

    <div
      :class="`pagination__control ${currentPage === totalPages? 'disabled':''}`"
      @click="handleControlClicked('next')"
    >
      Next &gt; 
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      currentPage: "currentPage",
      totalPages: "totalPages"
    })
  },
  methods: {
    getNewPageData (newPage) {
      if( newPage > this.totalPages ) newPage = this.totalPages  
      if( newPage < 1 ) newPage = 1
      this.$store.dispatch('getViewData', { page: newPage})
    },
    handleControlClicked(direction) {
      let newPage = +this.currentPage + (direction === 'prev'? -1: 1)

      this.getNewPageData(newPage)
    },
    handlePageChanged(ev) {
      let newPage = +ev.target.value

      if( typeof(newPage) !== 'number' ) return
      if( newPage === +this.currentPage ) return 
      
      newPage = Math.round(newPage)
      this.getNewPageData(newPage)
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.pagination {
  box-sizing: border-box;
  width: 100%;
  height: 40px;
  padding-left: 20px;
  padding-right: 20px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  background: $back_sec;
  color: $white;

  &__logo {
    box-sizing: border-box;
    padding-right: 20px;
    font-size: $text_xl;
    font-weight: bold;
  }

  &__links {
    box-sizing: border-box;
    font-size: $text;
    font-weight: normal;
    flex: 1;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;

    &__item {
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
