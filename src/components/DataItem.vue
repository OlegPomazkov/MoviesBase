<template>
  <div class="item">
    <div class="item__title">
      {{ `${item.title}: ` }}
    </div>

    <div class="item__value">
      {{ item.value }}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.item {
  box-sizing: border-box;
  padding-right: 7px;
  display: flex;
  flex-direction: row;
  justify-content: flx-start;
  align-items: center;

  &__title {
    font-size: $text;
    font-weight: 600;
    color: $text_sec;
    padding-right: 5px;   
  }

  &__value {
    font-size: $text;
    font-weight: normal;
    color: $text_prim;   
  }
}
</style>