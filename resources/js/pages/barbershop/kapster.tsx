import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Star } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

interface Kapster {
    id: number;
    nama: string;
    spesialisasi: string;
    rating: number;
    telepon: string;
    pengalaman: string;
    status: ToneLabel;
    booking_ditangani: number;
}

export default function BarbershopKapster({ kapsters }: { kapsters: Record<string, any>[] }) {

    const [rows, setRows] = useState(kapsters.map((k) => ({
        id: Number(k.id),
        nama: String(k.nama),
        spesialisasi: String(k.spesialisasi),
        rating: Number(k.rating),
        telepon: String(k.telepon),
        pengalaman: String(k.pengalaman),
        status: k.status as ToneLabel,
        booking_ditangani: Number(k.booking_ditangani),
    })));
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Kapster | null>(null);
    const [nama, setNama] = useState('');
    const [spesialisasi, setSpesialisasi] = useState('');
    const [telepon, setTelepon] = useState('');
    const [pengalaman, setPengalaman] = useState('');
    const [aktif, setAktif] = useState('Aktif');

    const openAdd = () => {
        setEditing(null);
        setNama('');
        setSpesialisasi('');
        setTelepon('');
        setPengalaman('');
        setAktif('Aktif');
        setOpen(true);
    };

    const openEdit = (row: Kapster) => {
        setEditing(row);
        setNama(row.nama);
        setSpesialisasi(row.spesialisasi);
        setTelepon(row.telepon);
        setPengalaman(row.pengalaman);
        setAktif(row.status.label);
        setOpen(true);
    };

    const simpan = () => {
        if (!nama.trim()) {
            toast.error('Isi nama kapster dulu.');
            return;
        }
        const status: ToneLabel = {
            label: aktif,
            tone: aktif === 'Aktif' ? 'success' : 'info',
        };
        const payload = {
            nama: nama.trim(),
            spesialisasi: spesialisasi.trim() || 'Potong',
            telepon: telepon.trim() || '-',
            pengalaman: pengalaman.trim() || '-',
            status,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Data ${nama.trim()} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, rating: 5.0, booking_ditangani: 0, ...payload }, ...rs]);
            toast.success(`${nama.trim()} bergabung sebagai kapster.`);
        }
        setOpen(false);
    };

    const columns: Column<Kapster>[] = [
        {
            key: 'nama',
            header: 'Kapster',
            render: (r) => (
                <div className="flex items-center gap-2.5">
                    <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary/10 text-primary text-xs">
                            {r.nama.split(' ').slice(0, 2).map((n) => n[0]).join('')}
                        </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{r.nama}</span>
                </div>
            ),
            sortValue: (r) => r.nama,
        },
        { key: 'spesialisasi', header: 'Spesialisasi', sortValue: (r) => r.spesialisasi },
        {
            key: 'rating',
            header: 'Rating',
            render: (r) => (
                <span className="inline-flex items-center gap-1 font-medium">
                    <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                    {r.rating.toFixed(1)}
                </span>
            ),
            sortValue: (r) => r.rating,
        },
        { key: 'telepon', header: 'Telepon', mobileHidden: true },
        { key: 'pengalaman', header: 'Pengalaman', mobileHidden: true, sortValue: (r) => r.pengalaman },
        {
            key: 'booking_ditangani',
            header: 'Booking',
            render: (r) => <span className="tnum font-medium">{r.booking_ditangani}</span>,
            sortValue: (r) => r.booking_ditangani,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Kapster"
                description="Tim di balik kursi cukur, spesialisasi dan rating dari pelanggan."
                breadcrumbs={[{ label: 'Barbershop', href: '/barbershop' }, { label: 'Kapster' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Kapster
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Kapster</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'spesialisasi']}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada kapster"
                        emptyDescription="Tambahkan kapster pertama lewat tombol Tambah Kapster."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Kapster' : 'Tambah Kapster Baru'}</DialogTitle>
                        <DialogDescription>
                            Catat data kapster, rating terisi otomatis dari ulasan pelanggan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="kps-nama">Nama kapster</Label>
                            <Input
                                id="kps-nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="cth. Bang Joni"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="kps-spes">Spesialisasi</Label>
                                <Input
                                    id="kps-spes"
                                    value={spesialisasi}
                                    onChange={(e) => setSpesialisasi(e.target.value)}
                                    placeholder="cth. Fade, coloring"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kps-peng">Pengalaman</Label>
                                <Input
                                    id="kps-peng"
                                    value={pengalaman}
                                    onChange={(e) => setPengalaman(e.target.value)}
                                    placeholder="cth. 5 tahun"
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="kps-telp">Telepon</Label>
                                <Input
                                    id="kps-telp"
                                    inputMode="tel"
                                    value={telepon}
                                    onChange={(e) => setTelepon(e.target.value)}
                                    placeholder="08xx…"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="kps-status">Status</Label>
                                <Select value={aktif} onValueChange={setAktif}>
                                    <SelectTrigger id="kps-status">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Aktif">Aktif</SelectItem>
                                        <SelectItem value="Nonaktif">Nonaktif</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Tambah Kapster'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
