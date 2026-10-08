<?php

namespace App\Support\Demo;

/**
 * Data demo Barbershop & Salon (GANTENG): layanan, kapster, booking, antrian.
 * Kontrak status: ['label' => .., 'tone' => ..] tanpa HTML,
 * tone ∈ success | warning | destructive | info.
 * Booking selalu merujuk layanan + kapster lewat ID mentah.
 */
class BarbershopData
{
    private static function rp(int $value): string
    {
        return 'Rp'.number_format($value, 0, ',', '.');
    }

    private static function rb(int $value): int
    {
        return (int) round($value / 1000);
    }

    /** Baris mentah layanan (tanpa agregat), dipakai internal agar tidak rekursi. */
    private static function layananRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Potong Rambut Reguler',   'kategori' => 'Potong',    'harga' => 35000,  'durasi_menit' => 30],
            ['id' => 2, 'nama' => 'Potong Rambut + Cuci',    'kategori' => 'Potong',    'harga' => 50000,  'durasi_menit' => 45],
            ['id' => 3, 'nama' => 'Cukur & Rapikan Jenggot', 'kategori' => 'Cukur',     'harga' => 30000,  'durasi_menit' => 20],
            ['id' => 4, 'nama' => 'Creambath + Pijat',       'kategori' => 'Perawatan', 'harga' => 60000,  'durasi_menit' => 45],
            ['id' => 5, 'nama' => 'Hair Mask & Vitamin',     'kategori' => 'Perawatan', 'harga' => 45000,  'durasi_menit' => 40],
            ['id' => 6, 'nama' => 'Semir / Pewarna Rambut',  'kategori' => 'Coloring',  'harga' => 150000, 'durasi_menit' => 90],
            ['id' => 7, 'nama' => 'Paket Pengantin & Wisuda','kategori' => 'Paket',     'harga' => 200000, 'durasi_menit' => 120],
            ['id' => 8, 'nama' => 'Pijat Kepala Relaksasi',  'kategori' => 'Perawatan', 'harga' => 25000,  'durasi_menit' => 15],
        ];
    }

    /** Baris mentah kapster (tanpa agregat). */
    private static function kapsterRows(): array
    {
        return [
            ['id' => 1, 'nama' => 'Rizky Pratama', 'spesialisasi' => 'Fade & Undercut',       'rating' => 4.9, 'telepon' => '0812-3456-7890', 'pengalaman_tahun' => 6, 'aktif' => true],
            ['id' => 2, 'nama' => 'Dimas Angga',   'spesialisasi' => 'Classic & Pompadour',    'rating' => 4.8, 'telepon' => '0813-2345-6789', 'pengalaman_tahun' => 5, 'aktif' => true],
            ['id' => 3, 'nama' => 'Budi Santoso',  'spesialisasi' => 'Jenggot & Shaving',       'rating' => 4.7, 'telepon' => '0815-6789-0123', 'pengalaman_tahun' => 8, 'aktif' => true],
            ['id' => 4, 'nama' => 'Fajar Nugroho', 'spesialisasi' => 'Coloring & Styling',      'rating' => 4.9, 'telepon' => '0816-5432-1098', 'pengalaman_tahun' => 4, 'aktif' => true],
            ['id' => 5, 'nama' => 'Eko Saputra',   'spesialisasi' => 'Creambath & Treatment',   'rating' => 4.6, 'telepon' => '0817-1234-5678', 'pengalaman_tahun' => 3, 'aktif' => true],
        ];
    }

    private static function statusBooking(string $key): array
    {
        return match ($key) {
            'menunggu'  => ['label' => 'Menunggu',  'tone' => 'warning'],
            'dikerjakan'=> ['label' => 'Dikerjakan','tone' => 'info'],
            'selesai'   => ['label' => 'Selesai',   'tone' => 'success'],
            'batal'     => ['label' => 'Batal',     'tone' => 'destructive'],
            default     => ['label' => $key,        'tone' => 'info'],
        };
    }

    /** Baris mentah booking hari ini: merujuk layanan_id + kapster_id. */
    private static function bookingRows(): array
    {
        return [
            ['id' => 1,  'pelanggan' => 'Andi Wijaya',    'layanan_id' => 1, 'kapster_id' => 1, 'jam' => '09:00', 'status' => 'selesai'],
            ['id' => 2,  'pelanggan' => 'Budi Hartono',   'layanan_id' => 3, 'kapster_id' => 3, 'jam' => '09:20', 'status' => 'selesai'],
            ['id' => 3,  'pelanggan' => 'Cahyo Ramadhan', 'layanan_id' => 1, 'kapster_id' => 2, 'jam' => '09:30', 'status' => 'selesai'],
            ['id' => 4,  'pelanggan' => 'Dedi Kurniawan', 'layanan_id' => 5, 'kapster_id' => 5, 'jam' => '10:00', 'status' => 'dikerjakan'],
            ['id' => 5,  'pelanggan' => 'Eko Prasetyo',   'layanan_id' => 2, 'kapster_id' => 1, 'jam' => '10:15', 'status' => 'menunggu'],
            ['id' => 6,  'pelanggan' => 'Fajar Hidayat',  'layanan_id' => 4, 'kapster_id' => 5, 'jam' => '10:30', 'status' => 'menunggu'],
            ['id' => 7,  'pelanggan' => 'Gilang Saputra', 'layanan_id' => 1, 'kapster_id' => 2, 'jam' => '11:00', 'status' => 'menunggu'],
            ['id' => 8,  'pelanggan' => 'Hendra Gunawan', 'layanan_id' => 6, 'kapster_id' => 4, 'jam' => '11:30', 'status' => 'menunggu'],
            ['id' => 9,  'pelanggan' => 'Irwan Setiawan', 'layanan_id' => 3, 'kapster_id' => 3, 'jam' => '13:00', 'status' => 'menunggu'],
            ['id' => 10, 'pelanggan' => 'Jaka Pratama',   'layanan_id' => 7, 'kapster_id' => 4, 'jam' => '14:00', 'status' => 'menunggu'],
            ['id' => 11, 'pelanggan' => 'Kurniawan Adi',  'layanan_id' => 1, 'kapster_id' => 1, 'jam' => '15:00', 'status' => 'batal'],
            ['id' => 12, 'pelanggan' => 'Lukman Hakim',   'layanan_id' => 2, 'kapster_id' => 2, 'jam' => '15:30', 'status' => 'menunggu'],
        ];
    }

    /** Daftar layanan + jumlah booking per layanan. */
    public static function layanans(): array
    {
        $count = [];
        foreach (self::bookingRows() as $b) {
            $count[$b['layanan_id']] = ($count[$b['layanan_id']] ?? 0) + 1;
        }

        return array_map(fn ($l) => [
            'id'            => $l['id'],
            'nama'          => $l['nama'],
            'kategori'      => $l['kategori'],
            'harga'         => $l['harga'],
            'harga_rp'      => self::rp($l['harga']),
            'durasi'        => $l['durasi_menit'].' menit',
            'jumlah_booking'=> $count[$l['id']] ?? 0,
        ], self::layananRows());
    }

    /** Daftar kapster + jumlah booking yang ditangani. */
    public static function kapsters(): array
    {
        $count = [];
        foreach (self::bookingRows() as $b) {
            $count[$b['kapster_id']] = ($count[$b['kapster_id']] ?? 0) + 1;
        }

        return array_map(fn ($k) => [
            'id'              => $k['id'],
            'nama'            => $k['nama'],
            'spesialisasi'    => $k['spesialisasi'],
            'rating'          => $k['rating'],
            'telepon'         => $k['telepon'],
            'pengalaman'      => $k['pengalaman_tahun'].' tahun',
            'status'          => $k['aktif']
                ? ['label' => 'Aktif', 'tone' => 'success']
                : ['label' => 'Libur', 'tone' => 'warning'],
            'booking_ditangani' => $count[$k['id']] ?? 0,
        ], self::kapsterRows());
    }

    /** Booking hari ini, diperkaya nama layanan + kapster. */
    public static function bookings(): array
    {
        $layanans = [];
        foreach (self::layananRows() as $l) {
            $layanans[$l['id']] = $l;
        }
        $kapsters = [];
        foreach (self::kapsterRows() as $k) {
            $kapsters[$k['id']] = $k;
        }

        return array_map(function ($b) use ($layanans, $kapsters) {
            $l = $layanans[$b['layanan_id']];
            return [
                'id'        => $b['id'],
                'pelanggan' => $b['pelanggan'],
                'layanan'   => $l['nama'],
                'kapster'   => $kapsters[$b['kapster_id']]['nama'],
                'jam'       => $b['jam'],
                'harga_rp'  => self::rp($l['harga']),
                'status'    => self::statusBooking($b['status']),
            ];
        }, self::bookingRows());
    }

    /** Antrian berjalan (menunggu + dikerjakan), dinomori per kapster. */
    public static function antrians(): array
    {
        $nomorPerKapster = [];
        $antrian = [];

        foreach (self::bookings() as $b) {
            $key = $b['status']['label'];
            if (! in_array($key, ['Menunggu', 'Dikerjakan'], true)) {
                continue;
            }
            $nomorPerKapster[$b['kapster']] = ($nomorPerKapster[$b['kapster']] ?? 0) + 1;
            $b['nomor'] = 'A-'.str_pad((string) $nomorPerKapster[$b['kapster']], 2, '0', STR_PAD_LEFT);
            $antrian[] = $b;
        }

        return $antrian;
    }

    /** Papan antrian live, dikelompokkan per kapster. */
    public static function antrianPerKapster(): array
    {
        $papan = [];
        foreach (self::kapsters() as $k) {
            $papan[$k['nama']] = [
                'kapster'       => $k['nama'],
                'spesialisasi'  => $k['spesialisasi'],
                'antrian'       => [],
            ];
        }
        foreach (self::antrians() as $a) {
            $papan[$a['kapster']]['antrian'][] = $a;
        }

        return array_values($papan);
    }

    /** Ringkasan angka dashboard (dihitung dari data). */
    public static function ringkasan(): array
    {
        $bookings = self::bookings();
        $selesai  = array_filter($bookings, fn ($b) => $b['status']['label'] === 'Selesai');
        $antri    = array_filter($bookings, fn ($b) => in_array($b['status']['label'], ['Menunggu', 'Dikerjakan'], true));
        $hargaSelesai = 0;
        foreach (self::bookingRows() as $b) {
            if ($b['status'] !== 'selesai') {
                continue;
            }
            foreach (self::layananRows() as $l) {
                if ($l['id'] === $b['layanan_id']) {
                    $hargaSelesai += $l['harga'];
                }
            }
        }

        return [
            'booking_hari_ini' => count($bookings),
            'antrian'          => count($antri),
            'kapster_aktif'    => count(array_filter(self::kapsterRows(), fn ($k) => $k['aktif'])),
            'booking_selesai'  => count($selesai),
            'omzet'            => $hargaSelesai,
            'omzet_rp'         => self::rp($hargaSelesai),
        ];
    }

    /** Jumlah booking per slot jam (ribu: tidak, murni hitungan) untuk bar chart. */
    public static function bookingPerJam(): array
    {
        $slot = ['09:00' => '09', '10:00' => '10', '11:00' => '11', '13:00' => '13', '14:00' => '14', '15:00' => '15'];
        $labels = [];
        $data   = [];
        foreach ($slot as $awal => $label) {
            $labels[] = $label.'.00';
            $data[]   = count(array_filter(
                self::bookingRows(),
                fn ($b) => substr($b['jam'], 0, 2) === $label && $b['status'] !== 'batal'
            ));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Booking', 'data' => $data]],
        ];
    }

    /** Jumlah booking per layanan untuk bar chart. */
    public static function bookingPerLayanan(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::layanans() as $l) {
            $labels[] = $l['nama'];
            $data[]   = $l['jumlah_booking'];
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Booking', 'data' => $data]],
        ];
    }

    /** Distribusi status booking untuk donut chart. */
    public static function distribusiStatus(): array
    {
        $keys = ['menunggu' => 'Menunggu', 'dikerjakan' => 'Dikerjakan', 'selesai' => 'Selesai', 'batal' => 'Batal'];
        $labels = [];
        $data   = [];
        foreach ($keys as $key => $label) {
            $labels[] = $label;
            $data[]   = count(array_filter(self::bookingRows(), fn ($b) => $b['status'] === $key));
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Booking', 'data' => $data]],
        ];
    }

    /** Omzet (ribu Rp) per layanan dari booking selesai, untuk bar chart. */
    public static function omzetPerLayanan(): array
    {
        $labels = [];
        $data   = [];
        foreach (self::layananRows() as $l) {
            $total = 0;
            foreach (self::bookingRows() as $b) {
                if ($b['layanan_id'] === $l['id'] && $b['status'] === 'selesai') {
                    $total += $l['harga'];
                }
            }
            $labels[] = $l['nama'];
            $data[]   = self::rb($total);
        }

        return [
            'labels'   => $labels,
            'datasets' => [['label' => 'Omzet (ribu Rp)', 'data' => $data]],
        ];
    }

    /** Papan peringkat kapster: booking ditangani + omzet selesai. */
    public static function kapsterLeaderboard(): array
    {
        $harga = [];
        foreach (self::layananRows() as $l) {
            $harga[$l['id']] = $l['harga'];
        }
        $agg = [];
        foreach (self::kapsterRows() as $k) {
            $agg[$k['id']] = [
                'kapster'       => $k['nama'],
                'spesialisasi'  => $k['spesialisasi'],
                'rating'        => $k['rating'],
                'booking'       => 0,
                'omzet'         => 0,
            ];
        }
        foreach (self::bookingRows() as $b) {
            $agg[$b['kapster_id']]['booking']++;
            if ($b['status'] === 'selesai') {
                $agg[$b['kapster_id']]['omzet'] += $harga[$b['layanan_id']];
            }
        }
        usort($agg, fn ($a, $b) => $b['booking'] <=> $a['booking']);

        return array_map(fn ($r) => [
            'kapster'      => $r['kapster'],
            'spesialisasi' => $r['spesialisasi'],
            'rating'       => $r['rating'],
            'booking'      => $r['booking'],
            'omzet_rp'     => self::rp($r['omzet']),
        ], array_values($agg));
    }
}
