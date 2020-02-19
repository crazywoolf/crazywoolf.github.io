<template lang="pug">
    main.main(:data-state='isScrolling ? "scrolling" : ""')

        Header

        router-view

        vue-progress-bar

        //- Updated

</template>

<script>
/* https://github.com/chris-pearce/backpack.css */
import 'backpack.css';

import Header from '@/components/Header.vue';

/* meta info (for title) */
import meta from '@/assets/data/meta';

/* 'new content available' badge */
// const Updated = () => import('@/components/Updated.vue');

export default {
    name: 'App',

    metaInfo: {
        titleTemplate: titleChunk => {
            return titleChunk ? `${titleChunk} - ${meta.title}` : meta.title;
        }
    },

    components: {
        Header
    },

    data() {
        return {
            isScrolling: false
        };
    },

    created() {
        this.progressOnRouting();

        this.removeLoadingClass();
    },

    mounted() {
        this.$Progress.finish();

        this.calculateVH();
        window.addEventListener('scroll', () => {
            if (pageYOffset > 100 && !this.isScrolling) {
                this.isScrolling = true;
            } else if (pageYOffset <= 100 && this.isScrolling) {
                this.isScrolling = false;
            }
        });
    },

    methods: {
        progressOnRouting() {
            this.$Progress.start();

            this.$router.beforeEach((to, from, next) => {
                this.$Progress.start();
                next();
            });

            this.$router.afterEach(() => {
                this.$Progress.finish();
            });
        },

        removeLoadingClass() {
            const listener = () => {
                document.body.classList.remove('js-loading');
                window.removeEventListener('load', listener);
            };
            window.addEventListener('load', listener);
        },

        calculateVH() {
            const setVH = () => {
                const vh = window.innerHeight * 0.01;
                document.documentElement.style.setProperty('--vh', `${vh}px`);
            };

            setVH();

            /* resize */
            (function() {
                const throttle = function(type, name, obj) {
                    obj = obj || window;
                    let running = false;
                    const func = function() {
                        if (running) {
                            return;
                        }
                        running = true;
                        requestAnimationFrame(function() {
                            obj.dispatchEvent(new CustomEvent(name));
                            running = false;
                        });
                    };
                    obj.addEventListener(type, func);
                };
                throttle('resize', 'optimizedResize');
            })();
            window.addEventListener('optimizedResize', setVH);
        }
    }
};
</script>

<style lang="scss">
/* import npm styles (if needed) */
@import '~poly-fluid-sizing';

/* import fonts (only in App.vue) */
@import 'assets/css/fonts.scss';

/* import vars (repeat in all .vue files) */
@import 'assets/css/vars.scss';

/* reduce motion */
@media screen and (prefers-reduced-motion: reduce), (update: slow) {
    * {
        animation-duration: 0.001ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.001ms !important;
    }
}

/* start animation when js loaded */
body.js-loading *,
body.js-loading *::before,
body.js-loading *::after {
    animation-play-state: paused !important;
}

/* main styles */
body {
    -moz-osx-font-smoothing: grayscale;
    -webkit-font-smoothing: antialiased;
    text-rendering: optimizeLegibility;
    font-family: var(--font-main);
    font-weight: 400;
    font-size: 18px;
    line-height: 1.4;
    background: var(--color-main-bg);
    color: var(--color-main-text);

    $mapFontSize: (
        320px: 12px,
        1440px: 15px,
        1920px: 20px
    );
    @include poly-fluid-sizing('font-size', $mapFontSize);
}

.main {
    position: relative;
    margin: 0;
    padding-top: constant(safe-area-inset-top);
    padding-right: constant(safe-area-inset-right);
    padding-bottom: constant(safe-area-inset-bottom);
    padding-left: constant(safe-area-inset-left);
}
</style>
