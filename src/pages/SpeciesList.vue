<script setup>
    import {onMounted, ref, computed} from "vue";
    import {useRouter} from "vue-router";
    import {useFetch} from "@/composables/useFetch";
    import Pagination from "@/components/Pagination.vue";

    const router = useRouter();
    const {
        data: species,
        loading: speciesLoading,
        error: speciesError,
        fetchApi: fetchSpecies,
    } = useFetch();

    const page = ref(1);
    const pageSize = 10;

    const totalPages = computed(() =>
        species.value ? Math.ceil(species.value.count / pageSize) : 0
    );

    const goToSpecie = (url) => {
        let array = url.split("/");
        let id = array[array.length - 2];
        router.push(`/species/${id}`);
    };

    const loadPage = async (p) => {
        if (p < 1) return;
        if (totalPages.value && p > totalPages.value) return;

        page.value = p;
        await fetchSpecies(`https://swapi.dev/api/species?page=${p}`);
        console.log(species.value);
    };

    onMounted(async () => {
        loadPage(page.value);
    });
</script>

<template>
    <div>
        <div class="container">
            <div v-if="speciesLoading">Loading...</div>
            <div v-else-if="speciesError">Error: {{ speciesError }}</div>
            <div v-else-if="species?.results">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Eye Colors</th>
                        <th>Hair Colors</th>
                        <th>Language</th>
                        <th>Skin Colors</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                            v-for="specie in species.results"
                            :key="specie.url"
                            @click="goToSpecie(specie.url)"
                            class="cursor-pointer"
                    >
                        <td>{{ specie.name }}</td>
                        <td>{{ specie.eye_colors }}</td>
                        <td>{{ specie.hair_colors }}</td>
                        <td>{{ specie.language }}</td>
                        <td>{{ specie.skin_colors }}</td>
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
