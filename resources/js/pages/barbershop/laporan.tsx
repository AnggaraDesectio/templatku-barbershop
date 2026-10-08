import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, DonutChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, ListOrdered, Star, Wallet } from 'lucide-react';

interface Leaderboard {
    kapster: string;
    spesialisasi: string;
    rating: number;
    booking: number;
    omzet_rp: string;
}

interface Ringkasan {
    booking_hari_ini: number;
    antrian: number;
    kapster_aktif: number;
    omzet_rp: string;
}

export default function BarbershopLaporan({
    ringkasan,
    perJam,
    perLayanan,
    distribusi,
    omzet,
    leaderboard,
}: {
    ringkasan: Ringkasan;
    perJam: ChartData;
    perLayanan: ChartData;
    distribusi: ChartData;
    omzet: ChartData;
    leaderboard: Record<string, any>[];
}) {
    const rows: Leaderboard[] = leaderboard.map((l) => ({
        kapster: String(l.kapster),
        spesialisasi: String(l.spesialisasi),
        rating: Number(l.rating),
        booking: Number(l.booking),
        omzet_rp: String(l.omzet_rp),
    }));

    const columns: Column<Leaderboard & { id: number }>[] = [
        { key: 'kapster', header: 'Kapster', sortValue: (r) => r.kapster },
        { key: 'spesialisasi', header: 'Spesialisasi', mobileHidden: true, sortValue: (r) => r.spesialisasi },
        {
            key: 'rating',
            header: 'Rating',
            render: (r) => <span className="tnum font-medium">{r.rating.toFixed(1)}</span>,
            sortValue: (r) => r.rating,
        },
        {
            key: 'booking',
            header: 'Booking',
            render: (r) => <span className="tnum font-medium">{r.booking}</span>,
            sortValue: (r) => r.booking,
        },
        {
            key: 'omzet_rp',
            header: 'Omzet',
            render: (r) => <span className="tnum font-medium">{r.omzet_rp}</span>,
            sortValue: (r) => r.omzet_rp,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Laporan"
                description="Analisis booking, omzet, dan performa kapster barbershop."
                breadcrumbs={[{ label: 'Barbershop', href: '/barbershop' }, { label: 'Laporan' }]}
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard label="Booking Hari Ini" value={String(ringkasan.booking_hari_ini)} delta="termasuk yang batal" trend="flat" icon={CalendarCheck} hint="Total janji potong hari ini, termasuk yang dibatalkan." />
                <StatCard label="Antrian Berjalan" value={String(ringkasan.antrian)} delta="menunggu & dikerjakan" trend="flat" icon={ListOrdered} hint="Pelanggan yang masih dalam proses layanan." />
                <StatCard label="Kapster Aktif" value={String(ringkasan.kapster_aktif)} delta="dari 5 kapster" trend="flat" icon={Star} hint="Kapster yang melayani hari ini dari total tim." />
                <StatCard label="Omzet Hari Ini" value={ringkasan.omzet_rp} delta="dari booking selesai" trend="up" icon={Wallet} hint="Pendapatan kotor dari layanan yang selesai." />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Booking per Jam</CardTitle>
                        <p className="text-muted-foreground text-sm">Jam-jam tersibuk hari ini.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={perJam} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Booking per Layanan</CardTitle>
                        <p className="text-muted-foreground text-sm">Layanan yang paling banyak dipesan.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={perLayanan} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Distribusi Status Booking</CardTitle>
                        <p className="text-muted-foreground text-sm">Proporsi status semua booking.</p>
                    </CardHeader>
                    <CardContent>
                        <DonutChartCard data={distribusi} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Omzet per Layanan</CardTitle>
                        <p className="text-muted-foreground text-sm">Omzet booking selesai dalam ribu rupiah.</p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={omzet} />
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows.map((r, i) => ({ ...r, id: i }))}
                    searchKeys={['kapster', 'spesialisasi']}
                    emptyTitle="Belum ada data"
                    emptyDescription="Data performa kapster akan tampil di sini."
                />
            </div>
        </AuthenticatedLayout>
    );
}
