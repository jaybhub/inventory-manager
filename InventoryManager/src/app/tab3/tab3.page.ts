import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  items = [
    {
      name: "Bobcat",
      description: "Heavy machinery with a scoop on the front"
    },
    {
      name: "Shovel",
      description: "A tool used to dig or transfer soil"
    },
    { name: "Rake",
      description: "A tool used for moving leaves or mulch"
    },
    {
      name: "Trencher",
      description: "Light machine that digs a narrow trench in the soil"
    }
  ];

  constructor( public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  // Add new item button functionality - alert prompt
  async addItem() {
    console.log("Added item to Description List");
    this.showAddItemPrompt();
  }

  async showAddItemPrompt() {
    const alert = await this.alertCtrl.create({
      header: 'Add Item',
      message: 'Enter item and brief description',
      inputs: [
        {
          name: 'name',
          type: 'text',
          placeholder: 'Item'
        },
        {
          name: 'description',
          type: 'text',
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
          text: 'Add',
          handler: (item) => {
            console.log('Confirm Ok', item);
            this.items.push(item);
          }
        }
      ]
    });
    await alert.present();
  }

  // Edit item function
  async editItem(item, index) {
    console.log("Edited " + item);
    this.showEditItemPrompt(item, index);
  }

  async showEditItemPrompt(item, index) {
    const alert = await this.alertCtrl.create({
      header: 'Update Item',
      inputs: [
        {
          name: 'name',
          type: 'text',
          value: item.name
        },
        {
          name: 'descriptioni',
          type: 'text',
          value: item.description
        },
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, 
        {
          text: 'Update',
          handler: (item) => {
            this.items[index] = item;
          }
        }
      ]
    });
    await alert.present();
  }

  // addItemToPersonalInventory(item) function
  async moveItemToPersonalInventory(item) {
    console.log("Added " + item.name + " to Personal Inventory")
    const toast = await this.toastCtrl.create({
      message: 'Adding ' + item.name + ' to Personal Inventory...',
      duration: 3000
    });
    toast.present();
  }

  // addItemToSharedInventory(item) function
  async moveItemToSharedInventory(item) {
    console.log("Added " + item.name + " to Shared Inventory")
    const toast = await this.toastCtrl.create({
      message: 'Adding ' + item.name + ' to Shared Inventory...',
      duration: 3000
    });
    toast.present();
  }

  // deleteItem(item)
  async removeItem(item, index) {
    console.log("Removed Item - ", item.name, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing ' + item.name + ' from list...',
      duration: 3000
    });
    toast.present();

    this.items.splice(index, 1);
  }

}
