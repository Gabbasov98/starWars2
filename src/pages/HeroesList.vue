<script setup>
    import {onMounted, ref, computed} from "vue";
    import {useRouter} from "vue-router";
    import {useFetch} from "@/composables/useFetch";
    import Pagination from "@/components/Pagination.vue";

    const router = useRouter();
    const {
        data: heroes,
        loading: heroesLoading,
        error: heroesError,
        fetchApi: fetchHeroes,
    } = useFetch();

    const page = ref(1);
    const pageSize = 10;

    const totalPages = computed(() =>
        heroes.value ? Math.ceil(heroes.value.count / pageSize) : 0
    );

    const goToHero = (url) => {
        let array = url.split("/");
        let id = array[array.length - 2];
        router.push(`/heroes/${id}`);
    };

    const loadPage = async (p) => {
        if (p < 1) return;
        if (totalPages.value && p > totalPages.value) return;

        page.value = p;
        await fetchHeroes(`https://swapi.dev/api/people?page=${p}`);
        console.log(heroes.value);
    };

    onMounted(async () => {
        loadPage(page.value);
    });
</script>

<template>
    <div>
        <div class="container">
            <div v-if="heroesLoading">Loading...</div>
            <div v-else-if="heroesError">Error: {{ heroesError }}</div>
            <div v-else-if="heroes?.results">
                <table>
                    <thead>
                    <tr>
                        <th>Name</th>
                        <th>Birth Year</th>
                        <th>Gender</th>
                        <th>Height</th>
                        <th>Mass</th>
                        <th>Skin Color</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                            v-for="hero in heroes.results"
                            :key="hero.url"
                            @click="goToHero(hero.url)"
                            class="cursor-pointer"
                    >
                        <td>{{ hero.name }}</td>
                        <td>{{ hero.birth_year }}</td>
                        <td>{{ hero.gender }}</td>
                        <td>{{ hero.height }}</td>
                        <td>{{ hero.mass }}</td>
                        <td>{{ hero.skin_color }}</td>
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
