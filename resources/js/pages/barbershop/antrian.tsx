import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ListOrdered } from 'lucide-react';

interface AntrianItem {
    id: number;
    nomor: string;
    pelanggan: string;
    layanan: string;
    jam: string;
    status: ToneLabel;
}

interface PapanKapster {
    kapster: string;
    spesialisasi: string;
    antrian: Record<string, any>[];
}

export default function BarbershopAntrian({ papan }: { papan: PapanKapster[] }) {
    const total = papan.reduce((n, p) => n + p.antrian.length, 0);

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Antrian"
                description={`Papan antrian live: ${total} pelanggan menunggu atau dikerjakan, dibagi per kapster.`}
                breadcrumbs={[{ label: 'Barbershop', href: '/barbershop' }, { label: 'Antrian' }]}
            />
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                {papan.map((p) => {
                    const items: AntrianItem[] = p.antrian.map((a) => ({
                        id: Number(a.id),
                        nomor: String(a.nomor),
                        pelanggan: String(a.pelanggan),
                        layanan: String(a.layanan),
                        jam: String(a.jam),
                        status: a.status as ToneLabel,
                    }));
                    return (
                        <Card key={p.kapster} className="shadow-sm">
                            <CardHeader className="pb-3">
                                <div className="flex items-center gap-3">
                                    <Avatar className="h-9 w-9">
                                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                                            {p.kapster.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="min-w-0 flex-1">
                                        <CardTitle className="truncate text-base">{p.kapster}</CardTitle>
                                        <p className="text-muted-foreground truncate text-xs">
                                            {p.spesialisasi}
                                        </p>
                                    </div>
                                    <span className="bg-muted flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium">
                                        <ListOrdered className="h-3.5 w-3.5" />
                                        {items.length}
                                    </span>
                                </div>
                            </CardHeader>
                            <CardContent className="space-y-2">
                                {items.length === 0 && (
                                    <p className="text-muted-foreground py-4 text-center text-sm">
                                        Antrian kosong, kapster siap menerima pelanggan.
                                    </p>
                                )}
                                {items.map((a) => (
                                    <div
                                        key={a.id}
                                        className="border-border flex items-center gap-3 rounded-lg border p-2.5"
                                    >
                                        <span className="bg-primary/10 text-primary w-10 shrink-0 rounded-md py-1 text-center text-xs font-bold">
                                            {a.nomor}
                                        </span>
                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">{a.pelanggan}</p>
                                            <p className="text-muted-foreground truncate text-xs">
                                                {a.layanan} · {a.jam}
                                            </p>
                                        </div>
                                        <ToneBadge label={a.status.label} tone={a.status.tone} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    );
                })}
            </div>
        </AuthenticatedLayout>
    );
}
