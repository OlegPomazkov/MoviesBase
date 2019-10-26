<template>
  <div class="cards_list">
    <card-component
      class="list_list__item"
      v-for="(item, k) in listData"
      :key="item.id"
      :cardData="item"
      @cardClicked="handleCardClicked(k)"
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
  },
  methods: {
    async handleCardClicked(num) {
      await this.$store.dispatch('getFilmData', this.listData[num].id)
      this.$router.push({path:`/item/${this.listData[num].id}`})
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
