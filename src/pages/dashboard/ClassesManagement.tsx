
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
import { Loader2, Plus, Search, Edit, Trash2 } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { fetchPaginated, PaginationOptions } from '@/utils/api';
import { Tables } from '@/integrations/supabase/types';

// Define the form schema
const formSchema = z.object({
  name: z.string().min(1, { message: "Class name is required" }),
});

type FormValues = z.infer<typeof formSchema>;
type Class = Tables<"classes">;

const ClassesManagement = () => {
  // States
  const [loading, setLoading] = useState<boolean>(true);
  const [classes, setClasses] = useState<Class[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedClass, setSelectedClass] = useState<Class | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    perPage: 10,
    searchTerm: '',
    searchFields: ['name'],
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
    },
  });

  // Fetch classes with pagination
  const fetchClasses = async () => {
    try {
      setLoading(true);
      const result = await fetchPaginated<Class>('classes', pagination);
      setClasses(result.data);
      setTotalCount(result.count);
    } catch (error) {
      console.error('Error fetching classes:', error);
      toast.error('Failed to fetch classes');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial load and when pagination changes
  useEffect(() => {
    fetchClasses();
  }, [pagination]);

  // Handle search with debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setPagination(prev => ({
        ...prev,
        page: 1, // Reset to first page when searching
        searchTerm,
      }));
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  // Create new class
  const onSubmit = async (values: FormValues) => {
    try {
      if (isEditing && selectedClass) {
        // Update existing class
        const { error } = await supabase
          .from('classes')
          .update({ name: values.name })
          .eq('id', selectedClass.id);
          
        if (error) throw error;
        
        toast.success('Class updated successfully');
      } else {
        // Create new class
        const { error } = await supabase
          .from('classes')
          .insert([{ name: values.name }]);
          
        if (error) throw error;
        
        toast.success('Class created successfully');
      }
      
      // Close dialog and refresh data
      setDialogOpen(false);
      form.reset();
      fetchClasses();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save class');
    }
  };

  // Handle edit
  const handleEdit = (classItem: Class) => {
    setSelectedClass(classItem);
    setIsEditing(true);
    form.setValue('name', classItem.name);
    setDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    
    try {
      const { error } = await supabase
        .from('classes')
        .delete()
        .eq('id', confirmDeleteId);
        
      if (error) throw error;
      
      toast.success('Class deleted successfully');
      setDeleteDialogOpen(false);
      setConfirmDeleteId(null);
      fetchClasses();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete class');
    }
  };

  // Open delete confirmation dialog
  const confirmDelete = (id: string) => {
    setConfirmDeleteId(id);
    setDeleteDialogOpen(true);
  };

  // Handle page change
  const handlePageChange = (page: number) => {
    setPagination(prev => ({ ...prev, page }));
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader 
              title="Data Kelas"
              subtitle="Kelola data kelas di sekolah"
              actionLabel="Tambah Kelas"
              onAction={() => {
                setIsEditing(false);
                setSelectedClass(null);
                form.reset();
                setDialogOpen(true);
              }}
              breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Data Kelas' }
              ]}
            />
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Cari kelas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : classes.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Nama Kelas</TableHead>
                        <TableHead>Tanggal Dibuat</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {classes.map((classItem, index) => (
                        <TableRow key={classItem.id}>
                          <TableCell>{(pagination.page - 1) * pagination.perPage + index + 1}</TableCell>
                          <TableCell>{classItem.name}</TableCell>
                          <TableCell>
                            {classItem.created_at 
                              ? format(new Date(classItem.created_at), 'dd/MM/yyyy HH:mm') 
                              : '-'}
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-2">
                              <Button 
                                variant="outline" 
                                size="icon"
                                onClick={() => handleEdit(classItem)}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="destructive" 
                                size="icon"
                                onClick={() => confirmDelete(classItem.id)}
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
                    title="Belum ada data kelas"
                    description="Tambahkan kelas baru untuk memulai"
                    actionLabel="Tambah Kelas"
                    onAction={() => {
                      setIsEditing(false);
                      form.reset();
                      setDialogOpen(true);
                    }}
                  />
                )}
              </div>
              
              {classes.length > 0 && (
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
      
      {/* Create/Edit Dialog */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Kelas' : 'Tambah Kelas Baru'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Edit detail kelas yang sudah ada' 
                : 'Isi formulir berikut untuk menambahkan kelas baru'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nama Kelas</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Contoh: X-A" 
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
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Konfirmasi Hapus</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus kelas ini? 
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

export default ClassesManagement;
