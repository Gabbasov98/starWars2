<script setup>
    import {onMounted, ref, computed} from "vue";
    import {useRouter} from "vue-router";
    import {useFetch} from "@/composables/useFetch";
    import Pagination from "@/components/Pagination.vue";

    const router = useRouter();
    const {
        data: starships,
        loading: starshipsLoading,
        error: starshipsError,
        fetchApi: fetchStarships,
    } = useFetch();

    const page = ref(1);
    const pageSize = 10;

    const totalPages = computed(() =>
        starships.value ? Math.ceil(starships.value.count / pageSize) : 0
    );

    const goToStarships = (url) => {
        let array = url.split("/");
        let id = array[array.length - 2];
        router.push(`/starships/${id}`);
    };

    const loadPage = async (p) => {
        if (p < 1) return;
        if (totalPages.value && p > totalPages.value) return;

        page.value = p;
        await fetchStarships(`https://swapi.dev/api/starships?page=${p}`);
        console.log(starships.value);
    };

    onMounted(async () => {
        loadPage(page.value);
    });
</script>

<template>
    <div>
        <div class="container">
            <div v-if="starshipsLoading">Loading...</div>
            <div v-else-if="starshipsError">Error: {{ starshipsError }}</div>
            <div v-else-if="starships?.results">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Passengers</th>
                        <th>Class</th>
                        <th>Cargo Capacity</th>
                        <th>Crew</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                            v-for="starship in starships.results"
                            :key="starship.url"
                            @click="goToStarships(starship.url)"
                            class="cursor-pointer"
                    >
                        <td>{{ starship.name }}</td>
                        <td>{{ starship.passengers }}</td>
                        <td>{{ starship.starship_class }}</td>
                        <td>{{ starship.cargo_capacity }}</td>
                        <td>{{ starship.crew }}</td>
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
