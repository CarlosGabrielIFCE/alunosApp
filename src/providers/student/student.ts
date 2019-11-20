import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Student } from '../../models/student.model';

@Injectable()
export class StudentProvider {

  private PATH = 'contacts/';
 
  constructor(private db: AngularFireDatabase) {
  }
 
  getAll() {
    return this.db.list(this.PATH, ref => ref.orderByChild('nomeCompleto'))
      .snapshotChanges()
      .map(changes => {
        return changes.map(c => ({ key: c.payload.key, ...c.payload.val() }));
      })
  }
 
  get(key: string) {
    return this.db.object(this.PATH + key).snapshotChanges()
      .map(c => {
        return { key: c.key, ...c.payload.val() };
      });
  }
 
  save(student: Student) {
    return new Promise((resolve, reject) => {
      if (student.key) {
        this.db.list(this.PATH)
          .update(student.key, student)
          .then(() => resolve())
          .catch((e) => reject(e));
      } else {
        this.db.list(this.PATH)
          .push(student)
          .then(() => resolve());
      }
    })
  }
 
  remove(key: string) {
    return this.db.list(this.PATH).remove(key);
  }

}
