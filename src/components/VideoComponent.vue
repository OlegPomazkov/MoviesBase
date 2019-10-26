<template>
  <div class="video">
    <iframe 
      width="480" 
      height="360" 
      :src="`https://www.youtube.com/embed/${trailer.key}`" 
      frameborder="0" 
      allowfullscreen
    ></iframe>
    <div  
      class="video__control"
      @click="$emit('hideVideo')"
    >
      <svg class="video__control__icon" height="25" width="25" viewBox="0 0 24 24" aria-hidden="true" aria-label="" role="img">
        <path d="M15.18 12l7.16-7.16c.88-.88.88-2.3 0-3.18-.88-.88-2.3-.88-3.18 0L12 8.82 4.84 1.66c-.88-.88-2.3-.88-3.18 0-.88.88-.88 2.3 0 3.18L8.82 12l-7.16 7.16c-.88.88-.88 2.3 0 3.18.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66L12 15.18l7.16 7.16c.44.44 1.01.66 1.59.66.58 0 1.15-.22 1.59-.66.88-.88.88-2.3 0-3.18L15.18 12z"
        ></path>
      </svg>    
    </div>
  </div>
</template>

<script>
export default {
  props: {
    trailer: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";

.video {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background: $back_modal;
  z-index: 10;

  &__control {
    position: absolute;
    top: 20px;
    right: 20px;

    &__icon {
      fill: $white;
      opacity: 0.8;

      &:hover {
        cursor: pointer;
        opacity: 1;
      }
    }
  }
}
</style>
