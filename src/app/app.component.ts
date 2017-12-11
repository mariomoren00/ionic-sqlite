import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { HomePage } from '../pages/home/home';
import { SQLite } from '@ionic-native/sqlite';
import { TasksServiceProvider } from '../providers/tasks-service/tasks-service';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  // Componente raíz de navegación
  rootPage: any = null;
  
    constructor(
      public platform: Platform,
      public statusBar: StatusBar,
      public splashScreen: SplashScreen,
      public tasksService: TasksServiceProvider,
      public sqlite: SQLite
    ) {
      this.platform.ready().then(() => {
        this.statusBar.styleDefault();
        // Llamamos a la función para crear nuestra base de datos.
        this.createDatabase();
      });
    }
  
    // Creamos nuestra base de datos
    private createDatabase(){
      this.sqlite.create({
        name: 'data.db',
        location: 'default' 
      }).then((db) => {
        console.log('Base de datos creado.');
        this.tasksService.setDatabase(db);
        return this.tasksService.createTable();
      }).then(() =>{
        console.log('Iniciamos el home principal de root');
        this.splashScreen.hide();
        this.rootPage = HomePage;
      }).catch(error =>{
        console.log('error');
        console.error(error);
      });
    }
}

