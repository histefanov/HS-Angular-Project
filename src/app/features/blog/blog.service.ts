import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Post } from './models/post';
import { map } from 'rxjs';
import { UserPost } from './models/user-post';

@Injectable({
  providedIn: 'root'
})
export class BlogService {

  postsCollection: AngularFirestoreCollection<Post>
  postDoc: AngularFirestoreDocument<Post>

  constructor(private afs: AngularFirestore) {
    this.postsCollection = this.afs.collection<Post>('posts', ref =>
      ref.orderBy('published', 'desc'));
  }

  //refactor

  getLatestPosts() {
    return this.postsCollection.snapshotChanges()
      .pipe(map(actions =>
        actions.slice(0, 3).map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data }
        })));
  }

  getUsersPosts(userId: string) {
    return this.afs.collection<UserPost>('posts', ref =>
      ref.where('authorId', '==', userId))
      .snapshotChanges()
      .pipe(map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as UserPost;
          const id = a.payload.doc.id;
          return { id, ...data }
        })));
  }

  getPosts() {
    return this.postsCollection.snapshotChanges()
      .pipe(map(actions =>
        actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          return { id, ...data }
        })));
  }

  getPostData(id: string | null) {
    this.postDoc = this.getPost(id);
    return this.postDoc.valueChanges();
  }

  create(data: Post) {
    this.postsCollection.add(data);
  }

  // change formData type

  update(id: string, formData: any) {
    return this.getPost(id).update(formData);
  }

  delete(id: string | undefined) {
    return this.getPost(id as string | null).delete();
  }

  private getPost(id: string | null) {
    return this.afs.doc<Post>(`posts/${id}`);
  }
}
