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
  data: planet,
  loading: planetLoading,
  error: planetError,
  fetchApi: fetchPlanet,
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
  await fetchPlanet(`https://swapi.dev/api/planets/${id}/`);
  planet.value.films.forEach(film => {
    getFilm(film)
  })
  planet.value.residents.forEach(character => {
    getHero(character)
  })
});

</script>

<template>
  <div class="container">
    <div v-if="planetLoading">Loading...</div>
    <div v-else-if="planetError">Error: {{ specieError }}</div>
    <div v-else-if="planet">
      <div class="h1">
        General info
      </div>
      <div class="props _mt24">
        <div class="props__item">
          <span>Name:</span>
          {{ planet.name }}
        </div>
        <div class="props__item">
          <span>Climate:</span>
          {{ planet.climate }}
        </div>
        <div class="props__item">
          <span>Diameter:</span>
          {{ planet.diameter }}
        </div>
        <div class="props__item">
          <span>Gravity:</span>
          {{ planet.gravity }}
        </div>
        <div class="props__item">
          <span>Orbital period:</span>
          {{ planet.orbital_period }}
        </div>
        <div class="props__item">
          <span>Population:</span>
          {{ planet.population }}
        </div>
        <div class="props__item">
          <span>Rotation period:</span>
          {{ planet.rotation_period }}
        </div>
        <div class="props__item">
          <span>Surface water:</span>
          {{ planet.surface_water }}
        </div>
        <div class="props__item">
          <span>Terrain:</span>
          {{ planet.terrain }}
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
