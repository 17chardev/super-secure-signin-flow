
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';
import { toast } from 'sonner';
import { CldUploadWidget } from 'next-cloudinary';

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

  const onUploadSuccess = (result: any) => {
    setIsUploading(false);
    
    if (result?.info) {
      onChange({ 
        id: result.info.public_id,
        url: result.info.secure_url 
      });
      toast.success('Image uploaded successfully');
    }
  };

  const onUploadError = (error: any) => {
    setIsUploading(false);
    console.error('Error uploading image:', error);
    
    if (onError) {
      onError(new Error(error.message || 'Failed to upload image'));
    }
    
    toast.error('Failed to upload image');
  };

  const handleRemove = () => {
    onChange({ id: '', url: '' });
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <CldUploadWidget
          uploadPreset="school-management"
          options={{
            maxFiles: 1,
            resourceType: 'image',
            maxFileSize: 5000000, // 5MB
            sources: ['local', 'camera'],
            styles: {
              palette: {
                window: "#FFFFFF",
                windowBorder: "#90A0B3",
                tabIcon: "#0078FF",
                menuIcons: "#5A616A",
                textDark: "#000000",
                textLight: "#FFFFFF",
                link: "#0078FF",
                action: "#FF620C",
                inactiveTabIcon: "#0E2F5A",
                error: "#F44235",
                inProgress: "#0078FF",
                complete: "#20B832",
                sourceBg: "#E4EBF1"
              }
            }
          }}
          onSuccess={onUploadSuccess}
          onError={onUploadError}
        >
          {({ open }) => (
            <div
              className={`
                flex flex-col items-center justify-center border-2 border-dashed 
                rounded-md cursor-pointer p-4 h-40 w-full
                ${value ? 'border-gray-300' : 'border-gray-400 hover:border-gray-500'}
                transition-colors duration-200
              `}
              onClick={() => {
                if (!value) {
                  setIsUploading(true);
                  open();
                }
              }}
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
            </div>
          )}
        </CldUploadWidget>
      </div>
    </div>
  );
};

export default ImageUpload;
