<template>
  <div class="infinite__nomore">
    <div class="infinite__nomore-wrap">
      <span class="message">All data has been successfully loaded!</span>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infinite__nomore {
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
      font-size: 16px;
    }
  }
}
</style>
