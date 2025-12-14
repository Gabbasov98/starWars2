import { createRouter, createWebHistory } from "vue-router";
import MainPage from "@/pages/MainPage.vue";
import HeroesList from "@/pages/HeroesList.vue";
import HeroesSingle from "@/pages/HeroesSingle.vue";
import FilmsList from "@/pages/FilmsList.vue";
import FilmsSingle from "@/pages/FilmsSingle.vue";
import StarshipsList from "@/pages/StarshipsList.vue";
import StarshipsSingle from "@/pages/StarshipsSingle.vue";
import VehiclesList from "@/pages/VehiclesList.vue";
import VehiclessSingle from "@/pages/VehiclessSingle.vue";
import SpeciesList from "@/pages/SpeciesList.vue";
import SpeciesSingle from "@/pages/SpeciesSingle.vue";
import PlanetsList from "@/pages/PlanetsList.vue";
import PlanetsSingle from "@/pages/PlanetsSingle.vue";

const routes = [
  { path: "/", component: MainPage },
  { path: "/heroes", component: HeroesList },
  { path: "/heroes/:id", component: HeroesSingle },
  { path: "/films", component: FilmsList },
  { path: "/films/:id", component: FilmsSingle },
  { path: "/starships", component: StarshipsList },
  { path: "/starships/:id", component: StarshipsSingle },
  { path: "/vehicles", component: VehiclesList },
  { path: "/vehicles/:id", component: VehiclessSingle },
  { path: "/species", component: SpeciesList },
  { path: "/species/:id", component: SpeciesSingle },
  { path: "/planets", component: PlanetsList },
  { path: "/planets/:id", component: PlanetsSingle },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
