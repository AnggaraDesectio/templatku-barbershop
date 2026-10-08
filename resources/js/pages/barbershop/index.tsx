import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { StatCard } from '@/components/stat-card';
import { BarChartCard, type ChartData } from '@/components/charts';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CalendarCheck, ListOrdered, Users, Wallet, CalendarPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@inertiajs/react';

interface Antrian {
    id: number;
    nomor: string;
    pelanggan: string;
    layanan: string;
    kapster: string;
    jam: string;
    status: ToneLabel;
}

interface Ringkasan {
    booking_hari_ini: number;
    antrian: number;
    kapster_aktif: number;
    booking_selesai: number;
    omzet_rp: string;
}

export default function BarbershopIndex({
    ringkasan,
    chart,
    antrian,
}: {
    ringkasan: Ringkasan;
    chart: ChartData;
    antrian: Record<string, any>[];
}) {
    const rows: Antrian[] = antrian.map((a) => ({
        id: Number(a.id),
        nomor: String(a.nomor),
        pelanggan: String(a.pelanggan),
        layanan: String(a.layanan),
        kapster: String(a.kapster),
        jam: String(a.jam),
        status: a.status as ToneLabel,
    }));

    const columns: Column<Antrian>[] = [
        { key: 'nomor', header: 'No', sortValue: (r) => r.nomor },
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        { key: 'layanan', header: 'Layanan', mobileHidden: true, sortValue: (r) => r.layanan },
        { key: 'kapster', header: 'Kapster', sortValue: (r) => r.kapster },
        { key: 'jam', header: 'Jam', sortValue: (r) => r.jam },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Dashboard"
                description="Ringkasan operasional barbershop GANTENG hari ini."
                breadcrumbs={[{ label: 'Barbershop' }]}
                actions={
                    <Button size="sm" asChild>
                        <Link href="/barbershop/booking">
                            <CalendarPlus className="mr-2 h-4 w-4" /> Booking Baru
                        </Link>
                    </Button>
                }
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Booking Hari Ini"
                    value={String(ringkasan.booking_hari_ini)}
                    delta={`${ringkasan.booking_selesai} selesai`}
                    trend="up"
                    icon={CalendarCheck}
                    hint="Janji potong yang masuk untuk hari ini."
                />
                <StatCard
                    label="Antrian Berjalan"
                    value={String(ringkasan.antrian)}
                    delta="menunggu & dikerjakan"
                    trend="flat"
                    icon={ListOrdered}
                    hint="Pelanggan yang sedang menunggu atau dicukur sekarang."
                />
                <StatCard
                    label="Kapster Aktif"
                    value={String(ringkasan.kapster_aktif)}
                    delta="siap melayani"
                    trend="flat"
                    icon={Users}
                    hint="Kapster yang masuk shift dan bisa menerima pelanggan."
                />
                <StatCard
                    label="Omzet Hari Ini"
                    value={ringkasan.omzet_rp}
                    delta="dari booking selesai"
                    trend="up"
                    icon={Wallet}
                    hint="Pendapatan dari cukuran yang selesai hari ini."
                />
            </div>
            <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
                <Card className="shadow-sm xl:col-span-2">
                    <CardHeader>
                        <CardTitle className="text-base">Booking per Jam</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Sebaran booking hari ini per slot jam.
                        </p>
                    </CardHeader>
                    <CardContent>
                        <BarChartCard data={chart} />
                    </CardContent>
                </Card>
                <Card className="shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-base">Antrian Terdepan</CardTitle>
                        <p className="text-muted-foreground text-sm">
                            Pelanggan yang sedang menunggu atau dikerjakan.
                        </p>
                    </CardHeader>
                    <CardContent className="space-y-3">
                        {rows.map((a) => (
                            <div key={a.id} className="flex items-center gap-3">
                                <span className="bg-primary/10 text-primary w-10 shrink-0 rounded-lg py-1 text-center text-xs font-bold">
                                    {a.nomor}
                                </span>
                                <div className="min-w-0 flex-1">
                                    <p className="truncate text-sm font-medium">{a.pelanggan}</p>
                                    <p className="text-muted-foreground truncate text-xs">
                                        {a.layanan} · {a.kapster} · {a.jam}
                                    </p>
                                </div>
                                <ToneBadge label={a.status.label} tone={a.status.tone} />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </div>
            <div className="mt-4">
                <DataTable
                    columns={columns}
                    rows={rows}
                    searchKeys={['pelanggan', 'layanan', 'kapster']}
                    emptyTitle="Antrian kosong"
                    emptyDescription="Belum ada pelanggan dalam antrian."
                />
            </div>
        </AuthenticatedLayout>
    );
}
