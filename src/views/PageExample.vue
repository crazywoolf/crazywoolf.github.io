<template lang="pug">
    .pageexample
        h1.title(v-html='title')
</template>

<script>
export default {
    name: 'PageExample',

    metaInfo: {
        title: 'Example'
    },

    data() {
        return {
            title: 'Example&nbsp;Title'
        };
    }
};
</script>

<style lang="scss">
@import '../assets/css/vars.scss';

.pageexample {
    --test: 1.5vh;
    margin: 0;
    padding: calc(1vw + 3vw) calc(var(--test) * 2);
    background: var(--color-main-text);

    @media (--viewport-tablet) {
        --test: 1vh;
        background: var(--color-main-bg);
        font-family: var(--font-main);
    }
}
</style>
