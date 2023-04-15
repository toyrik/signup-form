const mix = require('laravel-mix');

mix.js('vue/app.js', 'web/js/app.js')
    .setPublicPath('web')
    .vue();
