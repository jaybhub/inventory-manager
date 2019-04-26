import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

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

  emailList = ["jhubert1@maryville.edu", "jaybhubert@gmail.com"]


  constructor() { }

  getEmailList() {
    return this.emailList;
  }

  getItems() {
    return this.items;
  }
  
  removeItem(index) {
    this.items.splice(index, 1);
  }

  addItem(item) {
    this.items.push(item);
  }

  editItem(item,index) {
    this.items[index] = item;
  }

}
