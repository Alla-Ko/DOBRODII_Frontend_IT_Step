import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import * as imageConversion from 'image-conversion';
import { EImageType } from 'image-conversion';
import { from, Observable, of, switchMap } from 'rxjs';
import { ApiService } from './api.service';
export interface UploadResponse {
  url: string;
}
@Injectable({
  providedIn: 'root',
})
export class UploadMediaService {
  private api = inject(ApiService);
  private endpoint = `media/upload`;
  platformId = inject(PLATFORM_ID);

  upload(file: File): Observable<UploadResponse> {
    if (!isPlatformBrowser(this.platformId)) {


      const formData = new FormData();
      formData.append('file', file);
      return this.api.uploadFile(this.endpoint, file);
    }


    return this.processFile(file).pipe(
      switchMap(processedFile => {
        const formData = new FormData();
        formData.append('file', processedFile);
        return this.api.uploadFile<UploadResponse>(this.endpoint, file);
      })
    );
  }
  private processFile(file: File): Observable<File> {
    const maxSizeMB = 5; 
    const maxDimension = 1500; 
    const quality = 0.8; 

    if (!file.type.startsWith('image/')) {
      
      return of(file);
    }

    
    if (file.size <= maxSizeMB * 1024 * 1024) {
      
      return this.resizeImage(file, maxDimension);
    }

    
    return from(
      imageConversion.compressAccurately(file, {
        size: maxSizeMB * 1024, 
        type: file.type as EImageType,
        quality: quality,
      })
    ).pipe(
      switchMap((compressedFile: Blob) => {
        const file = new File([compressedFile], (compressedFile as File).name, {
          lastModified: (compressedFile as File).lastModified,
          type: compressedFile.type,
        });
        return this.resizeImage(file, maxDimension);
      })
    );
  }
  private resizeImage(file: File, maxDimension: number): Observable<File> {
    return new Observable(observer => {
      const img = new Image();
      const reader = new FileReader();

      reader.onload = (event: ProgressEvent<FileReader>) => {
        const reader = event.target as FileReader;
        if (reader.result) {
          img.src = reader.result as string;
        }

        img.onload = () => {
          let width = img.width;
          let height = img.height;

  
          if (width <= maxDimension && height <= maxDimension) {
            observer.next(file); 
            observer.complete();
            return;
          }


          if (width > height) {
            height = Math.round((height / width) * maxDimension);
            width = maxDimension;
          } else {
            width = Math.round((width / height) * maxDimension);
            height = maxDimension;
          }


          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d')!;
          ctx.drawImage(img, 0, 0, width, height);


          canvas.toBlob(
            blob => {
              if (blob) {
                const resizedFile = new File([blob], file.name, {
                  type: file.type,
                  lastModified: file.lastModified,
                });
                observer.next(resizedFile);
                observer.complete();
              } else {
                observer.error(new Error('Failed to convert canvas to Blob'));
              }
            },
            file.type,
            0.8 
          );
        };

        img.onerror = () => observer.error(new Error('Failed to load image'));
      };

      reader.onerror = () => observer.error(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  }
}
