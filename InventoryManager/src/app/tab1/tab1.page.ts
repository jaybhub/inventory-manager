import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // TODO: Change to dynamically filled list
  q1 = [
    { value: 'Shovel', color: 'primary' },
    { value: 'Rake', color: 'primary' }
  ];
  q2 = [
    { value: 'Wheel Barrow', color: 'primary' },
    { value: 'Trencher', color: 'primary' }
  ];
 
  // TODO: moveItemToSharedInventory function

  constructor(private dragulaService: DragulaService, private toastController: ToastController) {
    
    this.dragulaService.drag('bag1')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'primary');
    });
 
    this.dragulaService.removeModel('bag1')
    .subscribe(({ item }) => {
      this.toastController.create({
        message: 'Moved: ' + item.value + ' to Shared Inventory',
        duration: 2000
      }).then(toast => toast.present());
    }); 
 
    this.dragulaService.dropModel('bag1')
      .subscribe(({ item }) => {
        item['color'] = 'primary';
      });
 
    this.dragulaService.createGroup('bag1', {
      removeOnSpill: true
    });
  }

}
