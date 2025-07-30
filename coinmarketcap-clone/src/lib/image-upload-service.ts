'use client';

// Image upload service for token images
export interface ImageUploadResult {
  success: boolean;
  url?: string;
  ipfsHash?: string;
  error?: string;
}

export interface ImageUploadOptions {
  maxSizeBytes: number;
  allowedTypes: string[];
  quality?: number;
  maxWidth?: number;
  maxHeight?: number;
}

class ImageUploadService {
  private readonly defaultOptions: ImageUploadOptions = {
    maxSizeBytes: 5 * 1024 * 1024, // 5MB
    allowedTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp'],
    quality: 0.8,
    maxWidth: 512,
    maxHeight: 512
  };

  async uploadImage(file: File, options?: Partial<ImageUploadOptions>): Promise<ImageUploadResult> {
    const config = { ...this.defaultOptions, ...options };

    try {
      // Validate file
      const validation = this.validateFile(file, config);
      if (!validation.valid) {
        return {
          success: false,
          error: validation.error
        };
      }

      // Resize and optimize image
      const optimizedFile = await this.optimizeImage(file, config);

      // Upload to IPFS (mock implementation)
      const uploadResult = await this.uploadToIPFS(optimizedFile);

      return uploadResult;

    } catch (error) {
      console.error('Image upload failed:', error);
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  private validateFile(file: File, options: ImageUploadOptions): { valid: boolean; error?: string } {
    if (!file) {
      return { valid: false, error: 'No file provided' };
    }

    if (file.size > options.maxSizeBytes) {
      const maxSizeMB = options.maxSizeBytes / (1024 * 1024);
      return { valid: false, error: `File size must be less than ${maxSizeMB}MB` };
    }

    if (!options.allowedTypes.includes(file.type)) {
      return { valid: false, error: 'File type not supported. Please use JPG, PNG, GIF, or WebP.' };
    }

    return { valid: true };
  }

  private async optimizeImage(file: File, options: ImageUploadOptions): Promise<File> {
    return new Promise((resolve, reject) => {
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();

      img.onload = () => {
        try {
          // Calculate new dimensions
          let { width, height } = img;
          const maxWidth = options.maxWidth || width;
          const maxHeight = options.maxHeight || height;

          if (width > maxWidth || height > maxHeight) {
            const ratio = Math.min(maxWidth / width, maxHeight / height);
            width *= ratio;
            height *= ratio;
          }

          // Set canvas dimensions
          canvas.width = width;
          canvas.height = height;

          // Draw and compress image
          ctx?.drawImage(img, 0, 0, width, height);

          canvas.toBlob(
            (blob) => {
              if (blob) {
                const optimizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: Date.now()
                });
                resolve(optimizedFile);
              } else {
                reject(new Error('Failed to optimize image'));
              }
            },
            file.type,
            options.quality
          );
        } catch (error) {
          reject(error);
        }
      };

      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  private async uploadToIPFS(file: File): Promise<ImageUploadResult> {
    // Mock implementation - in production, integrate with:
    // - Pinata (https://pinata.cloud/)
    // - NFT.Storage (https://nft.storage/)
    // - Web3.Storage (https://web3.storage/)
    
    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Mock successful upload
    const mockHash = 'Qm' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    const mockUrl = `https://ipfs.io/ipfs/${mockHash}`;

    return {
      success: true,
      url: mockUrl,
      ipfsHash: mockHash
    };
  }

  // Alternative method using a traditional cloud storage service
  private async uploadToCloudStorage(file: File): Promise<ImageUploadResult> {
    // Mock implementation for services like AWS S3, Cloudinary, etc.
    const formData = new FormData();
    formData.append('image', file);

    try {
      // In production, this would be your upload endpoint
      const response = await fetch('/api/upload-image', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Upload failed');
      }

      const result = await response.json();
      
      return {
        success: true,
        url: result.url
      };

    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      };
    }
  }

  // Utility method to convert file to base64 for preview
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = error => reject(error);
    });
  }

  // Utility method to validate image dimensions
  async getImageDimensions(file: File): Promise<{ width: number; height: number }> {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        resolve({
          width: img.naturalWidth,
          height: img.naturalHeight
        });
      };
      img.onerror = () => reject(new Error('Failed to load image'));
      img.src = URL.createObjectURL(file);
    });
  }

  // Method to generate different image sizes for different use cases
  async generateImageVariants(file: File): Promise<{
    thumbnail: File;
    medium: File;
    large: File;
  }> {
    const [thumbnail, medium, large] = await Promise.all([
      this.optimizeImage(file, { ...this.defaultOptions, maxWidth: 64, maxHeight: 64 }),
      this.optimizeImage(file, { ...this.defaultOptions, maxWidth: 256, maxHeight: 256 }),
      this.optimizeImage(file, { ...this.defaultOptions, maxWidth: 512, maxHeight: 512 })
    ]);

    return { thumbnail, medium, large };
  }
}

// Export singleton instance
export const imageUploadService = new ImageUploadService();

// Export class for custom instances
export default ImageUploadService;