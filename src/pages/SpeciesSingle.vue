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

const getPlanet = async (url) => {
  let array = url.split("/");
  let id = array[array.length - 2];
  await fetchPlanet(`https://swapi.dev/api/planets/${id}/`);
}


onMounted(async () => {
  const id = route.params.id;
  await fetchSpecie(`https://swapi.dev/api/species/${id}/`);
  specie.value.films.forEach(film => {
    getFilm(film)
  })
  specie.value.people.forEach(character => {
    getHero(character)
  })
  getPlanet(specie.value.homeworld)
});

</script>

<template>
  <div class="container">
    <div v-if="specieLoading">Loading...</div>
    <div v-else-if="specieError">Error: {{ specieError }}</div>
    <div v-else-if="specie">
      <div class="h1">
        General info
      </div>
      <div class="props _mt24">
        <div class="props__item">
          <span>Name:</span>
          {{ specie.name }}
        </div>
        <div class="props__item">
          <span>Average height:</span>
          {{ specie.average_height }}
        </div>
        <div class="props__item">
          <span>Average lifespan:</span>
          {{ specie.average_lifespan }}
        </div>
        <div class="props__item">
          <span>Classification:</span>
          {{ specie.classification }}
        </div>
        <div class="props__item">
          <span>Designation:</span>
          {{ specie.designation }}
        </div>
        <div class="props__item">
          <span>Eye colors:</span>
          {{ specie.eye_colors }}
        </div>
        <div class="props__item">
          <span>Hair colors:</span>
          {{ specie.hair_colors }}
        </div>
        <div class="props__item">
          <span>Language:</span>
          {{ specie.language }}
        </div>
        <div class="props__item">
          <span>Skin colors:</span>
          {{ specie.skin_colors }}
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
