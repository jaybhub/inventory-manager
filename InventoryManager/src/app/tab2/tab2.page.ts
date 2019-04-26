import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { DataProviderService } from '../data-provider.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // TODO: Change to dynamically filled list
  q1 = this.loadSharedItems()
 
  // TODO: moveItemToPersonalInventory function

  constructor(public dataProvider: DataProviderService, private dragulaService: DragulaService, private toastController: ToastController) {

    this.dragulaService.drag('bag')
    .subscribe(({ name, el, source }) => {
      el.setAttribute('color', 'primary');
    });
 
    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {
      this.toastController.create({
        message: 'Moved: ' + item.value + 'to Personal Inventory',
        duration: 2000
      }).then(toast => toast.present());
    });
 
    this.dragulaService.dropModel('bag')
      .subscribe(({ item }) => {
        item['color'] = 'primary';
      });
 
    this.dragulaService.createGroup('bag', {
      removeOnSpill: true
    });
  }

    // Get items
    loadSharedItems() {
      return this.dataProvider.getSharedInventoryItems();
    };


}