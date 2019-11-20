import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { StudentProvider } from '../../providers/student/student';
import { Student } from '../../models/student.model';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  students: Observable<any>;
 
  constructor(public navCtrl: NavController, private provider: StudentProvider,
    private toast: ToastController) {
 
    this.students = this.provider.getAll();
  }
 
  newStudent() {
    this.navCtrl.push('StudentEditPage');
  }
 
  editStudent(student: any) {
    // Maneira 1
    //console.log(student);
    this.navCtrl.push('StudentEditPage', { student: student });
 
    // Maneira 2
    // this.navCtrl.push('ContactEditPage', { key: contact.key });
  }
 
  removeStudent(key: string) {
    if (key) {
      this.provider.remove(key)
        .then(() => {
          this.toast.create({ message: 'Aluno removido sucesso.', duration: 3000 }).present();
        })
        .catch(() => {
          this.toast.create({ message: 'Erro ao remover o Aluno.', duration: 3000 }).present();
        });
    }
  }

}
