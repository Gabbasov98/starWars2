<script setup>
import { useRoute, useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { useFetch } from "@/composables/useFetch";
import { goToSingle } from "@/utils/routerUtils";

const route = useRoute();
const router = useRouter();
const {
  data: hero,
  loading: heroLoading,
  error: heroError,
  fetchApi: fetchHero,
} = useFetch();

const {
  data: film,
  loading: filmLoading,
  error: filmError,
  fetchApi: fetchFilm,
} = useFetch();

const {
  data: vehicle,
  loading: vehicleLoading,
  error: vehicleError,
  fetchApi: fetchVehicle,
} = useFetch();

const films = ref([]);
const heroes = ref([]);

const getHero = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchHero(`https://swapi.dev/api/people/${id}/`);
  heroes.value.push(hero.value);
}

const getFilm = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchFilm(`https://swapi.dev/api/films/${id}/`);
  films.value.push(film.value);
}

onMounted(async () => {
  const id = route.params.id;
  await fetchVehicle(`https://swapi.dev/api/vehicles/${id}/`);
  vehicle.value.films.forEach(film => {
    getFilm(film)
  })
  vehicle.value.pilots.forEach(character => {
    getHero(character)
  })
});

</script>

<template>
  <div class="container">
    <div v-if="vehicleLoading">Loading...</div>
    <div v-else-if="vehicleError">Error: {{ starShipError }}</div>
    <div v-else-if="vehicle">
      <div class="h1">
        General info
      </div>
      <div class="props _mt24">
        <div class="props__item">
          <span>Name:</span>
          {{ vehicle.name }}
        </div>
        <div class="props__item">
          <span>Cargo Capacity:</span>
          {{ vehicle.cargo_capacity }}
        </div>
        <div class="props__item">
          <span>Consumables:</span>
          {{ vehicle.consumables }}
        </div>
        <div class="props__item">
          <span>Cost in credits:</span>
          {{ vehicle.cost_in_credits }}
        </div>
        <div class="props__item">
          <span>Crew:</span>
          {{ vehicle.crew }}
        </div>
        <div class="props__item">
          <span>Length:</span>
          {{ vehicle.length }}
        </div>
        <div class="props__item">
          <span>Manufacturer:</span>
          {{ vehicle.manufacturer }}
        </div>
        <div class="props__item">
          <span>Max atmosphering speed:</span>
          {{ vehicle.max_atmosphering_speed }}
        </div>
        <div class="props__item">
          <span>Model:</span>
          {{ vehicle.model }}
        </div>
        <div class="props__item">
          <span>passengers:</span>
          {{ vehicle.passengers }}
        </div>
        <div class="props__item">
          <span>Class:</span>
          {{ vehicle.vehicle_class }}
        </div>
      </div>

      <div v-if="films.length !== 0" class="films _mt40">
        <div class="h1">
          Films
        </div>
        <div class="_gap16 _mt24">
          <div class="cursor-pointer"
               v-for="film in films"
               :key="film.url"
               @click="goToSingle(film.url,'films',router)"
          >
            {{ film.title }}
          </div>
        </div>
      </div>

      <div v-if="heroes.length !== 0" class="films _mt40">
        <div class="h1">
          Pilots
        </div>
        <div class="_gap16 _mt24">
          <div class="cursor-pointer"
               v-for="hero in heroes"
               :key="hero.url"
               @click="goToSingle(hero.url,'heroes',router)"
          >
            {{ hero.name }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.props {
  @include grid100gap(1em);
  &__item {
    font-size: 1em;
    line-height: 150%;
    span {
      font-weight: 700;
    }
  }
}
</style>
