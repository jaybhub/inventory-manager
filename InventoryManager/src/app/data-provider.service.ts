import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  descriptionItems = [
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

  sharedInventoryItems = [
    {
      name: "Garden Hose",
      description: "100 ft hose"
    },
    {
      name: "Pruning Shears",
      description: "Cutting tool for removing twigs"
    }
  ]

  personalInventoryItems = [

  ]

  emailList = ["jhubert1@maryville.edu", "jaybhubert@gmail.com"]


  constructor() { }

  getEmailList() {
    return this.emailList;
  }

  getDescriptionItems() {
    return this.descriptionItems;
  }
  
  getSharedInventoryItems() {
    return this.sharedInventoryItems;
  }

  getPersonalInventoryItems() {
    return this.personalInventoryItems;
  }

  removeItem(index) {
    this.descriptionItems.splice(index, 1);
  }

  addItem(item) {
    this.descriptionItems.push(item);
  }

  editItem(item,index) {
    this.descriptionItems[index] = item;
  }

}
