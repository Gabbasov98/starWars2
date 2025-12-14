<script setup>
    import {onMounted, ref, computed} from "vue";
    import {useRouter} from "vue-router";
    import {useFetch} from "@/composables/useFetch";
    import Pagination from "@/components/Pagination.vue";

    const router = useRouter();
    const {
        data: planets,
        loading: planetsLoading,
        error: planetsError,
        fetchApi: fetchPlanets,
    } = useFetch();

    const page = ref(1);
    const pageSize = 10;

    const totalPages = computed(() =>
        planets.value ? Math.ceil(planets.value.count / pageSize) : 0
    );

    const goToPlanet = (url) => {
        let array = url.split("/");
        let id = array[array.length - 2];
        router.push(`/planets/${id}`);
    };

    const loadPage = async (p) => {
        if (p < 1) return;
        if (totalPages.value && p > totalPages.value) return;

        page.value = p;
        await fetchPlanets(`https://swapi.dev/api/planets?page=${p}`);
        console.log(planets.value);
    };

    onMounted(async () => {
        loadPage(page.value);
    });

    const formattedNumber = (value) => {
        if (value === "unknown") {
            return value
        }

        return Number(value).toLocaleString("en-US")
    }
</script>

<template>
    <div>
        <div class="container">
            <div v-if="planetsLoading">Loading...</div>
            <div v-else-if="planetsError">Error: {{ planetsError }}</div>
            <div v-else-if="planets?.results">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Climate</th>
                        <th>Diameter</th>
                        <th>Population</th>
                        <th>Terrain</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                            v-for="planet in planets.results"
                            :key="planet.url"
                            @click="goToPlanet(planet.url)"
                            class="cursor-pointer"
                    >
                        <td>{{ planet.name }}</td>
                        <td>{{ planet.climate }}</td>
                        <td>{{ formattedNumber(planet.diameter) }}</td>
                        <td>{{ formattedNumber(planet.population) }}</td>
                        <td>{{ planet.terrain }}</td>
                    </tr>
                    </tbody>
                </table>
            </div>

            <Pagination
                    v-if="totalPages > 1"
                    :page="page"
                    :totalPages="totalPages"
                    @goToPrevPage="loadPage"
                    @goToNextPage="loadPage"
            />
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>
