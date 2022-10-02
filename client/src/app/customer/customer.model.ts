import { UserModel } from "../user/user.model";


export type nString = string | null | undefined;

export enum customerColumnName{
    name = "Name",
    website = "Website",
    address = "Address",
    createdAt = "Customer Created Date",
    edit = "Edit"
}

interface customerObject {
    id?: nString;
    name: nString;
    website: nString;
    address: nString;
    users: UserModel[];
    createdAt: string;
  }
  
  export class customerModel {
    id?: nString;
    name: nString;
    website: nString;
    address: nString;
    users?: UserModel[];
    createdAt: string;
  
    constructor(dataObject: customerObject) {
      this.id = dataObject['id'];
  
      this.name = dataObject['name'];
  
      this.address =
        dataObject['address'] == undefined || !dataObject['address']
          ? null
          : dataObject['address'];
  
      this.website =
        dataObject['website'] == undefined || !dataObject['website']
          ? null
          : dataObject['website'];
  
      this.users = dataObject['users'];
      this.createdAt = dataObject['createdAt'];
    }
  }