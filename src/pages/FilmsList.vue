<script setup>
    import {onMounted, ref, computed} from "vue";
    import {useRouter} from "vue-router";
    import {useFetch} from "@/composables/useFetch";
    import Pagination from "@/components/Pagination.vue";

    const router = useRouter();
    const {
        data: films,
        loading: filmsLoading,
        error: filmsError,
        fetchApi: fetchFilms,
    } = useFetch();

    const page = ref(1);
    const pageSize = 10;

    const totalPages = computed(() =>
        films.value ? Math.ceil(films.value.count / pageSize) : 0
    );

    const goToFilm = (url) => {
        let array = url.split("/");
        let id = array[array.length - 2];
        router.push(`/films/${id}`);
    };

    const loadPage = async (p) => {
        if (p < 1) return;
        if (totalPages.value && p > totalPages.value) return;

        page.value = p;
        await fetchFilms(`https://swapi.dev/api/films?page=${p}`);
        console.log(films.value);
    };

    onMounted(async () => {
        loadPage(page.value);
    });
</script>

<template>
    <div>
        <div class="container">
            <div v-if="filmsLoading">Loading...</div>
            <div v-else-if="filmsError">Error: {{ filmsError }}</div>
            <div v-else-if="films?.results">
                <table>
                    <thead>
                    <tr>
                        <th>Title</th>
                        <th>Director</th>
                        <th>Release Date</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr
                            v-for="film in films.results"
                            :key="film.url"
                            @click="goToFilm(film.url)"
                            class="cursor-pointer"
                    >
                        <td>{{ film.title }}</td>
                        <td>{{ film.director }}</td>
                        <td>{{ film.release_date }}</td>
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
