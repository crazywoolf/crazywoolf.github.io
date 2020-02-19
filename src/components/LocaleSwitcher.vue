<template lang="pug">
    .localeswitcher
        button.localeswitcher__item(
            v-for='locale in locales',
            :key='locale',
            :disabled='locale === activeLocale ? "disabled" : false',
            @click='setLocale(locale)'
            ) {{getLanguageString(locale)}}
</template>

<script>
import Vue from 'vue';
import VueCookie from 'vue-cookie';

Vue.use(VueCookie);

const localeStrings = {
    en: 'English',
    ru: 'Русский (Russian)'
};

const activeLocale = VueCookie.get('locale') || process.env.VUE_APP_I18N_LOCALE;

export default {
    name: 'LocaleSwitcher',
    data() {
        return {
            activeLocale,
            locales: ['en', 'ru']
        };
    },
    mounted() {
        this.setLocale(this.activeLocale);
    },
    methods: {
        setLocale(locale) {
            this.activeLocale = locale;
            this.$cookie.set('locale', locale);
            this.$i18n.locale = locale;
        },
        getLanguageString(locale) {
            return localeStrings[locale];
        }
    }
};
</script>

<style lang="scss">
.localeswitcher {
    margin: 0;

    &__item {
        margin: 10px;

        &[disabled] {
            opacity: 0.5;
        }
    }
}
</style>
