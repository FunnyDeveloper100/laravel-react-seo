<?php

Route::namespace('Web')->name('web.')->group(function () {

    Route::get('/sitemap.xml', 'Sitemap@index');
    Route::get('/robots.txt', 'Sitemap@robots');
    Route::get('/{first_path?}/{second_path?}/{third_path?}/{fourth_path?}', 'Home@index');
    
});