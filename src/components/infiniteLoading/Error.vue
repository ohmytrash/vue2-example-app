<template>
  <div class="infinite__error">
    <div class="infinite__error-wrap">
      <span class="message">Someting went wrong!</span>
      <button class="btn btn-outline-secondary btn-sm" @click="$attrs.trigger">Try again</button>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infinite__error {
  display: flex;
  padding: $spacer/2 0;
  margin-bottom: $spacer/2;

  &-wrap {
    display: block;
    margin: auto;
    text-align: center;
    width: 100%;

    .message {
      display: block;
      margin-bottom: 5px;
      font-size: 16px;
    }
  }
}
</style>
