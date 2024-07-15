<template>
  <!--主導覽列-->
  <Navbar></Navbar>
  <!--主導覽列-->
  <!-- carousel start -->
  <div id="carouselExampleIndicators" class="carousel slide mb-5" data-bs-ride="carousel">
    <div class="carousel-indicators">
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="0"
        class="active"
        aria-current="true"
        aria-label="Slide 1"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="1"
        aria-label="Slide 2"
      ></button>
      <button
        type="button"
        data-bs-target="#carouselExampleIndicators"
        data-bs-slide-to="2"
        aria-label="Slide 3"
      ></button>
    </div>
    <div class="carousel-inner">
      <div class="carousel-item active">
        <img src="https://placehold.co/1920x650" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="https://placehold.co/1920x650" class="d-block w-100" alt="..." />
      </div>
      <div class="carousel-item">
        <img src="https://placehold.co/1920x650" class="d-block w-100" alt="..." />
      </div>
    </div>
    <button
      class="carousel-control-prev"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="prev"
    >
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button
      class="carousel-control-next"
      type="button"
      data-bs-target="#carouselExampleIndicators"
      data-bs-slide="next"
    >
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  </div>
  <!-- carousel end -->

  <!-- content start -->
  <div class="container mb-5">
    <div class="row">
      <div class="col-12 col-md-3">
        <div class="bg-primary text-white p-3 mb-2">
          <p>1</p>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="bg-secondary text-white p-3 mb-2">
          <p>2</p>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="bg-success text-white p-3 mb-2">
          <p>3</p>
        </div>
      </div>
      <div class="col-12 col-md-3">
        <div class="bg-danger text-white p-3 mb-2">
          <p>4</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container mb-5">
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="bg-primary text-white p-3 mb-2">
          <p>1</p>
        </div>
      </div>
      <div class="col-12 col-md-6">
        <div class="bg-secondary text-white p-3 mb-2">
          <p>2</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container mb-5">
    <div class="row">
      <div class="col-4 col-md-2">
        <div class="bg-primary text-white p-3 mb-2">
          <p>1</p>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="bg-secondary text-white p-3 mb-2">
          <p>2</p>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="bg-success text-white p-3 mb-2">
          <p>3</p>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="bg-danger text-white p-3 mb-2">
          <p>4</p>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="bg-warning text-dark p-3 mb-2">
          <p>5</p>
        </div>
      </div>
      <div class="col-4 col-md-2">
        <div class="bg-dark text-white p-3 mb-2">
          <p>6</p>
        </div>
      </div>
    </div>
  </div>

  <div class="container mb-5">
    <!-- 一列五欄 -->
    <div class="row row-md-cols-5">
      <div class="col-12 col">
        <div class="bg-primary text-white p-3 mb-2">
          <p>1</p>
        </div>
      </div>
      <div class="col-12 col">
        <div class="bg-secondary text-white p-3 mb-2">
          <p>2</p>
        </div>
      </div>
      <div class="col-12 col">
        <div class="bg-success text-white p-3 mb-2">
          <p>3</p>
        </div>
      </div>
      <div class="col-12 col">
        <div class="bg-danger text-white p-3 mb-2">
          <p>4</p>
        </div>
      </div>
      <div class="col-12 col">
        <div class="bg-warning text-dark p-3 mb-2">
          <p>5</p>
        </div>
      </div>
    </div>
  </div>
  <div class="container">
    <!-- 一列二欄 -->
    <div class="row">
      <div class="col-12 col-md-6">
        <div class="bg-info text-white p-3">
          <p>1</p>
        </div>
      </div>
      <div class="col-12 col-md-6 text-white">
        <div class="bg-primary p-3 mb-3">1</div>
        <div class="row">
          <div class="col-4 mb-3">
            <div class="bg-primary p-3">2</div>
          </div>
          <div class="col-4 mb-3">
            <div class="bg-primary p-3">3</div>
          </div>
          <div class="col-4 mb-3">
            <div class="bg-primary p-3">4</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- content end -->

  <!--footer區域-->
  <end></end>
  <!--footer區域-->
</template>

<script setup>
import axios from 'axios'
import { onMounted } from 'vue'
import Navbar from '@/components/bugershop/Navbar.vue'
import end from '@/components/bugershop/end.vue'

async function getWeatherForecast() {
  await axios
    .get('https://localhost:7143/WeatherForecast')
    .then(function (response) {
      // handle success
      console.log(response.data)
    })
    .catch(function (error) {
      // handle error
      console.log(error)
    })
}
onMounted(() => {
  getWeatherForecast()
})

// Make a request for a user with a given ID
</script>

<style scoped></style>
