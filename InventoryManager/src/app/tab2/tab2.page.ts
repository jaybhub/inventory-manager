import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { DataProviderService } from '../data-provider.service';
import { FunctionProviderService } from '../function-provider.service';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  // TODO: Change to dynamically filled list
  q1 = this.loadSharedItems();
 
  constructor(private dragulaService: DragulaService, public dataProvider: DataProviderService, public functionProvider: FunctionProviderService, private toastController: ToastController) {

    this.dragulaService.drag('bag')
    .subscribe(({ el }) => {
      el.setAttribute('color', 'primary');
    });
 
    this.dragulaService.removeModel('bag')
    .subscribe(({ item }) => {
      this.toastController.create({
        message: 'Moved to Personal Inventory',
        duration: 2000
      }).then(toast => toast.present());
      this.functionProvider.moveItem(item, 'personal', 'shared');
    });
 
    this.dragulaService.dropModel('bag')
      .subscribe(({ el }) => {
        el.setAttribute('color', 'primary');
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