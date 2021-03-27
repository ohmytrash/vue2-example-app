<template>
  <div class="container">
    <header class="text-center py-5">
      <brand-icon width="60" fill="#364ff5" />
    </header>
    <div class="row">
      <div class="col-lg-5 col-md-8 mx-auto">
        <div class="card card-body border-0">
          <h2 class="text-center mb-3">{{ $route.name.toUpperCase() }}</h2>
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
