<template>
  <div class="loading-wrap">
    <div class="brand-rotate animate__animated animate__bounce animate__infinite text-primary">
      <BrandIcon width="60" />
    </div>
  </div>
</template>

<style lang="scss">
.loading-wrap {
  position: fixed;
  display: flex;
  width: 120vw;
  height: 120vh;
  z-index: 999;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: $light;
  justify-content: center;
  align-items: center;
}
</style>
