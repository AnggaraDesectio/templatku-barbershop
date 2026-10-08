<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Support\Demo\BarbershopData;
use Inertia\Inertia;
use Inertia\Response;

/** Halaman-halaman Barbershop & Salon (Inertia). */
class BarbershopController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('barbershop/index', [
            'ringkasan' => BarbershopData::ringkasan(),
            'chart'     => BarbershopData::bookingPerJam(),
            'antrian'   => array_slice(BarbershopData::antrians(), 0, 6),
        ]);
    }

    public function booking(): Response
    {
        return Inertia::render('barbershop/booking', [
            'bookings' => BarbershopData::bookings(),
        ]);
    }

    public function antrian(): Response
    {
        return Inertia::render('barbershop/antrian', [
            'papan' => BarbershopData::antrianPerKapster(),
        ]);
    }

    public function kapster(): Response
    {
        return Inertia::render('barbershop/kapster', [
            'kapsters' => BarbershopData::kapsters(),
        ]);
    }

    public function layanan(): Response
    {
        return Inertia::render('barbershop/layanan', [
            'layanans' => BarbershopData::layanans(),
        ]);
    }

    public function laporan(): Response
    {
        return Inertia::render('barbershop/laporan', [
            'ringkasan'   => BarbershopData::ringkasan(),
            'perJam'      => BarbershopData::bookingPerJam(),
            'perLayanan'  => BarbershopData::bookingPerLayanan(),
            'distribusi'  => BarbershopData::distribusiStatus(),
            'omzet'       => BarbershopData::omzetPerLayanan(),
            'leaderboard' => BarbershopData::kapsterLeaderboard(),
        ]);
    }
}
