import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // TODO: Change to dynamically filled list
  q1 = [
    { value: 'Bobcat', color: 'primary' },
    { value: 'Pruning Shears', color: 'primary' }
  ];
 
  // TODO: moveItemToPersonalInventory function

  // TODO: stop change color on move between columns

  // TODO: stop item delete except in moveToSharedInventory

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
 
}