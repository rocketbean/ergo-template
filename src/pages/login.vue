<template>
  <div class="row">
    <q-carousel
      v-model="slider"
      class="text-white"
      style= "width:100%;padding:80px 0px;"
      autoplay
      infinite
      animated
    >
      <q-carousel-slide :name = "1" class = "slide">
        <div class="row">
          <div class="col-xs-12 text-center">
          <small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat odio, congue <br>
            sit amet justo eu, dictum mollis lacus. Cras pulvinar consectetur metus, sit amet cursus sem.
          </small>
          </div>
        </div>
      </q-carousel-slide>
      <q-carousel-slide :name = "2" class = "slide">
        <div class="row">
          <div class="col-xs-12 text-center">
          <h1 class = "display-header"> 
            <q-icon name="fab fa-centercode" />
            <span>Ergo</span>
          </h1>
          <small>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque erat odio, congue <br>
            sit amet justo eu, dictum mollis lacus. Cras pulvinar consectetur metus, sit amet cursus sem.
          </small>
          </div>
        </div>
      </q-carousel-slide>
    </q-carousel>

    <div class="bg-white full-width" style = "min-height:670px" >
    <div class="container" style ="align-items:center;">
      <div class="card-span" style="display:flex;flex-direction:column;align-items:center">
        <q-icon name="fas fa-balance-scale" style = "font-size:89px;margin:30px"/><br>
        <small>
          Aenean purus lectus, pellentesque ut viverra sed, lobortis eget nunc. Nunc at aliquam nunc. Fusce pellentesque tristique venenatis. Vestibulum auctor nec felis eu rutrum. Sed sit amet facilisis nibh, et cursus augue. Morbi euismod libero id metus viverra, at interdum purus convallis. 
        </small>
      </div>
      <div class="card-span " style="display:flex;flex-direction:column;align-items:center">
        <q-icon name="fas fa-archway" style = "font-size:89px;margin:30px"/><br>
        <small>
          ed varius tellus faucibus non. Donec id luctus est. Etiam scelerisque eros ac pretium ultricies. Phasellus vel tempor mi. Aliquam et tortor eget
          Vestibulum tincidunt massa sed mattis viverra. Quisque ultricies consequat accumsan.
        </small>
      </div>
      <div class="card-span" style="display:flex;flex-direction:column;align-items:center">
        <q-icon name="fas fa-archive" style = "font-size:89px;margin:30px"/><br>
        <small class = "self-end">
          maximus odio. Sed tincidunt sollicitudin purus ut porta. Praesent vestibulum rutrum arcu, ut mollis velit dapibus aliquam. 
          ed varius tellus faucibus non. Donec id luctus est. Etiam scelerisque eros ac pretium ultricies. Phasellus vel tempor mi. Aliquam et tortor eget
        </small>
      </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'login',
  data () {
    return {
      slider: 1,
      slide2: 1
    }
  }
}
</script>