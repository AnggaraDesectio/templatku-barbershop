import { useState } from 'react';
import AuthenticatedLayout from '@/layouts/authenticated-layout';
import { PageHeader } from '@/components/page-header';
import { DataTable, type Column, type FilterOption } from '@/components/data-table';
import { ToneBadge, type ToneLabel } from '@/components/tone-badge';
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

interface Booking {
    id: number;
    pelanggan: string;
    layanan: string;
    kapster: string;
    jam: string;
    harga_rp: string;
    status: ToneLabel;
}

const rupiah = (n: number) => `Rp ${n.toLocaleString('id-ID')}`;

const statusTone = (s: string): ToneLabel['tone'] =>
    s === 'Selesai' ? 'success' : s === 'Batal' ? 'destructive' : s === 'Dikerjakan' ? 'info' : 'warning';

const STATUS = ['Menunggu', 'Dikerjakan', 'Selesai', 'Batal'];

export default function BarbershopBooking({ bookings }: { bookings: Record<string, any>[] }) {
    const [rows, setRows] = useState<Booking[]>(
        bookings.map((b) => ({
            id: Number(b.id),
            pelanggan: String(b.pelanggan),
            layanan: String(b.layanan),
            kapster: String(b.kapster),
            jam: String(b.jam),
            harga_rp: String(b.harga_rp),
            status: b.status as ToneLabel,
        })),
    );
    const [open, setOpen] = useState(false);
    const [editing, setEditing] = useState<Booking | null>(null);
    const [pelanggan, setPelanggan] = useState('');
    const [layanan, setLayanan] = useState('');
    const [kapster, setKapster] = useState('');
    const [jam, setJam] = useState('');
    const [harga, setHarga] = useState('');
    const [status, setStatus] = useState('Menunggu');

    const layananOpts = Array.from(new Set(rows.map((r) => r.layanan)));
    const kapsterOpts = Array.from(new Set(rows.map((r) => r.kapster)));

    const openAdd = () => {
        setEditing(null);
        setPelanggan('');
        setLayanan(layananOpts[0] ?? '');
        setKapster(kapsterOpts[0] ?? '');
        setJam('');
        setHarga('');
        setStatus('Menunggu');
        setOpen(true);
    };

    const openEdit = (row: Booking) => {
        setEditing(row);
        setPelanggan(row.pelanggan);
        setLayanan(row.layanan);
        setKapster(row.kapster);
        setJam(row.jam);
        setHarga(row.harga_rp.replace(/[^0-9]/g, ''));
        setStatus(row.status.label);
        setOpen(true);
    };

    const simpan = () => {
        const hargaNum = Number(harga.replace(/[^0-9]/g, ''));
        if (!pelanggan.trim() || !layanan.trim() || !jam.trim()) {
            toast.error('Lengkapi nama pelanggan, layanan, dan jam.');
            return;
        }
        const payload = {
            pelanggan: pelanggan.trim(),
            layanan: layanan.trim(),
            kapster: kapster.trim() || '-',
            jam: jam.trim(),
            harga_rp: hargaNum ? rupiah(hargaNum) : 'Rp 0',
            status: { label: status, tone: statusTone(status) } as ToneLabel,
        };
        if (editing) {
            setRows((rs) => rs.map((r) => (r.id === editing.id ? { ...r, ...payload } : r)));
            toast.success(`Booking ${pelanggan.trim()} diperbarui.`);
        } else {
            const id = Math.max(0, ...rows.map((r) => r.id)) + 1;
            setRows((rs) => [{ id, ...payload }, ...rs]);
            toast.success(`${pelanggan.trim()} terjadwal pukul ${jam.trim()}.`);
        }
        setOpen(false);
    };

    const columns: Column<Booking>[] = [
        { key: 'pelanggan', header: 'Pelanggan', sortValue: (r) => r.pelanggan },
        { key: 'layanan', header: 'Layanan', sortValue: (r) => r.layanan },
        { key: 'kapster', header: 'Kapster', sortValue: (r) => r.kapster },
        { key: 'jam', header: 'Jam', sortValue: (r) => r.jam },
        {
            key: 'harga_rp',
            header: 'Harga',
            render: (r) => <span className="tnum font-medium">{r.harga_rp}</span>,
            sortValue: (r) => r.harga_rp,
        },
        {
            key: 'status',
            header: 'Status',
            render: (r) => <ToneBadge label={r.status.label} tone={r.status.tone} />,
        },
    ];

    const filters: FilterOption[] = [
        {
            key: 'status',
            label: 'Status',
            options: STATUS.map((s) => ({ value: s, label: s })),
            match: (row: any, value: string) => row.status.label === value,
        },
    ];

    return (
        <AuthenticatedLayout>
            <PageHeader
                title="Booking"
                description="Jadwal potong hari ini, siapa, jam berapa, dikerjakan siapa."
                breadcrumbs={[{ label: 'Barbershop', href: '/barbershop' }, { label: 'Booking' }]}
                actions={
                    <Button size="sm" onClick={openAdd}>
                        <Plus className="mr-2 h-4 w-4" /> Tambah Booking
                    </Button>
                }
            />
            <Card className="shadow-sm">
                <CardHeader>
                    <CardTitle className="text-base">Semua Booking</CardTitle>
                </CardHeader>
                <CardContent>
                    <DataTable
                        columns={columns}
                        rows={rows}
                        searchKeys={['pelanggan', 'layanan', 'kapster']}
                        filters={filters}
                        pageSize={10}
                        onEdit={openEdit}
                        emptyTitle="Belum ada booking"
                        emptyDescription="Catat booking pertama lewat tombol Tambah Booking, pelanggan langsung masuk antrian."
                    />
                </CardContent>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>{editing ? 'Ubah Booking' : 'Booking Baru'}</DialogTitle>
                        <DialogDescription>
                            Catat janji potong pelanggan beserta kapster yang mengerjakan.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="bkg-nama">Nama pelanggan</Label>
                            <Input
                                id="bkg-nama"
                                value={pelanggan}
                                onChange={(e) => setPelanggan(e.target.value)}
                                placeholder="cth. Dimas"
                            />
                        </div>
                        <div className="col-span-2 space-y-2 sm:col-span-1">
                            <Label htmlFor="bkg-jam">Jam</Label>
                            <Input
                                id="bkg-jam"
                                type="time"
                                value={jam}
                                onChange={(e) => setJam(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bkg-layanan">Layanan</Label>
                            <Select value={layanan} onValueChange={setLayanan}>
                                <SelectTrigger id="bkg-layanan">
                                    <SelectValue placeholder="Pilih layanan" />
                                </SelectTrigger>
                                <SelectContent>
                                    {layananOpts.map((l) => (
                                        <SelectItem key={l} value={l}>
                                            {l}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bkg-kapster">Kapster</Label>
                            <Select value={kapster} onValueChange={setKapster}>
                                <SelectTrigger id="bkg-kapster">
                                    <SelectValue placeholder="Pilih kapster" />
                                </SelectTrigger>
                                <SelectContent>
                                    {kapsterOpts.map((k) => (
                                        <SelectItem key={k} value={k}>
                                            {k}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bkg-harga">Harga (Rp)</Label>
                            <Input
                                id="bkg-harga"
                                inputMode="numeric"
                                value={harga}
                                onChange={(e) => setHarga(e.target.value)}
                                placeholder="50000"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="bkg-status">Status</Label>
                            <Select value={status} onValueChange={setStatus}>
                                <SelectTrigger id="bkg-status">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {STATUS.map((s) => (
                                        <SelectItem key={s} value={s}>
                                            {s}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setOpen(false)}>
                            Batal
                        </Button>
                        <Button onClick={simpan}>{editing ? 'Simpan Perubahan' : 'Tambah Booking'}</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </AuthenticatedLayout>
    );
}
