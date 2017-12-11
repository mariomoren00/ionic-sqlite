import { Injectable } from '@angular/core';
import { SQLiteObject } from '@ionic-native/sqlite';

/*
  Generated class for the TasksServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class TasksServiceProvider {
  
  db: SQLiteObject = null;

  constructor() {}
  
  // Métdo para guadar la instancia de SQLiteObject de nuestra base de datos.
  // En este caso nos devolvera un objeto si la base de datos esta creada. 
  // En caso contrario seguira siendo null y se creara la base de datos.
  setDatabase(db: SQLiteObject){
    console.log(db);
    if(this.db === null){
      this.db = db;
    }
  }

  createTable(){
    let sql = 'CREATE TABLE IF NOT EXISTS tasks(id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT)';
    return this.db.executeSql(sql, []);
  }
  
  getAll(){
    let sql = 'SELECT * FROM tasks';
    return this.db.executeSql(sql, [])
    .then(response => {
      let tasks = [];
      for (let index = 0; index < response.rows.length; index++) {
        tasks.push( response.rows.item(index) );
      }
      return Promise.resolve( tasks );
    })
    .catch(error => Promise.reject(error));
  }

  create(task: any){
    let sql = 'INSERT INTO tasks(title) VALUES(?)';
    return this.db.executeSql(sql, [task.title]);
  }

  update(task: any){
    let sql = 'UPDATE tasks SET title=? WHERE id=?';
    return this.db.executeSql(sql, [task.title, task.id]);
  }

  delete(task: any){
    let sql = 'DELETE FROM tasks WHERE id=?';
    return this.db.executeSql(sql, [task.id]);
  }

}
