<template>
  <div class="infinite__spinner">
    <div class="infinite__spinner-wrap">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid"
      >
        <circle cx="50" cy="50" r="40" stroke="#ccd5db" stroke-width="12" fill="none"></circle>
        <circle cx="50" cy="50" r="40" stroke="#677ae4" stroke-width="12" stroke-linecap="round" fill="none">
          <animateTransform
            attributeName="transform"
            type="rotate"
            repeatCount="indefinite"
            dur="1s"
            values="0 50 50;180 50 50;720 50 50"
            keyTimes="0;0.5;1"
          ></animateTransform>
          <animate
            attributeName="stroke-dasharray"
            repeatCount="indefinite"
            dur="1s"
            values="25.132741228718345 226.1946710584651;170.90264035528475 80.4247719318987;25.132741228718345 226.1946710584651"
            keyTimes="0;0.5;1"
          ></animate>
        </circle>
      </svg>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.infinite__spinner {
  display: flex;
  padding: $spacer/2 0;
  margin-bottom: $spacer/2;

  &-wrap {
    display: block;
    margin: auto;

    svg {
      width: 38px;
    }
  }
}
</style>
