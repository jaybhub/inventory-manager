import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { DataProviderService } from '../data-provider.service';
import { FunctionProviderService } from '../function-provider.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  constructor(public socialSharing: SocialSharing, public functionProvider: FunctionProviderService, public dataProvider: DataProviderService, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  // Get items
  loadItems() {
    return this.dataProvider.getItems();
  }

  // Add new item
  async addItem() {
    console.log("Added item to Description List");
    this.functionProvider.showPrompt();
  }

  // Edit item 
  async editItem(item, index) {
    console.log("Edited " + item);
    this.functionProvider.showPrompt(item, index);
  }

  // Remove Item
  async removeItem(item, index) {
    console.log("Removed Item - ", item.name, index);
    const toast = await this.toastCtrl.create({
      message: 'Removing ' + item.name + ' from list...',
      duration: 3000
    });
    toast.present();

    this.dataProvider.removeItem(index);
  }

  // Move item to personal inventory
  async moveItemToPersonalInventory(item) {
    console.log("Added " + item.name + " to Personal Inventory")
    const toast = await this.toastCtrl.create({
      message: 'Adding ' + item.name + ' to Personal Inventory...',
      duration: 3000
    });
    toast.present();
  }

  // Move item to shared inventory and send notice
  async moveItemToSharedInventory(item) {
    console.log("Added " + item.name + " to Shared Inventory")
    const toast = await this.toastCtrl.create({
      message: 'Adding ' + item.name + ' to Shared Inventory...',
      duration: 3000
    });
    toast.present();

    let Body = item.name + " has been returned to the shared inventory. Please use Inventory Manager to check it out.";
    let Subject = item.name + "was Returned";
    this.socialSharing.share(Body, Subject, this.dataProvider.getEmailList()).then(() => {
      // Success!
      console.log("Shared successfully!");
    }).catch((error) => {
      // Error!
      console.error("Error while sharing ", error);
    });
  }



}
