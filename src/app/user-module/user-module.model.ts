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
  bDate: string;
  mobile: string;
  address: string;
  operationCenter: string;
  charge:string;
  rol:string
  constructor(advanceTable) {
    {
      this.id = advanceTable.id || this.getRandomID();
      this.img = advanceTable.avatar || 'assets/images/user/user1.jpg';
      this.fName = advanceTable.fName || '';
      this.lName = advanceTable.lName || '';
      this.email = advanceTable.email || '';
      this.active = advanceTable.active || 'no';
      this.bDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      this.mobile = advanceTable.mobile || '';
      this.address = advanceTable.address || '';
      this.operationCenter = advanceTable.operationCenter || '';
      this.rol = advanceTable.rol || '';
      this.charge = advanceTable.charge || '';
    }
  }
  public getRandomID(): string {
    const S4 = () => {
      return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
    };
    return S4() + S4();
  }
}
