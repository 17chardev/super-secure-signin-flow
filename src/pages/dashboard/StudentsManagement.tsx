
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import DashboardSidebar from '@/components/DashboardSidebar';
import DashboardHeader from '@/components/DashboardHeader';
import PaginationControls from '@/components/PaginationControls';
import EmptyState from '@/components/EmptyState';
import ImageUpload from '@/components/ImageUpload';
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2, Plus, Search, Edit, Trash2, FileDown } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { fetchPaginated, PaginationOptions } from '@/utils/api';
import { Tables } from '@/integrations/supabase/types';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// Define the form schema
const formSchema = z.object({
  full_name: z.string().min(1, { message: "Full name is required" }),
  nisn: z.string().min(1, { message: "NISN is required" }),
  birth_date: z.string().min(1, { message: "Birth date is required" }),
  major_id: z.string().min(1, { message: "Major is required" }),
  class_id: z.string().min(1, { message: "Class is required" }),
  batch_id: z.string().min(1, { message: "Batch is required" }),
  image: z.object({
    id: z.string().optional(),
    url: z.string().optional(),
  }).optional(),
});

type FormValues = z.infer<typeof formSchema>;
type Student = Tables<"students">;
type Major = Tables<"majors">;
type Class = Tables<"classes">;
type Batch = Tables<"batches">;

