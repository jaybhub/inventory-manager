import { Injectable } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { DataProviderService } from './data-provider.service';


@Injectable({
  providedIn: 'root'
})
export class FunctionProviderService {

  constructor(public dataProvider: DataProviderService, public toastCtrl: ToastController, public alertCtrl: AlertController) { }

  // Move item
  async moveItem(item, inventoryTo, inventoryFrom) {
    console.log("Added " + item.name + " to " + inventoryTo + " inventory")
    const toast = await this.toastCtrl.create({
      message: 'Adding ' + item.name + ' to ' + inventoryTo + ' inventory...',
      duration: 3000
    });
    toast.present();

    this.dataProvider.addItem(item, inventoryTo);
    if (inventoryFrom !== null) {
      this.dataProvider.removeItem(item, inventoryFrom)
    }
  }

  // Input prompt
  async showPrompt(item?, index?) {
    const alert = await this.alertCtrl.create({
      header: item ? 'Update Item' : 'Add Item',
      message: item ? 'Update the item below' : 'Enter item and brief description',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: item ? item.name : null,
          placeholder: 'Item'
        },
        {
          name: 'description',
          type: 'text',
          value: item ? item.description : null,
          placeholder: 'Description'
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Cancel');
          }
        },
        {
          text: 'OK',
          handler: (item) => {
            console.log('Confirm Ok', item);
            if (index !== undefined) {
              this.dataProvider.editItem(item, index);
            }
            else {
              this.dataProvider.addItem(item);
            }
          }
        }
      ]
    });
    await alert.present();
  }

}
