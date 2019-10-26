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
  padding: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  color: $white;

  &__control {
    box-sizing: border-box;
    height: 30px;
    width: 80px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: $back_sec;
    font-size: $text_xl;
    font-weight: 400;
    border-radius: 30px;
    cursor: pointer;

    &:hover {
      opacity: 0.5;
    }
    &.disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }

  &__state {
    box-sizing: border-box;
    height: 30px;
    padding-left: 10px;
    padding-right: 20px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    color: $text_prim;

    &__input {
      width: 40px;
      text-align: center;
      outline: none;
      border: none;
      font-size: $text_xl;
      font-weight: 400;
      cursor: pointer;
      color: $text_prim;
      background: $back_prim;
    }
  }
}
</style>
