//CONFIG REQUIREJS
requirejs.config({
    baseUrl: 'js/lib',
    paths: {
        rppUtils: '../rpp_utils',
        rpp: '../rpp',
        jquery: 'jquery-1.11.3.min'
    },
    shim : {
        rpp : {
            deps : ['jquery', 'rppUtils'],
            exports : 'rpp'
        }
    },
    deps : ['rpp']
});
