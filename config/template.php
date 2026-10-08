<?php

// Di-generate oleh php artisan template:zip - hanya berisi flavor "barbershop".
// Ganti brand/warna di bawah, atau set TEMPLATE_FLAVOR di .env.

return [
    'flavor' => env('TEMPLATE_FLAVOR', 'barbershop'),

    'flavors' => array (
  'barbershop' => 
  array (
    'label' => 'Barbershop & Salon',
    'brand_name' => 'GANTENG',
    'brand_tagline' => 'Booking barbershop',
    'brand_initials' => 'GA',
    'accent' => '#7c2d12',
    'category' => 'jasa',
    'home' => 'barbershop.index',
    'nav' => 
    array (
      'sections' => 
      array (
        0 => 
        array (
          'label' => 'Barbershop',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Dashboard',
              'to' => '/barbershop',
              'icon' => 'LayoutDashboard',
            ),
            1 => 
            array (
              'label' => 'Booking',
              'to' => '/barbershop/booking',
              'icon' => 'CalendarCheck',
            ),
            2 => 
            array (
              'label' => 'Antrian',
              'to' => '/barbershop/antrian',
              'icon' => 'ListOrdered',
            ),
            3 => 
            array (
              'label' => 'Kapster',
              'to' => '/barbershop/kapster',
              'icon' => 'Users',
            ),
            4 => 
            array (
              'label' => 'Paket Layanan',
              'to' => '/barbershop/layanan',
              'icon' => 'Scissors',
            ),
            5 => 
            array (
              'label' => 'Laporan',
              'to' => '/barbershop/laporan',
              'icon' => 'ChartLine',
            ),
          ),
        ),
        1 => 
        array (
          'label' => 'Umum',
          'items' => 
          array (
            0 => 
            array (
              'label' => 'Pengguna',
              'to' => '/users',
              'icon' => 'Users',
            ),
            1 => 
            array (
              'label' => 'Peran',
              'to' => '/roles',
              'icon' => 'ShieldCheck',
            ),
            2 => 
            array (
              'label' => 'Pengaturan',
              'to' => '/settings',
              'icon' => 'Settings',
            ),
            3 => 
            array (
              'label' => 'Profil',
              'to' => '/profile',
              'icon' => 'User',
            ),
          ),
        ),
      ),
    ),
  ),
),
];
