<template>
  <div class="cards_list">
    <card-component
      class="list_list__item"
      v-for="(item, k) in listData"
      :key="item.id"
      :cardData="item"
    />
  </div>
</template>

<script>
import CardComponent from '@/components/CardComponent'

export default {
  components: {
    CardComponent
  },
  props: {
    listData: {
      type: Array,
      required: true,
      default: ()=>[]
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.cards_list {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  align-items: flex-start;
}
</style>
