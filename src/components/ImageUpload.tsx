
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { uploadImage } from '@/utils/api';
import { toast } from 'sonner';

interface ImageUploadProps {
  value: string | null;
  onChange: (value: { id: string; url: string }) => void;
  onError?: (error: Error) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  value,
  onChange,
  onError,
}) => {
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast.error('Invalid file type. Please upload an image.');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('File is too large. Maximum size is 5MB.');
      return;
    }

    try {
      setIsUploading(true);
      const uploadedImage = await uploadImage(file);
      onChange({ id: uploadedImage.id, url: uploadedImage.url });
      toast.success('Image uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error);
      if (onError && error instanceof Error) {
        onError(error);
      }
    } finally {
      setIsUploading(false);
      
      // Reset the input value so the same file can be uploaded again if needed
      e.target.value = '';
    }
  };

  const handleRemove = () => {
    onChange({ id: '', url: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          onChange={handleUpload}
          className="hidden"
          disabled={isUploading}
        />
        <label
          htmlFor="image-upload"
          className={`
            flex flex-col items-center justify-center border-2 border-dashed 
            rounded-md cursor-pointer p-4 h-40 w-full
            ${value ? 'border-gray-300' : 'border-gray-400 hover:border-gray-500'}
            transition-colors duration-200
          `}
        >
          {value ? (
            <div className="relative w-full h-full flex justify-center">
              <img 
                src={value} 
                alt="Uploaded" 
                className="h-full object-contain"
              />
              <Button
                type="button"
                variant="destructive"
                size="icon"
                className="absolute -top-2 -right-2 h-6 w-6 rounded-full"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleRemove();
                }}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center">
              <Upload className="h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-500">Click to upload image</p>
              <p className="text-xs text-gray-400 mt-1">(Max 5MB)</p>
              {isUploading && <p className="text-sm text-blue-500 mt-2">Uploading...</p>}
            </div>
          )}
        </label>
      </div>
    </div>
  );
};

export default ImageUpload;
