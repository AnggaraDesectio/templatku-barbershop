import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
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
import { Plus } from 'lucide-react';
import { toast } from 'sonner';

interface Layanan {
    id: number;
    nama: string;
    kategori: string;
    harga: number;
    harga_rp: string;
    durasi: string;
    jumlah_booking: number;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const KATEGORI = ['Potong', 'Cukur', 'Perawatan', 'Coloring', 'Paket'];

export default function BarbershopLayanan({ layanans }: { layanans: Record<string, any>[] }) {
    const [rows, setRows] = useState<Layanan[]>(
        layanans.map((l) => ({
            id: Number(l.id),
            nama: String(l.nama),
            kategori: String(l.kategori),
            harga: Number(String(l.harga_rp).replace(/[^0-9]/g, '')) || 0,
            harga_rp: String(l.harga_rp),
            durasi: String(l.durasi),
            jumlah_booking: Number(l.jumlah_booking),
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Layanan | null>(null);
    const [nama, setNama] = useState('');
    const [kategori, setKategori] = useState('Potong');
    const [harga, setHarga] = useState('');
    const [durasi, setDurasi] = useState('30 menit');

    const openAdd = () => {
        setEditing(null);
        setNama('');
        setKategori('Potong');
        setHarga('');
        setDurasi('30 menit');
        setOpen(true);
    };

    const openEdit = (row: Layanan) => {
        setEditing(row);
        setNama(row.nama);
        setKategori(row.kategori);
        setHarga(String(row.harga));
        setDurasi(row.durasi);
        setOpen(true);
    };

    const simpan = () => {
        const hargaNum = Number(harga.replace(/[^0-9]/g, ''));
        if (!nama.trim() || !hargaNum) {
            toast.error('Lengkapi nama layanan dan harga.');
            return;
        }
        const payload = {
            nama: nama.trim(),
            kategori,
            harga: hargaNum,
            harga_rp: rupiah(hargaNum),
            durasi: durasi.trim() || '30 menit',
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Layanan "${nama.trim()}" diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, jumlah_booking: 0, ...payload }, ...rs]);
            toast.success(`Layanan "${nama.trim()}" ditambahkan.`);
        }
        setOpen(false);
    };

    const columns: Column<Layanan>[] = [
        { key: 'nama', header: 'Layanan', sortValue: (r) => r.nama },
        { key: 'kategori', header: 'Kategori', sortValue: (r) => r.kategori },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga,
        },
        { key: 'durasi', header: 'Durasi', sortValue: (r) => r.durasi },
        {
            key: 'jumlah_booking',
            header: 'Booking Hari Ini',
            render: (r) => <span className="tnum font-medium">{r.jumlah_booking}</span>,
            sortValue: (r) => r.jumlah_booking,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'kategori',
            label: 'Kategori',
            options: KATEGORI.map((k) => ({ value: k, label: k })),
            match: (row: any, value: string) => row.kategori === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Paket Layanan"
                description="Menu cukur yang ditawarkan, harga dan durasi jelas biar pelanggan tidak tanya-tanya."
                breadcrumbs={[{ label: 'Barbershop', href: '/barbershop' }, { label: 'Paket Layanan' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Layanan
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Layanan</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['nama', 'kategori']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada layanan"
                        emptyDescription="Tambahkan layanan pertama lewat tombol Tambah Layanan, tentukan harga dan durasinya."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Layanan' : 'Tambah Layanan Baru'}</DialogTitle>
                        <DialogDescription>
                            Tentukan nama, kategori, harga, dan durasi pengerjaan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label htmlFor="lyn-nama">Nama layanan</Label>
                            <Input
                                id="lyn-nama"
                                value={nama}
                                onChange={(e) => setNama(e.target.value)}
                                placeholder="cth. Potong + Cuci"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label htmlFor="lyn-kat">Kategori</Label>
                                <Select value={kategori} onValueChange={setKategori}>
                                    <SelectTrigger id="lyn-kat">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        {KATEGORI.map((k) => (
                                            <SelectItem key={k} value={k}>
                                                {k}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="lyn-durasi">Durasi</Label>
                                <Input
                                    id="lyn-durasi"
                                    value={durasi}
                                    onChange={(e) => setDurasi(e.target.value)}
                                    placeholder="30 menit"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lyn-harga">Harga (Rp)</Label>
                            <Input
                                id="lyn-harga"
                                inputMode="numeric"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                placeholder="50000"
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Tambah Layanan'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
