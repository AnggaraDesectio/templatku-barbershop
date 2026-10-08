<?php

use App\Http\Controllers\Web\BarbershopController;
use Illuminate\Support\Facades\Route;

Route::prefix('barbershop')->name('barbershop.')->group(function () {
    Route::get('/', [BarbershopController::class, 'index'])->name('index');
    Route::get('/booking', [BarbershopController::class, 'booking'])->name('booking');
    Route::get('/antrian', [BarbershopController::class, 'antrian'])->name('antrian');
    Route::get('/kapster', [BarbershopController::class, 'kapster'])->name('kapster');
    Route::get('/layanan', [BarbershopController::class, 'layanan'])->name('layanan');
    Route::get('/laporan', [BarbershopController::class, 'laporan'])->name('laporan');
});
