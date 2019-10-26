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
      STOP
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
  background: pink;
  z-index: 10;

  &__control {
    width: 100px;
    height: 100px;
    background: white;
  }
}
</style>
