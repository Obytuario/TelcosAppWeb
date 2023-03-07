import { formatDate } from '@angular/common';
import { RouteInfo } from '../layout/sidebar/sidebar.metadata';
export class AdvanceUser {
  id: number;
  img: string;
  numberDocument: string;
  fName: string;
  lName: string;
  email: string;
  active: string;
  //bDate: string;
  mobile: string;
  address: string;
  operationCenter: string;
  charge:string;
  idRol:string;
  rol:string;
  constructor(advanceTable) {
    {
      this.id = advanceTable.id || this.getRandomID();
      this.img = advanceTable.avatar || 'assets/images/user/user1.jpg';
      this.numberDocument = advanceTable.numberDocument || '';
      this.fName = advanceTable.fName || '';
      this.lName = advanceTable.lName || '';
      this.email = advanceTable.email || '';
      this.active = advanceTable.active || 'no';
      //this.bDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.mobile = advanceTable.mobile || '';
      this.address = advanceTable.address || '';
      this.operationCenter = advanceTable.operationCenter || '';
      this.idRol = advanceTable.idRol || this.getRandomID();
      this.rol = advanceTable.rol || '';
      this.charge = advanceTable.charge || '';
    }
  }
  public getRandomID(): string {
    let d = new Date().getTime();
    const guid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
        const r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === "x" ? r : (r & 0x3 | 0x8)).toString(16);
    });
    return guid;
  }
}
