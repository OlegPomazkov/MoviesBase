<template>
  <router-link class="card" :to="`/item/${cardData.id}`">
    <img 
      v-if="cardData.poster_path"
      class="card__image" 
      :src="`http://image.tmdb.org/t/p/w154/${cardData.poster_path}`"
    />
    <div
      v-else
      class="card__image holder"
    >
      NO POSTER
    </div>

    <div class="card__info">
      <div class="card__info__title">
        {{cardData.title}}
        <span 
          v-if="releaseYear" 
          class="year"
        >
          {{` (${releaseYear})`}}
        </span>
      </div>

      <div class="card__info__overview">
        {{cardData.overview}}
      </div>
    </div>    
  </router-link>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true
    }
  },
  computed: {
    releaseYear() {
      return this.cardData.release_date? this.cardData.release_date.split('-')[0]:''
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.card {
  text-decoration: none;
  box-sizing: border-box;
  width: 350px;
  height: 250px;
  overflow: auto;
  margin: 5px;
  padding: 5px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;
  background: $white;
  cursor: pointer;

  &__image {
    width: 155px;

    &.holder {
      min-width: 155px;
      margin-top: 40px;
      display: flex;
      justify-content: center;
      align-items: center;
    }    
  }
  &__info {
    box-sizing: border-box;
    padding-left: 5px;
    flex: 1;
    max-width: 230px;

    &__title {
      padding-bottom: 5px;
      font-size: $title_s;
      font-weight: bold;
      color: $text_prim;

      & .year {
        font-weight: normal;
      }
    }

    &__overview {
      font-size: $text_s;
      color: $text_prim;      
    }
  }
}
</style>
