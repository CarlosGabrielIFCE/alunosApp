import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { StudentProvider } from '../../providers/student/student';

@IonicPage()
@Component({
  selector: 'page-student-edit',
  templateUrl: 'student-edit.html',
})
export class StudentEditPage {
  title: string;
  form: FormGroup;
  student: any;
 
  constructor(
    public navCtrl: NavController, public navParams: NavParams,
    private formBuilder: FormBuilder, private provider: StudentProvider,
    private toast: ToastController) {
 
    // maneira 1
    this.student = this.navParams.get('student') || { };
    this.createForm();
 
    this.setupPageTitle();
  }
 
  private setupPageTitle() {
    this.title = this.navParams.data.student ? 'Alterando Aluno' : 'Novo Aluno';
  }
 
  createForm() {
    // key?: any,
    // curso: string,
    // dataNascimento: Date,
    // endereco: {
    //     cep: number,
    //     complemento: string,
    //     nrEndereco: number,
    //     UF: string,
    //     municipio: string,
    // }
    // nomeCompleto: string,
    // nomeResponsavel: string,
    // telResponsavel: string,
    this.form = this.formBuilder.group({
      key: [this.student.key],
      curso: [this.student.curso, Validators.required],
      nomeCompleto: [this.student.nomeCompleto, Validators.required],
      nomeResponsavel: [this.student.nomeResponsavel, Validators.required],
      dataNascimento: [this.student.dataNascimento, Validators.required],
      telResponsavel: [this.student.telResponsavel, Validators.required],
      cep: [this.student.cep, Validators.required],
      complemento: [this.student.complemento, Validators.required],
      nrEndereco: [this.student.nrEndereco, Validators.required],
      UF: [this.student.UF, Validators.required],
      municipio: [this.student.municipio, Validators.required],
    });
  }
 
  onSubmit() {
    if (this.form.valid) {
      this.provider.save(this.form.value)
        .then(() => {
          this.toast.create({ message: 'Estudante salvo com sucesso.', duration: 3000 }).present();
          this.navCtrl.pop();
        })
        .catch((e) => {
          this.toast.create({ message: 'Erro ao salvar o Estudante.', duration: 3000 }).present();
          console.error(e);
        })
    }
  }
}
