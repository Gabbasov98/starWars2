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

const films = ref([]);
const heroes = ref([]);
const starShips = ref([]);
const vehicles = ref([]);
const species = ref([]);

const getHero = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchHero(`https://swapi.dev/api/people/${id}/`);
  heroes.value.push(hero.value);
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

onMounted(async () => {
  const id = route.params.id;
  await fetchFilm(`https://swapi.dev/api/films/${id}/`);
  console.log(film.value);
  film.value.characters.forEach(character => {
    getHero(character)
  })
  film.value.starships.forEach(starship => {
    getStarShip(starship)
  })
  film.value.vehicles.forEach(vehicle => {
    getVehicle(vehicle)
  })
  film.value.species.forEach(specie => {
    getSpecie(specie)
  })
});

</script>

<template>
  <div class="container">
    <div v-if="filmLoading">Loading...</div>
    <div v-else-if="filmError">Error: {{ filmError }}</div>
    <div v-else-if="film">
      <div class="h1">
        General info
      </div>
      <div class="props _mt24">
        <div class="props__item">
          <span>Title:</span>
          {{ film.title }}
        </div>
        <div class="props__item">
          <span>Director:</span>
          {{ film.director }}
        </div>
        <div class="props__item">
          <span>Opening Crawl:</span> <br>
          {{ film.opening_crawl }}
        </div>
        <div class="props__item">
          <span>Producer:</span>
          {{ film.producer }}
        </div>
        <div class="props__item">
          <span>Release date:</span>
          {{ film.release_date }}
        </div>
      </div>

      <div v-if="heroes.length !== 0" class="films _mt40">
        <div class="h1">
          Heroes
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
    font-size: 1em;
    line-height: 150%;
    span {
      font-weight: 700;
    }
  }
}
</style>
