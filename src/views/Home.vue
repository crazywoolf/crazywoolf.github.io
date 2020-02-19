<template lang="pug">
    article.home

        section#preview.home__section.home__section--preview
            .home__wrap.home__wrap--preview
                .home__bg
                h1.home__title(v-html='data.preview.name')
                .home__subtitle(v-html='data.preview.position')
                .home__link-list
                    a.home__link(:href='link.link', v-for='link in data.preview.links', target='_blank')
                        span(v-html='link.icon')

        section#about.home__section.home__section--about
            .home__wrap
                .home__title-box
                    .h2(v-html='data.about.title')
                    .motto(v-html='data.about.motto')
                .home__content
                    .text.text--show(v-html='data.about.text.join("")', v-observe-visibility='visibilityChanged')
                    .home__list.home__list--column
                        .home__item(v-for='item in data.about.skills')
                            .text.text--bold(v-html='item.name')
                            .text(v-html='item.percent + "%"')
                            .home__progress-line(v-observe-visibility='visibilityChanged')
                                span
                                span(:style='{width: item.percent + "%"}')

        section#education.home__section.home__section--education
            .home__wrap
                .home__title-box
                    .h2(v-html='data.education.title')
                    .motto(v-html='data.education.motto')
                .home__content
                    .home__cards
                        a.home__card(v-for='item in data.education.list', :href='item.link', target='_blank', v-observe-visibility='visibilityChanged')
                            .card__icon(v-html='item.icon')
                            .h3(v-html='item.name')
                            .text(v-html='item.description')

        section#experience.home__section.home__section--experience
            .home__wrap
                .home__title-box
                    .h2(v-html='data.experience.title')
                    .motto(v-html='data.experience.motto')
                .home__content
                    .home__history
                        .history__point(v-for='item in data.experience.list')
                            .text(v-html='item.date', v-observe-visibility='visibilityChanged')
                            .h3(v-html='item.name', v-observe-visibility='visibilityChanged')
                            .text(v-html='item.description', v-observe-visibility='visibilityChanged')

        section.home__section.home__section--slider.swiper-container
            .swiper-wrapper
                .swiper-slide(v-for='item in data.portfolio')
                    .slide__bg
                        img(:src='item.img', :alt='item.name')
                    .slide__wrap
                        a.slide__group(:href='item.link', target='_blank')
                            .h2.h2--uppercase.h2--accent(v-html='item.name')
                            .text.text--accent(v-html='item.description')
                            .text.text--bold.text--accent(v-html='item.skills.join(" | ")')

            .swiper-pagination

        section#contacts.home__section.home__section--contacts
            .home__wrap
                .home__title-box
                    .h2(v-html='data.contacts.title')
                    .motto(v-html='data.contacts.motto')
                .home__content
                    .home__list.home__list--mobile-column
                        .home__box(v-for='item in data.contacts.list', v-observe-visibility='visibilityChanged')
                            .text.text--bold(v-html='item.name')
                            a.text(:href='item.link', v-html='item.value')

        footer.home__section.home__section--footer
            .home__wrap
                .logo
                    svg(xmlns="http://www.w3.org/2000/svg" width="48.2" height="44.6" viewbox="0 0 48.2 44.6")
                        path(d="M0 44.6V0h9v44.6H0z" fill="#fff")
                        path(d="M17.6 44.6V0h30.6v7.5H26.6v10.6h18.6v7.5H26.6v19h-9z" fill="#00bfd6")
                .text(v-html='data.footer.text')

        button.home__btn-top(@click='toTop()') Top

        //- ComponentExample(msg='Vue')
        //- router-link(to='/pageexample') {{gotoexample}}
        //- Share
</template>

<script>
// const Quiz = () => import('@/components/Quiz.vue');
// const Share = () => import('@/components/Share.vue');
/* UNCOMMENT TO ENABLE i18n import LocaleSwitcher from '@/components/LocaleSwitcher.vue'; */
import data from '../assets/data/data.json';
import Swiper from 'swiper';

