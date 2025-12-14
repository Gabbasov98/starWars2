<script setup>
</script>

<template>
    <div class="header">
        <div class="container">
            <div class="header__inner _flex-between">
                <RouterLink to="/" class="header__logo">Star Wars</RouterLink>
                <div class="nav">
                    <RouterLink to="/heroes" class="nav__link">Heroes</RouterLink>
                    <RouterLink to="/films" class="nav__link">Films</RouterLink>
                    <RouterLink to="/starships" class="nav__link">Starships</RouterLink>
                    <RouterLink to="/vehicles" class="nav__link">Vehicles</RouterLink>
                    <RouterLink to="/species" class="nav__link">Species</RouterLink>
                    <RouterLink to="/planets" class="nav__link">Planets</RouterLink>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss">
.header{
    padding: 1.25em 0;
    background-color: #141414;
    color: #fff;
    margin-bottom: 2em;
}
    .header__logo{
        font-weight: 700;
        text-transform: uppercase;
        font-size: 3em;
    }
    .nav{
        display: flex;
        align-items: center;
        gap: 2em;
        &__link{
            font-size: 1.5em;
            line-height: 120%;
            font-weight: 500;
        }
    }
</style>
