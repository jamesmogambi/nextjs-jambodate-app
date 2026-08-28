export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  width: number;
  height: number;
  bytes: number;
}

function getEnv(key: string, fallback: string): string {
  return process.env[key] || fallback;
}

export const CLOUDINARY_CLOUD_NAME = getEnv('NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME', '');
export const CLOUDINARY_UPLOAD_PRESET = getEnv('NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET', '');

export function isCloudinaryConfigured(): boolean {
  return Boolean(CLOUDINARY_CLOUD_NAME && CLOUDINARY_UPLOAD_PRESET);
}

export async function uploadToCloudinary(
  file: File,
  folder = 'jamboDate_profiles',
  onProgress?: (percentage: number) => void
): Promise<CloudinaryUploadResult> {
  if (!isCloudinaryConfigured()) {
    throw new Error('Cloudinary is not configured. Set NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME and NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET.');
  }

  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', folder);
  formData.append('context', `JamboDate profile photo for ${file.name}`);

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`;

  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    if (onProgress) {
      xhr.upload.onprogress = (event) => {
        if (event.lengthComputable && event.total > 0) {
          onProgress(Math.round((event.loaded / event.total) * 100));
        }
      };
    }

    xhr.open('POST', url);
    xhr.withCredentials = false;

    xhr.onload = () => {
      if (xhr.status >= 200 && xhr.status < 300) {
        try {
          const result = JSON.parse(xhr.responseText) as CloudinaryUploadResult;
          resolve(result);
        } catch (err) {
          reject(new Error(`Failed to parse Cloudinary response: ${err}`));
        }
      } else {
        let message = `Cloudinary upload failed with status ${xhr.status}`;
        try {
          const body = JSON.parse(xhr.responseText);
          message = body.error?.message || message;
        } catch {
          // keep default message
        }
        reject(new Error(message));
      }
    };

    xhr.onerror = () => {
      reject(new Error('Network error during Cloudinary upload'));
    };

    xhr.send(formData);
  });
}

export async function deleteFromCloudinary(publicId: string): Promise<void> {
  if (!CLOUDINARY_CLOUD_NAME) {
    throw new Error('Cloudinary cloud name not configured');
  }

  const url = `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/destroy`;
  const formData = new FormData();
  formData.append('public_id', publicId);
  formData.append('api_key', getEnv('NEXT_PUBLIC_CLOUDINARY_API_KEY', ''));

  const res = await fetch(url, {
    method: 'POST',
    body: formData,
  });

  if (!res.ok) {
    const body = await res.json().catch(() => null);
    throw new Error(body?.error?.message || `Failed to delete Cloudinary asset: ${publicId}`);
  }
}
