<template>
  <div class="card" @click="$emit('cardClicked')">
    <img 
      class="card__image" 
      :src="`http://image.tmdb.org/t/p/w154/${cardData.poster_path}`"
    />

    <div class="card__info">
      <div class="card__info__title">
        {{cardData.title}}
      </div>

      <div class="card__info__overview">
        {{cardData.overview}}
      </div>
    </div>    
  </div>
</template>

<script>
export default {
  props: {
    cardData: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
.card {
  box-sizing: border-box;
  width: 100%;
  max-width: 400px;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: flex-start;

  &__image {
    width: 155px;
  }
  &__info {
    box-sizing: border-box;
    flex: 1;
    max-width: 240px;
  }
}
</style>