export default {
    name: 'Home',

    components: {
        // Quiz,
        // Share
        /* UNCOMMENT TO ENABLE i18n LocaleSwitcher */
    },

    data() {
        return {
            data: data
        };
    },

    mounted() {
        this.initSW();
    },

    methods: {
        initSW() {
            this._sw = new Swiper('.swiper-container', {
                loop: true,
                speed: 600,
                pagination: {
                    el: '.swiper-pagination'
                },
                keyboard: true,
                autoplay: {
                    delay: 5000
                }
            });
        },
        toTop() {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        },

        visibilityChanged(e, el) {
            if (e) {
                el.target.classList.add('show');
            }
        }
    }
};
</script>

<style lang="scss">
@import '../assets/css/vars.scss';
@import '../../node_modules/swiper/dist/css/swiper.min.css';

:root {
    --vh: 5.68px;
}

.home {
    font-family: var(--font-main);

    &__img {
        border: 1px dashed;
    }

    &__section {
        position: relative;
        background-color: var(--color-main-bg);
        z-index: 3;

        &--preview {
            min-height: 95vh;
            background-color: transparent;

            @supports (--css: variables) {
                min-height: calc(var(--vh) * 95);
            }
        }

        &--education,
        &--contacts {
            background-color: var(--color-accent-bg);
        }

        &--slider {
            width: 100%;
            height: calc(100vh - 6.8em);

            @supports (--css: variables) {
                min-height: calc(var(--vh) * 85);
            }
        }

        &--footer {
            .home__wrap {
                display: flex;
                justify-content: space-between;
                align-items: center;

                .home & .text {
                    margin-bottom: 0;
                }
            }
        }
    }

    &__wrap {
        position: relative;
        display: flex;
        max-width: var(--max-width);
        margin: 0 auto;
        padding: 3em 3em;
        z-index: 2;

        &--preview {
            min-height: 95vh;
            flex-direction: column;
            justify-content: center;
            padding-top: 5.8em;

            @supports (--css: variables) {
                min-height: calc(var(--vh) * 95);
            }
        }

        @media (--viewport-tablet) {
            flex-direction: column;
            padding-left: 1em;
            padding-right: 1em;

            .home__section--footer & {
                flex-direction: row;

                .logo {
                    margin-right: 2em;
                }
            }
        }
    }

    &__bg {
        position: fixed;
        top: 0;
        left: 0;
        background-image: url('../assets/img/01.png');
        background-size: cover;
        background-position: center;
        min-height: 95vh;
        width: 100vw;

        @supports (--css: variables) {
            min-height: calc(var(--vh) * 95);
        }
    }

    &__title {
        position: relative;
        font-size: 5em;
        line-height: 1.2;
        font-weight: bold;
        color: var(--color-accent-text);
        margin-bottom: 0.2em;
    }

    &__subtitle {
        position: relative;
        position: relative;
        font-size: 1.5em;
        color: var(--color-accent-text);
        margin-bottom: 3em;

        &:after {
            content: '';
            display: block;
            position: absolute;
            bottom: -1.5em;
            left: 0;
            height: 1px;
            width: 50%;
            background-color: var(--color-main-bg);
            opacity: 0.5;
        }
    }

    &__link-list {
        position: relative;
        display: flex;
    }

    &__link {
        display: block;
        width: 3em;
        height: 3em;
        border-radius: 100%;
        margin-right: 1em;
        transition: background 0.3s ease;

        span {
            display: block;
            width: 100%;
            height: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        svg {
            position: relative;
            width: 50%;
            height: 50%;
            fill: var(--color-accent-text);
        }

        &:hover {
            background-color: var(--color-main-bg);

            svg {
                fill: var(--color-title-text);
            }
        }
    }

    &__title-box {
        width: 35%;
        text-align: right;
        padding: 1em;

        @media (--viewport-tablet) {
            width: 100%;
            padding-left: 0;
            padding-right: 0;
            text-align: left;
        }
    }

    .h2 {
        font-size: 2.5em;
        font-weight: bold;
        color: var(--color-title-text);

        &--uppercase {
            text-transform: uppercase;
        }

        &--accent {
            color: var(--color-accent-text);
        }
    }

    .h3 {
        font-size: 1.5em;
        font-weight: bold;
        margin-bottom: 1em;
        color: var(--color-title-text);
    }

    .motto {
        color: var(--color-main-text);
    }

    &__content {
        width: 65%;
        color: var(--color-main-text);
        padding: 2em 1em 1em 4em;

        @media (--viewport-tablet) {
            width: 100%;
            padding-left: 0;
            padding-right: 0;
        }
    }

    .text {
        text-decoration: none;
        color: var(--color-main-text);
        margin-bottom: 3em;

        p {
            margin-bottom: 1em;
        }

        &--bold {
            font-weight: bold;
        }

        &--accent {
            color: var(--color-accent-text);
        }

        a {
            color: var(--color-theme);
            opacity: 0.8;

            &:hover {
                opacity: 1;
            }
        }
    }

    &__item {
        display: flex;
        flex-wrap: wrap;
        color: var(--color-title-text);
        justify-content: space-between;

        .text {
            margin-bottom: 1em;
        }
    }

    &__progress-line {
        position: relative;
        width: 100%;
        margin-bottom: 2em;

        span {
            display: block;
            height: 3px;
            background-color: var(--color-main-text);
            width: 100%;

            &:first-child {
                opacity: 0.25;
            }

            &:last-child {
                position: absolute;
                top: 0;
                left: 0;
                background-color: var(--color-theme);
                transform-origin: 0;
                transform: scaleX(0);
            }
        }

        &.show {
            span:last-child {
                transform: scaleX(1);
                transition: transform 1s cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s;
            }
        }
    }

    &__cards {
        display: flex;
        flex-wrap: wrap;
    }

    &__card {
        width: 50%;
        min-height: 10em;
        text-decoration: none;
        padding: 2em;
        background-color: var(--color-main-bg);

        .text,
        .h3 {
            transition: transform 0.3s ease;
        }

        .text {
            margin-bottom: 1em;
        }

        &:nth-child(4n + 2),
        &:nth-child(4n + 3) {
            background-color: var(--color-theme);

            .text,
            .h3 {
                color: var(--color-accent-text);
            }

            svg {
                fill: var(--color-accent-text);
            }
        }

        &:hover {
            .text,
            .h3,
            .card__icon {
                transform: translateY(-30px);
            }

            .card__icon {
                opacity: 0;
            }
        }

        @media (--viewport-tablet) {
            width: 100%;

            &:nth-child(2n + 2) {
                background-color: var(--color-theme);

                .text,
                .h3 {
                    color: var(--color-accent-text);
                }

                svg {
                    fill: var(--color-accent-text);
                }
            }

            &:nth-child(4n + 3) {
                background-color: var(--color-main-bg);

                .text,
                .h3 {
                    color: var(--color-title-text);
                }

                svg {
                    fill: var(--color-title-text);
                }
            }
        }
    }

    .card__icon {
        margin-bottom: 1em;
        display: block;
        width: 2em;
        height: 2em;
        transition: transform 0.3s ease, opacity 0.3s ease;

        svg {
            width: 100%;
            height: 100%;
        }
    }

    &__history {
        display: flex;
        flex-direction: column;
    }

    .history__point {
        position: relative;
        display: flex;
        flex-direction: column;
        width: 50%;
        text-align: right;
        padding: 2em;

        @media (--viewport-tablet) {
            padding: 1em 1em 1em 0;

            &:nth-child(2n + 2) {
                padding: 1em 0 1em 1em;
            }
        }

        &:before {
            content: '';
            position: absolute;
            top: 3.5em;
            right: -1px;
            width: 0;
            height: 0;
            border-style: solid;
            border-width: 1em 1em 1em 0;
            border-color: transparent var(--color-theme) transparent transparent;
        }

        &:after {
            content: '';
            position: absolute;
            top: 0;
            right: -1px;
            height: 100%;
            width: 2px;
            background-color: var(--color-main-text);
        }

        &:nth-child(2n) {
            align-self: flex-end;
            text-align: left;

            &:after {
                left: -1px;
                right: auto;
            }

            &:before {
                left: -1px;
                right: auto;
                border-width: 1em 0 1em 1em;
                border-color: transparent transparent transparent var(--color-theme);
            }
        }

        .text,
        .h3 {
            margin-bottom: 0;
        }
    }

    .swiper-pagination-bullet-active {
        background-color: var(--color-theme);
    }

    &__list {
        display: flex;
        flex-wrap: wrap;

        &--column {
            flex-direction: column;
        }

        &--mobile-column {
            @media (--viewport-tablet) {
                flex-direction: column;
            }
        }
    }

    &__box {
        flex-grow: 1;
        flex-shrink: 0;
        padding: 0 1em;

        .text {
            margin-bottom: 1em;
        }

        @media (--viewport-tablet) {
            display: flex;
            justify-content: space-between;
            margin-bottom: 1em;
        }
    }

    &__btn-top {
        position: fixed;
        bottom: 2em;
        right: 2em;
        width: 3em;
        height: 3em;
        border-radius: 0.5em;
        background-color: var(--color-main-text);
        color: var(--color-accent-text);
        text-transform: uppercase;
        z-index: 10;
        opacity: 0;
        pointer-events: none;
    }

    .logo {
        svg {
            path:first-child {
                fill: var(--color-main-text);
            }
        }
    }

    .home__section--about .text--show,
    &__card,
    .history__point .text,
    .history__point .h3,
    &__box {
        opacity: 0;
        transform: translateY(50px);

        &.show {
            opacity: 1;
            transform: translateY(0px);
            transition: opacity 1s ease 0.2s, transform 1s cubic-bezier(0.39, 0.575, 0.565, 1) 0.2s;
        }
    }

    [data-state='scrolling'] & {
        .home__btn-top {
            opacity: 0.5;
            pointer-events: all;
        }
    }

    .swiper-slide {
        @media (--viewport-tablet) {
            display: flex;
            flex-direction: column;
        }
    }

    .slide {
        &__bg {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;

            @media (--viewport-tablet) {
                position: relative;
                height: 50%;
            }

            img {
                object-fit: cover;
                min-width: 100%;
                height: 100%;

                @media (--viewport-tablet) {
                    height: 100%;
                }
            }
        }

        &__wrap {
            position: relative;
            width: 50%;
            height: 100%;
            background-color: rgba(#000, 0.8);
            display: flex;
            justify-content: flex-end;

            @media (--viewport-tablet) {
                width: 100%;
                flex-grow: 1;
            }
        }

        &__group {
            max-width: calc(var(--max-width) / 2);
            width: 100%;
            font-size: 1.1em;
            text-decoration: none;
            display: flex;
            flex-direction: column;
            justify-content: center;
            padding-left: 3em;
            padding-right: 3em;
            box-sizing: border-box;

            @media (--viewport-tablet) {
                font-size: 1em;
                padding-top: 2em;
                justify-content: flex-start;
            }

            .h2 {
                position: relative;

                &:before {
                    content: '';
                    position: absolute;
                    top: 50%;
                    left: -0.7em;
                    display: block;
                    width: 0.5em;
                    height: 2px;
                    background-color: currentColor;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }
            }

            &:hover {
                .h2:before {
                    opacity: 1;
                }
            }

            .text {
                width: 80%;
            }
        }
    }
}
</style>
