<template>
  <div class="footer">
    <div class="footer__item contacts">
      Contacts information
    </div>

    <div class="footer__item copyright">
      Copyright information
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped lang="scss">
@import "@/assets/styles/variables.scss";

.footer {
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

  &__item {
    font-size: $text;
    color: $white;
  }
}
</style>
