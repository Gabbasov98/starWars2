<script setup>
    import {onMounted, ref, computed} from "vue";
    import {useRouter} from "vue-router";
    import {useFetch} from "@/composables/useFetch";
    import Pagination from "@/components/Pagination.vue";

    const router = useRouter();
    const {
        data: vehicles,
        loading: vehiclesLoading,
        error: vehiclesError,
        fetchApi: fetchVehicles,
    } = useFetch();

    const page = ref(1);
    const pageSize = 10;

    const totalPages = computed(() =>
        vehicles.value ? Math.ceil(vehicles.value.count / pageSize) : 0
    );

    const goToVehicle = (url) => {
        let array = url.split("/");
        let id = array[array.length - 2];
        router.push(`/vehicles/${id}`);
    };

    const loadPage = async (p) => {
        if (p < 1) return;
        if (totalPages.value && p > totalPages.value) return;

        page.value = p;
        await fetchVehicles(`https://swapi.dev/api/vehicles?page=${p}`);
        console.log(vehicles.value);
    };

    onMounted(async () => {
        loadPage(page.value);
    });
</script>

<template>
    <div>
        <div class="container">
            <div v-if="vehiclesLoading">Loading...</div>
            <div v-else-if="vehiclesError">Error: {{ vehiclesError }}</div>
            <div v-else-if="vehicles?.results">
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
                            v-for="vehicle in vehicles.results"
                            :key="vehicle.url"
                            @click="goToVehicle(vehicle.url)"
                            class="cursor-pointer"
                    >
                        <td>{{ vehicle.name }}</td>
                        <td>{{ vehicle.passengers }}</td>
                        <td>{{ vehicle.vehicle_class }}</td>
                        <td>{{ vehicle.cargo_capacity }}</td>
                        <td>{{ vehicle.crew }}</td>
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