const StudentsManagement = () => {
  // States
  const [loading, setLoading] = useState<boolean>(true);
  const [students, setStudents] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState<boolean>(false);
  const [selectedStudent, setSelectedStudent] = useState<Student | null>(null);
  const [confirmDeleteId, setConfirmDeleteId] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [majors, setMajors] = useState<Major[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);
  const [batches, setBatches] = useState<Batch[]>([]);
  const [pagination, setPagination] = useState<PaginationOptions>({
    page: 1,
    perPage: 10,
    searchTerm: '',
    searchFields: ['full_name', 'nisn'],
    sortBy: 'created_at',
    sortOrder: 'desc',
  });

  // Initialize form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      full_name: '',
      nisn: '',
      birth_date: '',
      major_id: '',
      class_id: '',
      batch_id: '',
      image: undefined,
    },
  });

  // Fetch reference data (majors, classes, batches)
  const fetchReferenceData = async () => {
    try {
      // Fetch majors
      const { data: majorsData, error: majorsError } = await supabase
        .from('majors')
        .select('*')
        .order('name');
        
      if (majorsError) throw majorsError;
      setMajors(majorsData);

      // Fetch classes
      const { data: classesData, error: classesError } = await supabase
        .from('classes')
        .select('*')
        .order('name');
        
      if (classesError) throw classesError;
      setClasses(classesData);

      // Fetch batches
      const { data: batchesData, error: batchesError } = await supabase
        .from('batches')
        .select('*')
        .order('year', { ascending: false });
        
      if (batchesError) throw batchesError;
      setBatches(batchesData);
    } catch (error) {
      console.error('Error fetching reference data:', error);
      toast.error('Failed to load reference data');
    }
  };

  // Fetch students with pagination and join relations
  const fetchStudents = async () => {
    try {
      setLoading(true);
      
      // Build the query with joins
      let query = supabase
        .from('students')
        .select(`
          *,
          majors:major_id (name),
          classes:class_id (name),
          batches:batch_id (year),
          images:image_id (url)
        `, { count: 'exact' });
      
      // Apply search if provided
      if (pagination.searchTerm && pagination.searchFields && pagination.searchFields.length > 0) {
        const searchFilters = pagination.searchFields.map(field => `${field}.ilike.%${pagination.searchTerm}%`);
        query = query.or(searchFilters.join(","));
      }
      
      // Apply sorting
      if (pagination.sortBy) {
        query = query.order(pagination.sortBy, { ascending: pagination.sortOrder === "asc" });
      } else {
        // Default sort by created_at
        query = query.order("created_at", { ascending: false });
      }
      
      // Apply pagination
      const from = (pagination.page - 1) * pagination.perPage;
      const to = from + pagination.perPage - 1;
      query = query.range(from, to);
      
      // Execute query
      const { data, error, count } = await query;
      
      if (error) throw error;
      
      setStudents(data || []);
      setTotalCount(count || 0);
    } catch (error) {
      console.error('Error fetching students:', error);
      toast.error('Failed to fetch students');
    } finally {
      setLoading(false);
    }
  };

  // Fetch on initial load and when pagination changes
  useEffect(() => {
    fetchReferenceData();
  }, []);

  useEffect(() => {
    fetchStudents();
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

  // Create or update student
  const onSubmit = async (values: FormValues) => {
    try {
      // Process the image data
      let image_id = undefined;
      if (values.image && values.image.id) {
        image_id = values.image.id;
      }

      const studentData = {
        full_name: values.full_name,
        nisn: values.nisn,
        birth_date: values.birth_date,
        major_id: values.major_id,
        class_id: values.class_id,
        batch_id: values.batch_id,
        image_id,
      };

      if (isEditing && selectedStudent) {
        // Update existing student
        const { error } = await supabase
          .from('students')
          .update(studentData)
          .eq('id', selectedStudent.id);
          
        if (error) throw error;
        
        toast.success('Student updated successfully');
      } else {
        // Create new student
        const { error } = await supabase
          .from('students')
          .insert([studentData]);
          
        if (error) throw error;
        
        toast.success('Student created successfully');
      }
      
      // Close dialog and refresh data
      setDialogOpen(false);
      form.reset();
      fetchStudents();
    } catch (error: any) {
      toast.error(error.message || 'Failed to save student');
    }
  };

  // Handle edit
  const handleEdit = (student: Student) => {
    setSelectedStudent(student);
    setIsEditing(true);
    
    form.reset({
      full_name: student.full_name,
      nisn: student.nisn,
      birth_date: student.birth_date ? format(new Date(student.birth_date), 'yyyy-MM-dd') : '',
      major_id: student.major_id,
      class_id: student.class_id,
      batch_id: student.batch_id,
      image: student.image_id ? {
        id: student.image_id,
        url: (student as any).images?.url,
      } : undefined,
    });
    
    setDialogOpen(true);
  };

  // Handle delete
  const handleDelete = async () => {
    if (!confirmDeleteId) return;
    
    try {
      const { error } = await supabase
        .from('students')
        .delete()
        .eq('id', confirmDeleteId);
        
      if (error) throw error;
      
      toast.success('Student deleted successfully');
      setDeleteDialogOpen(false);
      setConfirmDeleteId(null);
      fetchStudents();
    } catch (error: any) {
      toast.error(error.message || 'Failed to delete student');
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

  // Handle export to CSV
  const handleExport = async () => {
    try {
      // Fetch all students for export
      const { data, error } = await supabase
        .from('students')
        .select(`
          *,
          majors:major_id (name),
          classes:class_id (name),
          batches:batch_id (year)
        `)
        .order('full_name');
        
      if (error) throw error;
      
      if (!data || data.length === 0) {
        toast.error('No data to export');
        return;
      }
      
      // Process data for CSV
      const csvData = data.map(student => ({
        'Nama Lengkap': student.full_name,
        'NISN': student.nisn,
        'Tanggal Lahir': student.birth_date ? format(new Date(student.birth_date), 'dd/MM/yyyy') : '-',
        'Jurusan': (student.majors as any)?.name || '-',
        'Kelas': (student.classes as any)?.name || '-',
        'Angkatan': (student.batches as any)?.year || '-',
        'Tanggal Dibuat': student.created_at ? format(new Date(student.created_at), 'dd/MM/yyyy HH:mm') : '-',
      }));
      
      // Convert to CSV
      const headers = Object.keys(csvData[0]);
      const csvContent = [
        headers.join(','),
        ...csvData.map(row => headers.map(header => JSON.stringify(row[header as keyof typeof row])).join(','))
      ].join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.setAttribute('href', url);
      link.setAttribute('download', `students_export_${format(new Date(), 'yyyy-MM-dd')}.csv`);
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast.success('Export successful');
    } catch (error) {
      console.error('Error exporting data:', error);
      toast.error('Failed to export data');
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <DashboardSidebar />
      
      <div className="flex-1 flex flex-col overflow-hidden">        
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">
          <div className="max-w-7xl mx-auto">
            <DashboardHeader 
              title="Data Siswa"
              subtitle="Kelola data siswa di sekolah"
              actionLabel="Tambah Siswa"
              onAction={() => {
                setIsEditing(false);
                setSelectedStudent(null);
                form.reset();
                setDialogOpen(true);
              }}
              breadcrumbs={[
                { label: 'Dashboard', href: '/dashboard' },
                { label: 'Data Siswa' }
              ]}
            />
            
            <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="relative flex-1">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  type="text"
                  placeholder="Cari nama, NISN, kelas..."
                  className="pl-10"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              
              <div className="flex gap-2">
                <Button variant="outline" className="gap-2" onClick={handleExport}>
                  <FileDown className="h-4 w-4" />
                  Export
                </Button>
                <Button className="gap-2" onClick={() => {
                  setIsEditing(false);
                  setSelectedStudent(null);
                  form.reset();
                  setDialogOpen(true);
                }}>
                  <Plus className="h-4 w-4" />
                  Tambah Siswa
                </Button>
              </div>
            </div>
            
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
              <div className="overflow-x-auto">
                {loading ? (
                  <div className="p-8 flex items-center justify-center">
                    <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
                  </div>
                ) : students.length > 0 ? (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-[50px]">No</TableHead>
                        <TableHead>Foto</TableHead>
                        <TableHead>Nama Lengkap</TableHead>
                        <TableHead>NISN</TableHead>
                        <TableHead>Tanggal Lahir</TableHead>
                        <TableHead>Jurusan</TableHead>
                        <TableHead>Kelas</TableHead>
                        <TableHead>Angkatan</TableHead>
                        <TableHead className="text-right">Aksi</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {students.map((student, index) => {
                        // Extract the initial from student name for avatar fallback
                        const initial = student.full_name ? student.full_name.charAt(0).toUpperCase() : 'S';
                        
                        return (
                          <TableRow key={student.id}>
                            <TableCell>{(pagination.page - 1) * pagination.perPage + index + 1}</TableCell>
                            <TableCell>
                              <Avatar>
                                {student.images?.url ? (
                                  <AvatarImage src={student.images.url} alt={student.full_name} />
                                ) : null}
                                <AvatarFallback>{initial}</AvatarFallback>
                              </Avatar>
                            </TableCell>
                            <TableCell>{student.full_name}</TableCell>
                            <TableCell>{student.nisn}</TableCell>
                            <TableCell>
                              {student.birth_date 
                                ? format(new Date(student.birth_date), 'dd/MM/yyyy') 
                                : '-'}
                            </TableCell>
                            <TableCell>{student.majors?.name || '-'}</TableCell>
                            <TableCell>{student.classes?.name || '-'}</TableCell>
                            <TableCell>{student.batches?.year || '-'}</TableCell>
                            <TableCell className="text-right">
                              <div className="flex justify-end gap-2">
                                <Button 
                                  variant="outline" 
                                  size="icon"
                                  onClick={() => handleEdit(student)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button 
                                  variant="destructive" 
                                  size="icon"
                                  onClick={() => confirmDelete(student.id)}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                ) : (
                  <EmptyState
                    title="Belum ada data siswa"
                    description="Tambahkan siswa baru untuk memulai"
                    actionLabel="Tambah Siswa"
                    onAction={() => {
                      setIsEditing(false);
                      form.reset();
                      setDialogOpen(true);
                    }}
                  />
                )}
              </div>
              
              {students.length > 0 && (
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
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{isEditing ? 'Edit Siswa' : 'Tambah Siswa Baru'}</DialogTitle>
            <DialogDescription>
              {isEditing 
                ? 'Edit data siswa yang sudah ada' 
                : 'Isi formulir berikut untuk menambahkan siswa baru'}
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="full_name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Nama Lengkap</FormLabel>
                      <FormControl>
                        <Input placeholder="Nama lengkap siswa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="nisn"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>NISN</FormLabel>
                      <FormControl>
                        <Input placeholder="NISN siswa" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="birth_date"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Tanggal Lahir</FormLabel>
                      <FormControl>
                        <Input type="date" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="major_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Jurusan</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih jurusan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {majors.map(major => (
                            <SelectItem key={major.id} value={major.id}>
                              {major.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="class_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Kelas</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih kelas" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {classes.map(classItem => (
                            <SelectItem key={classItem.id} value={classItem.id}>
                              {classItem.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={form.control}
                  name="batch_id"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Angkatan</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Pilih angkatan" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {batches.map(batch => (
                            <SelectItem key={batch.id} value={batch.id}>
                              {batch.year}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Foto Siswa</FormLabel>
                    <FormControl>
                      <ImageUpload
                        value={field.value?.url || null}
                        onChange={(image) => field.onChange(image)}
                        onError={(error) => {
                          console.error('Image upload error:', error);
                          toast.error('Error uploading image: ' + error.message);
                        }}
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
              Apakah Anda yakin ingin menghapus siswa ini? 
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

export default StudentsManagement;
