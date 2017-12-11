import { Component } from '@angular/core';
import { NavController, AlertController } from 'ionic-angular';

import { TasksServiceProvider } from '../../providers/tasks-service/tasks-service';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  tasks: any[] = [];
  
  constructor(
    public navCtrl: NavController,
    public alertCtrl: AlertController,
    public tasksServiceProvider: TasksServiceProvider) {}

  ionViewDidLoad(){
    this.getAllTasks();
  }

  getAllTasks(){
    this.tasksServiceProvider.getAll().then(tasks => {
      this.tasks = tasks;
    }).catch( error => {
      console.error( error );
    });
  }

  openAlertNewTask(){
    let alert = this.alertCtrl.create({
      title: 'Crear tarea',
      message: 'Escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          placeholder: 'Digitar nueva tarea.',
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Crear',
          handler: (data)=>{ 
            data.completed = false;
            this.tasksServiceProvider.create(data)
            .then(response => {
              this.tasks.unshift( data );
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }

  updateTask(task: any, index){
    let alert = this.alertCtrl.create({
      title: 'Editar tarea',
      message: 'Escribe el nombre de la tarea',
      inputs: [
        {
          name: 'title',
          value: task.title,
        }
      ],
      buttons: [
        {
          text: 'Cancelar',
          handler: () =>{
            console.log('cancelar');
          }
        },
        {
          text: 'Editar',
          handler: (data)=>{ 
            data.id = task.id;
            this.tasksServiceProvider.update(data)
            .then(response => {
              this.getAllTasks();
            })
            .catch( error => {
              console.error( error );
            })
          }
        }
      ]
    });
    alert.present();
  }

  deleteTask(task: any, index){
    this.tasksServiceProvider.delete(task).then(response => {
      console.log( response );
      this.tasks.splice(index, 1);
    }).catch( error => {
      console.error( error );
    })
  }


}
