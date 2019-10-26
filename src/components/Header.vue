<template>
  <div class="header">
    <div class="header__logo">
      MOVIES
    </div>

    <div class="header__links">
      <div
        class="header__links__item"
        v-for="(item, k) in categories"
        :key="`header_link_${item.name}`"
        @click="handleLinkClicked(k)"
      >
        {{ item.label }}
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"

export default {
  computed: {
    ...mapGetters({
      categories: "categories"
    })
  },
  methods: {
    async handleLinkClicked(num) {
      try {
        await this.$store.dispatch('getViewData', {
          list: this.categories[num].name,
          page: 1
        })
        this.$router.push({name: 'list'})
      } catch(err) { }
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.header {
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  z-index: 10001;
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
    justify-content: flex-end;
    align-items: center;

    &__item {
      box-sizing: border-box;
      padding-left: 7px;
      padding-right: 7px;
      cursor: pointer;

      &:hover {
        opacity: 0.5;
      }
    }
  }
}
</style>
