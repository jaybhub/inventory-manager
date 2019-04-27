import { Component } from '@angular/core';

import { DragulaService } from 'ng2-dragula';
import { ToastController } from '@ionic/angular';
import { DataProviderService } from '../data-provider.service';
import { FunctionProviderService } from '../function-provider.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  // TODO: Change to dynamically filled list
  q1 = this.loadActiveItems();
  q2 = this.loadPersonalItems();;

  constructor(private dragulaService: DragulaService, public dataProvider: DataProviderService, public functionProvider: FunctionProviderService, private toastController: ToastController) {

    // Drag and drop functionality
    this.dragulaService.drag('bag1')
      .subscribe(({ el }) => {
        el.setAttribute('color', 'primary');
      });

    this.dragulaService.removeModel('bag1')
      .subscribe(({ item }) => {
        this.toastController.create({
          message: 'Moved to Shared Inventory',
          duration: 2000
        }).then(toast => toast.present());
        // Update database collections
        this.functionProvider.moveItem(item, 'shared', 'personal');
      });

    this.dragulaService.dropModel('bag1')
      .subscribe(({ el }) => {
        el.setAttribute('color', 'primary');
      });

    this.dragulaService.createGroup('bag1', {
      removeOnSpill: true
    });
  }

  // Get items
  loadPersonalItems() {
    return this.dataProvider.getPersonalInventoryItems();
  };

  loadActiveItems() {
    return this.dataProvider.getActiveInventoryItems();
  };

}
