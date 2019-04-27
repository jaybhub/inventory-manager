import { Component } from '@angular/core';
import { NavController, ToastController, AlertController } from '@ionic/angular';
import { DataProviderService } from '../data-provider.service';
import { FunctionProviderService } from '../function-provider.service';
// import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {


  constructor(public functionProvider: FunctionProviderService, public dataProvider: DataProviderService, public navCtrl: NavController, public toastCtrl: ToastController, public alertCtrl: AlertController) {

  }

  // Get items
  loadItems() {
    return this.dataProvider.getDescriptionItems();
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
  async removeItem(item, inventory) {
    console.log("Removed Item - ", item.name);
    const toast = await this.toastCtrl.create({
      message: 'Removing ' + item.name + ' from list...',
      duration: 3000
    });
    toast.present();

    this.dataProvider.removeItem(item, inventory);
  }

  // Move item to personal inventory, or shared inventory and send notice
  moveItem(item, inventoryTo) {
    this.functionProvider.moveItem(item, inventoryTo, null);
    // if (inventoryTo === 'shared') {
    // // let Body = item.name + " has been returned to the shared inventory. Please use Inventory Manager to check it out.";
    // // let Subject = item.name + "was Returned";
    // // this.socialSharing.share(Body, Subject, this.dataProvider.getEmailList()).then(() => {
    // //   // Success!
    // //   console.log("Shared successfully!");
    // // }).catch((error) => {
    // //   // Error!
    // //   console.error("Error while sharing ", error);
    // // });
    // }
  }

}
