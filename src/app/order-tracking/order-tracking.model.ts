import { formatDate } from '@angular/common';
import { RouteInfo } from '../layout/sidebar/sidebar.metadata';
export class OrderTracking {
  idOrden: string;
  numeroOrden: string;
  nombreTecnico: string;
  numeroDocumento: string;
  estadoOrden: string;
  fechaOrdenTrabajo: string;
  nombreCarpeta: string;
  //bDate: string;
  detallematerial: string;
  detalleEquipo: string;
 
  constructor(orderTracking) {
    {
      this.idOrden = orderTracking.idOrden || this.getRandomID();
      this.numeroOrden = orderTracking.numeroOrden ;
      this.nombreTecnico = orderTracking.nombreTecnico || '';
      this.numeroDocumento = orderTracking.numeroDocumento || '';
      this.estadoOrden = orderTracking.estadoOrden || '';
      this.fechaOrdenTrabajo = orderTracking.fechaOrdenTrabajo || '';
      this.nombreCarpeta = orderTracking.nombreCarpeta || '';
      //this.bDate = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
      
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
export class FilterDates {
  fechaInicio: string;
  fechaFin: string;
  constructor(parameters) {
    this.fechaInicio = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';
    this.fechaFin = formatDate(new Date(), 'yyyy-MM-dd', 'en') || '';    
  }
}
