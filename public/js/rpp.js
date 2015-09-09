//REQUIRE OBJ SITE RPP
define(['jquery'], function ($) {
    'use strict';
    //INIT JQUERY
    var rpp = window.rpp || {},
    rpp = {
        method : function(){
            //METODO
            console.log(this, 'this');
        }
    };
    //INIT JQUERY
    $(function() {
        console.log(rpp,'rpp');
        console.log($('body'),'body');
    });

});
