import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import PaginationControls from '@/components/PaginationControls';
import EmptyState from '@/components/EmptyState';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from "@/components/ui/textarea";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { fetchPaginated, PaginationOptions } from '@/utils/api';
import { Tables } from '@/integrations/supabase/types';
import { useDashboard } from '@/contexts/DashboardContext';

const formSchema = z.object({
  student_id: z.string().min(1, { message: "Student is required" }),
  father_name: z.string().min(1, { message: "Father's name is required" }),
  mother_name: z.string().min(1, { message: "Mother's name is required" }),
  phone: z.string().min(1, { message: "Phone number is required" }),
  address: z.string().min(1, { message: "Address is required" }),
});

type FormValues = z.infer<typeof formSchema>;
type Parent = Tables<"parents">;

type StudentForDropdown = {
  id: string;
  full_name: string;
  nisn?: string;
};

const ParentsManagement = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [parents, setParents] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedParent, setSelectedParent] = useState<Parent | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [students, setStudents] = useState<StudentForDropdown[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    perPage: 10,
    searchTerm: '',
    searchFields: ['father_name', 'mother_name', 'phone'],
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  const { fetchStudents: fetchAllStudents } = useDashboard();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      student_id: '',
      father_name: '',
      mother_name: '',
      phone: '',
      address: '',
    },
  });

  const fetchStudents = async () => {
    try {
      const studentsData = await fetchAllStudents();
      const formattedStudents: StudentForDropdown[] = studentsData.map(student => ({
        id: student.id,
        full_name: student.full_name,
        nisn: student.nisn
      }));
      
      setStudents(formattedStudents);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to load students data');
    }
  };

  const fetchParents = async () => {
    try {
      setLoading(true);
      
      let query = supabase
        .from('parents')
        .select(`
          *,
          students:student_id (id, full_name, nisn)
        `, { count: 'exact' });
      
      if (pagination.searchTerm && pagination.searchFields && pagination.searchFields.length > 0) {
        const searchFilters = pagination.searchFields.map(field => `${field}.ilike.%${pagination.searchTerm}%`);
        query = query.or(searchFilters.join(","));
      }
      
      if (pagination.sortBy) {
        query = query.order(pagination.sortBy, { ascending: pagination.sortOrder === "asc" });
      } else {
        query = query.order("created_at", { ascending: false });
      }
      
      const from = (pagination.page - 1) * pagination.perPage;
      const to = from + pagination.perPage - 1;
      query = query.range(from, to);
      
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      setParents(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching parents:', error);
      toast.error('Failed to fetch parents data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  useEffect(() => {
    fetchParents();
  }, [pagination]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({
        ...prev,
        page: 1,
        searchTerm,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && selectedParent) {
        const { error } = await supabase
          .from('parents')
          .update({
            student_id: values.student_id,
            father_name: values.father_name,
            mother_name: values.mother_name,
            phone: values.phone,
            address: values.address,
          })
          .eq('id', selectedParent.id);
          
        if (error) throw error;
        
        toast.success('Parent information updated successfully');
      } else {
        const { error } = await supabase
          .from('parents')
          .insert([{
            student_id: values.student_id,
            father_name: values.father_name,
            mother_name: values.mother_name,
            phone: values.phone,
            address: values.address,
          }]);
          
        if (error) throw error;
        
        toast.success('Parent information created successfully');
      }
      
      setDialogOpen(false);
      form.reset();
      fetchParents();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save parent information');
    }
  };

  const handleEdit = (parent: Parent) => {
    setSelectedParent(parent);
    setIsEditing(true);
    
    form.reset({
      student_id: parent.student_id,
      father_name: parent.father_name,
      mother_name: parent.mother_name,
      phone: parent.phone,
      address: parent.address,
    });
    
    setDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    
    try {
      const { error } = await supabase
        .from('parents')
        .delete()
        .eq('id', confirmDeleteId);
        
      if (error) throw error;
      
      toast.success('Parent information deleted successfully');
      setDeleteDialogOpen(false);
      setConfirmDeleteId(null);
      fetchParents();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete parent information');
    }
  };

  const confirmDelete = (id: string) => {
    setConfirmDeleteId(id);
    setDeleteDialogOpen(true);
  };

  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  const formatPhone = (phone: string) => {
    if (!phone) return '-';
    
    if (phone.startsWith('0')) {
      return '+62 ' + phone.substring(1);
    } else if (phone.startsWith('62')) {
      return '+' + phone;
    } else if (phone.startsWith('+62')) {
      return phone;
    }
    
    return phone;
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader 
              title="Data Orangtua"
              subtitle="Kelola data orangtua siswa"
              actionLabel="Tambah Data Orangtua"
              onAction={() => {
                setIsEditing(false);
                setSelectedParent(null);
                form.reset();
                setDialogOpen(true);
              }}
              breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Data Orangtua' }
              ]}
            />
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Cari nama orangtua, siswa..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <Button className="gap-2" onClick={() => {
                setIsEditing(false);
                setSelectedParent(null);
                form.reset();
                setDialogOpen(true);
              }}>
                <Plus className="h-4 w-4" />
                Tambah Data Orangtua
              </Button>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : parents.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Nama Siswa</TableHead>
                        <TableHead>Nama Ayah</TableHead>
                        <TableHead>Nama Ibu</TableHead>
                        <TableHead>No. Telepon</TableHead>
                        <TableHead>Alamat</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {parents.map((parent, index) => (
                        <TableRow key={parent.id}>
                          <TableCell>{(pagination.page - 1) * pagination.perPage + index + 1}</TableCell>
                          <TableCell>
                            {(parent.students as any)?.full_name || '-'}
                            {(parent.students as any)?.nisn ? ` (${(parent.students as any).nisn})` : ''}
                          </TableCell>
                          <TableCell>{parent.father_name}</TableCell>
                          <TableCell>{parent.mother_name}</TableCell>
                          <TableCell>{formatPhone(parent.phone)}</TableCell>
                          <TableCell className="max-w-[200px] truncate" title={parent.address}>
                            {parent.address}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleEdit(parent)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="icon"
                                onClick={() => confirmDelete(parent.id)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState
                    title="Belum ada data orangtua"
                    description="Tambahkan data orangtua baru untuk memulai"
                    actionLabel="Tambah Data Orangtua"
                    onAction={() => {
                      setIsEditing(false);
                      form.reset();
                      setDialogOpen(true);
                    }}
                  />
                )}
              </div>
              
              {parents.length > 0 && (
                <div className="p-4">
                  <PaginationControls 
                    currentPage={pagination.page}
                    totalPages={Math.ceil(totalCount / pagination.perPage)}
                    onPageChange={handlePageChange}
                  />
                </div>
              )}
            </div>
          </div>
        </main>
      </div>
      
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Data Orangtua' : 'Tambah Data Orangtua Baru'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Edit informasi orangtua siswa' 
                : 'Isi formulir berikut untuk menambahkan data orangtua siswa'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="student_id"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Siswa</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Pilih siswa" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {students.map(student => (
                          <SelectItem key={student.id} value={student.id}>
                            {student.full_name} {student.nisn ? `(${student.nisn})` : ''}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="father_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ayah</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap ayah" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="mother_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Ibu</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap ibu" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nomor Telepon</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Contoh: 08123456789" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Alamat</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Alamat lengkap" 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter>
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => {
                    setDialogOpen(false);
                    form.reset();
                  }}
                >
                  Batal
                </Button>
                <Button type="submit" disabled={form.formState.isSubmitting}>
                  {form.formState.isSubmitting && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
                  {isEditing ? 'Simpan Perubahan' : 'Tambahkan'}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
      
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data orangtua ini? 
              Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => {
                setDeleteDialogOpen(false);
                setConfirmDeleteId(null);
              }}
            >
              Batal
            </Button>
            <Button 
              variant="destructive" 
              onClick={handleDelete}
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ParentsManagement;
