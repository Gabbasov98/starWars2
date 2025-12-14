<script setup>
    const { page, totalPages } = defineProps({
        page: Number,
        totalPages: Number
    });

    const emit = defineEmits(["goToPrevPage", "goToNextPage"]);

    const prev = () => {
        emit("goToPrevPage",page - 1);
    };

    const next = () => {
        emit("goToNextPage",page + 1);
    };
</script>

<template>
    <div class="pagination">
        <button
                @click="prev"
                class="pagination__item _btn"
                :class="{ _disabled: page === 1 }"
        >
            Prev
        </button>
        <span>Page {{ page }} of {{ totalPages }}</span>
        <button
                @click="next"
                class="pagination__item _btn"
                :class="{ _disabled: page === totalPages }"
        >
            Next
        </button>
    </div>
</template>

<style scoped lang="scss">

</style>
