import { Injectable } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { finalize, from, map, Observable, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ImageUploadService {
  constructor(private storage: AngularFireStorage) { }

  uploadImage(image: File, path: string) {
    const task = from(this.storage.upload(path, image));
    const ref = this.storage.ref(path);

    const res = ref.getDownloadURL();
    return res;
  }
}