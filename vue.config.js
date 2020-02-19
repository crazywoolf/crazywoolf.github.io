const ManifestPlugin = require('webpack-manifest-plugin');

const isProd = process.env.NODE_ENV === 'production';

const meta = require('./src/assets/data/meta.json');

const projectPath = '/';

module.exports = {
    publicPath: isProd ? projectPath : '/',

    outputDir: 'dist',

    assetsDir: 'src/assets/',

    filenameHashing: true,

    pages: {
        index: {
            entry: 'src/main.js',
            template: 'public/index.html',
            filename: 'index.html',
            title: meta.title,
            description: meta.description,
            url: isProd ? meta.url : '/',
            share: meta.share,
            themeColor: meta.themeColor,
            accentColor: meta.accentColor,
            fbappid: meta.fbappid
        }
    },

    lintOnSave: true,

    productionSourceMap: true,

    configureWebpack: {
        plugins: [
            new ManifestPlugin({
                fileName: 'site.webmanifest',
                seed: {
                    name: meta.title,
                    short_name: meta.title12,
                    description: meta.description,
                    theme_color: meta.themeColor,
                    background_color: meta.themeColor,
                    start_url: '.',
                    display: 'standalone',
                    orientation: 'portrait',
                    icons: [
                        {
                            src: './img/icons/android-chrome-192x192.png',
                            sizes: '192x192',
                            type: 'image/png'
                        },
                        {
                            src: './img/icons/android-chrome-512x512.png',
                            sizes: '512x512',
                            type: 'image/png'
                        }
                    ]
                },
                generate: (seed, files) => files.reduce(manifest => ({...manifest}), seed),
                serialize: manifest => JSON.stringify(manifest, null, 4)
            })
        ]
    },

    chainWebpack: config => {
        config.module
            .rule('vue')
            .use('vue-loader')
            .loader('vue-loader')
            .tap(options => {
                options.transformAssetUrls = {
                    video: ['src', 'poster'],
                    source: 'src',
                    img: 'src',
                    'lazy-img': 'src',
                    'lazy-background': 'src',
                    image: 'xlink:href'
                };
                return options;
            });
    },

    css: {
        sourceMap: true
    },

    pwa: {
        manifestPath: 'site.webmanifest',
        name: meta.title,
        themeColor: meta.themeColor,
        msTileColor: '#2d89ef',
        iconPaths: {
            favicon32: 'img/icons/favicon-32x32.png',
            favicon16: 'img/icons/favicon-16x16.png',
            appleTouchIcon: 'img/icons/apple-touch-icon.png',
            maskIcon: 'img/icons/safari-pinned-tab.svg',
            msTileImage: 'img/icons/mstile-150x150.png'
        },
        workboxOptions: {
            skipWaiting: true,
            clientsClaim: true,
            offlineGoogleAnalytics: true,
            exclude: [/\.htaccess$/, /\.map$/, /\.php$/, /\.mp4$/, /\.webm$/, /\.mp3$/]
        },
        appleMobileWebAppStatusBarStyle: 'black'
    },

    pluginOptions: {
        i18n: {
            locale: 'ru',
            fallbackLocale: 'en',
            localeDir: 'locales',
            enableInSFC: true
        }
    }
};
