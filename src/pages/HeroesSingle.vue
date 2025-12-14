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
  data: starShip,
  loading: starShipLoading,
  error: starShipError,
  fetchApi: fetchStarShip,
} = useFetch();

const {
  data: vehicle,
  loading: vehicleLoading,
  error: vehicleError,
  fetchApi: fetchVehicle,
} = useFetch();

const {
  data: specie,
  loading: specieLoading,
  error: specieError,
  fetchApi: fetchSpecie,
} = useFetch();

const {
  data: planet,
  loading: planetLoading,
  error: planetError,
  fetchApi: fetchPlanet,
} = useFetch();

const films = ref([]);
const starShips = ref([]);
const vehicles = ref([]);
const species = ref([]);

const getFilm = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchFilm(`https://swapi.dev/api/films/${id}/`);
  films.value.push(film.value);
}

const getStarShip = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchStarShip(`https://swapi.dev/api/starships/${id}/`);
  starShips.value.push(starShip.value);
}

const getVehicle = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchVehicle(`https://swapi.dev/api/vehicles/${id}/`);
  vehicles.value.push(vehicle.value);
}

const getSpecie = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchSpecie(`https://swapi.dev/api/species/${id}/`);
  species.value.push(specie.value);
}

const getPlanet = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchPlanet(`https://swapi.dev/api/planets/${id}/`);
}

onMounted(async () => {
  const id = route.params.id;
  await fetchHero(`https://swapi.dev/api/people/${id}/`);
  console.log(hero.value);
  hero.value.films.forEach(film => {
    getFilm(film)
  })
  hero.value.starships.forEach(starship => {
    getStarShip(starship)
  })
  hero.value.vehicles.forEach(vehicle => {
    getVehicle(vehicle)
  })
  hero.value.species.forEach(specie => {
    getSpecie(specie)
  })
  getPlanet(hero.value.homeworld)
});

</script>

<template>
  <div class="container">
    <div v-if="heroLoading">Загрузка...</div>
    <div v-else-if="heroError">Ошибка: {{ heroesError }}</div>
    <div v-else-if="hero">
      <div class="h1">
        General info
      </div>
      <div class="props _mt24">
        <div class="props__item">
          <span>Birth Year:</span>
          {{ hero.birth_year }}
        </div>
        <div class="props__item">
          <span>Name:</span>
          {{ hero.name }}
        </div>
        <div class="props__item">
          <span>Eye Color:</span>
          {{ hero.eye_color }}
        </div>
        <div class="props__item">
          <span>Gender:</span>
          {{ hero.gender }}
        </div>
        <div class="props__item">
          <span>Hair Color:</span>
          {{ hero.hair_color }}
        </div>
        <div class="props__item">
          <span>Mass:</span>
          {{ hero.mass }}
        </div>
        <div class="props__item">
          <span>Skin Color:</span>
          {{ hero.skin_color }}
        </div>
        <div v-if="planet" class="props__item">
          <span>Homeworld:</span>
          <button
                  class="underline-text"
                  @click="goToSingle(planet.url,'planets',router)"
          >
            {{ planet.name }}
          </button>
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

      <div v-if="starShips.length !== 0" class="films _mt40">
        <div class="h1">
          Starships
        </div>
        <div class="_gap16 _mt24">
          <div class="cursor-pointer"
               v-for="starShip in starShips"
               :key="starShip.url"
               @click="goToSingle(starShip.url,'starships',router)"
          >
            {{ starShip.name }}
          </div>
        </div>
      </div>

      <div v-if="vehicles.length !== 0" class="films _mt40">
        <div class="h1">
          Vehicles
        </div>
        <div class="_gap16 _mt24">
          <div class="cursor-pointer"
               v-for="vehicle in vehicles"
               :key="vehicle.url"
               @click="goToSingle(vehicle.url,'vehicles',router)"
          >
            {{ vehicle.name }}
          </div>
        </div>
      </div>

      <div v-if="species.length !== 0" class="films _mt40">
        <div class="h1">
          Species
        </div>
        <div class="_gap16 _mt24">
          <div class="cursor-pointer"
               v-for="specie in species"
               :key="specie.url"
               @click="goToSingle(specie.url,'species',router)"
          >
            {{ specie.name }}
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
    span {
      font-weight: 700;
    }
  }
}
</style>
