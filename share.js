/* generate statis share files for facebook open graph */

const fs = require('fs');
const createHTML = require('create-html');
const metaData = require('./src/assets/data/meta');
const shareData = require('./src/assets/data/share');

shareData.forEach((item, index) => {
    const html = createHTML({
        lang: 'ru',
        title: item.title,
        head: `<meta property="og:type" content="website">
            <meta property="og:image:width" content="1200">
            <meta property="og:image:height" content="630">
            <meta property="og:image:type" content="image/jpg">
            <meta name="twitter:card" content="summary_large_image">

            <meta property="og:title" content="${item.title}">
            <meta name="twitter:title" content="${item.title}">

            <meta name="description" content="${item.description}">
            <meta property="og:description" content="${item.description}">
            <meta name="twitter:description" content="${item.description}">

            <meta property="og:url" content="${metaData.url}/share/share${index}.html">
            <link rel="canonical" href="${metaData.url}/share/share${index}.html">

            <meta property="og:image" content="${metaData.url}/img/share/${item.image}">
            <meta name="twitter:image" content="${metaData.url}/img/share/${item.image}">`.replace(/>\s+</g, '><'),
        body: `<script>window.location.href = '${metaData.url}';</script>`
    });

    fs.writeFile(`./public/share/share${index}.html`, html, err => {
        if (err) throw err;
        console.log(`File './public/share/share${index}.html' has been saved.`);
    });
});
