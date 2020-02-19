<template lang="pug">
    header.header(v-if='data')
        .header__wrap
            .header__logo
                svg(xmlns="http://www.w3.org/2000/svg" width="48.2" height="44.6" viewbox="0 0 48.2 44.6")
                    path(d="M0 44.6V0h9v44.6H0z" fill="#fff")
                    path(d="M17.6 44.6V0h30.6v7.5H26.6v10.6h18.6v7.5H26.6v19h-9z" fill="#00bfd6")
            ul.header__nav
                li.header__item(v-for='(item, index) in data')
                    button(@click='scrollTo(item.link)', v-html='item.name')


        //- UNCOMMENT TO ENABLE i18n p(v-t='"hello"')
        //- UNCOMMENT TO ENABLE i18n p {{$t('message')}}
</template>

<script>
import data from '../assets/data/data.json';
export default {
    name: 'Header',

    data() {
        return {
            data: data.header
        };
    },

    methods: {
        scrollTo(el) {
            window.scrollTo({
                top: document.querySelector(el).offsetTop - document.querySelector('.header').clientHeight,
                behavior: 'smooth'
            });
        }
    }
};
</script>

<i18n>
{
    "ru": {
        "hello": "Привет из компонента"
    },
    "en": {
        "hello": "Hello from component"
    }
}
</i18n>

<style lang="scss" scoped>
@import '../assets/css/vars.scss';

.header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    min-height: 50px;
    border-bottom: 1px solid var(--color-main-bg);
    z-index: 10;
    transition: background 0.3s ease;

    @media (--viewport-tablet) {
        font-size: 0.75em;
    }

    &__wrap {
        max-width: var(--max-width);
        height: 6.8em;
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin: 0 auto;
        padding: 1em 3em;

        @media (--viewport-tablet) {
            padding: 1em;
        }
    }

    &__nav {
        display: flex;
        height: 100%;
    }

    &__item {
        position: relative;
        height: 100%;
        padding: 0 1em;
        display: flex;
        align-items: center;

        @media (--viewport-tablet) {
            padding: 0 0.8em;
        }

        button {
            height: 100%;
            color: var(--color-accent-text);
            text-transform: uppercase;
            font-weight: 700;
        }

        &:before {
            content: '';
            position: absolute;
            top: 2.3em;
            left: -0.3em;
            display: block;
            width: 1em;
            height: 2px;
            background-color: var(--color-theme);
            opacity: 0;
            transition: opacity 0.3s ease;
        }

        &:hover {
            &:before {
                opacity: 1;
            }
        }
    }

    [data-state='scrolling'] & {
        background-color: var(--color-main-bg);
        border-color: var(--color-main-text);

        button {
            color: var(--color-main-text);
        }

        svg {
            path:first-child {
                fill: var(--color-main-text);
            }
        }
    }

    &__logo {
        @media (--viewport-tablet) {
            display: none;
        }
    }
}
</style>
