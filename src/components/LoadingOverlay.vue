<template>
  <div class="loading-overlay">
    <div class="brand-rotate animate__animated animate__bounce animate__infinite">
      <BrandIcon fill="#364ff5" width="60" />
    </div>
  </div>
</template>

<style lang="scss">
.loading-overlay {
  position: fixed;
  display: flex;
  width: 120vw;
  height: 120vh;
  z-index: 99999;
  top: 50%;
  left: 50%;
  transform: translateY(-50%) translateX(-50%);
  background-color: $white;
  justify-content: center;
  align-items: center;
}
</style>
