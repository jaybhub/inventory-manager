import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  q1 = [
    { value: 'Bobcat', color: 'primary' },
    { value: 'Pruning Shears', color: 'primary' }
  ];
 
  todo = { value: '', color: '' };
  selectedQuadrant = 'q1';
 
  constructor(private dragulaService: DragulaService, private toastController: ToastController) {
    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'danger');
    });
 
    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {
      this.toastController.create({
        message: 'Removed: ' + item.value,
        duration: 2000
      }).then(toast => toast.present());
    });
 
    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        item['color'] = 'success';
      });
 
    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });
  }
 
  addTodo() {
    switch (this.selectedQuadrant) {
      case 'q1':
        this.todo.color = 'primary';
        break;
      case 'q2':
        this.todo.color = 'secondary';
        break;
      case 'q3':
        this.todo.color = 'tertiary';
        break;
      case 'q4':
        this.todo.color = 'warning';
        break;
    }
    this[this.selectedQuadrant].push(this.todo);
    this.todo = { value: '', color: '' };
  }
 
}