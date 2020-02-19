<template lang="pug">
    .updated
        span.updated__text(v-html='text')

        a.updated__refresh(href='./', @click.prevent='clickRefresh') {{refresh}}

        button.updated__close(type='button', :aria-label='close', @click='clickClose')
            svg(xmlns='http://www.w3.org/2000/svg', width='18', height='18', viewBox='0 0 612 612')
                title {{close}}
                path(d='M612 36.004L576.521.603 306 270.608 35.478.603 0 36.004l270.522 270.007L0 575.997l35.478 35.4L306 341.411l270.521 269.986 35.479-35.4-270.541-269.986z')
</template>

<script>
export default {
    name: 'Updated',

    data() {
        return {
            text: 'A new version is available',
            refresh: 'Refresh',
            close: 'Close'
        };
    },

    methods: {
        clickRefresh() {
            window.location.reload(true);
        },
        clickClose() {
            document.body.removeAttribute('data-updated');
        }
    }
};
</script>

<style lang="scss">
.updated {
    position: fixed;
    bottom: 1em;
    right: 1em;
    z-index: 1;
    display: none;
    align-items: center;
    max-width: 300px;
    margin: 0;
    padding: 0.92em 1.2em;
    border-radius: 4px;
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    font-size: 14px;
    line-height: 1;

    body[data-updated='true'] & {
        display: flex;
    }

    &__text {
        margin: 0 0.5em 0 0;
    }

    &__refresh {
        margin: 0 1em 0 0;
        text-transform: uppercase;
        text-decoration: none;
        letter-spacing: 0.025em;
        font-weight: 700;
        color: #a2c3f8;
    }

    &__close {
        width: 0.78em;
        height: 0.78em;
        color: #fff;

        svg {
            width: 100%;
            height: 100%;
            vertical-align: top;
            fill: currentColor;
        }
    }
}
</style>
