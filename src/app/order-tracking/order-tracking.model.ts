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
  idCarpeta: string;
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
      this.idCarpeta = orderTracking.idCarpeta || '';
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
export class DetailWorkOrderFollowequipment {
  idDetalle: string;
  idParamActividad:string
  codigoEquipo: string;
  nombreEquipo: string;
  serialEquipo: string;
  idMovimiento: string;
  idCarpeta: string;
  nombreMovimiento: string;
  nombreActividad: string;
  constructor(parameters) {
    this.idDetalle = parameters.idDetalle || this.getRandomID();
    this.codigoEquipo = parameters.codigoEquipo || '';
    this.nombreEquipo = parameters.nombreEquipo || ''; 
    this.serialEquipo = parameters.serialEquipo || ''; 
    this.idMovimiento = parameters.idMovimiento || ''; 
    this.idParamActividad = parameters.idParamActividad || ''; 
    this.idCarpeta = parameters.idCarpeta || ''; 
    this.nombreMovimiento = parameters.nombreMovimiento || '';     
    this.nombreActividad = parameters.nombreActividad || '';     
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
export class DetailWorkOrderFollowMaterial {
  idDetalle: string;
  idParamActividad:string
  codigoMaterial: string;
  nombreMaterial: string;
  cantidadMaterial: string;
  idMovimiento: string;
  idCarpeta: string;
  nombreMovimiento: string;
  nombreActividad: string;
  constructor(parameters) {
    this.idDetalle = parameters.idDetalle || this.getRandomID();
    this.codigoMaterial = parameters.codigoMaterial || '';
    this.nombreMaterial = parameters.nombreMaterial || ''; 
    this.cantidadMaterial = parameters.cantidadMaterial || '';  
    this.idParamActividad = parameters.idParamActividad || ''; 
    this.idCarpeta = parameters.idCarpeta || '';      
    this.nombreActividad = parameters.nombreActividad || '';     
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
export class paramGenericDto {
  idParamGenericActividad: string;
  nombreGeneric: string;
  nombreActividad: string;
  constructor(parameters) {
    this.idParamGenericActividad = parameters.idParamGenericActividad || this.getRandomID();
    this.nombreGeneric = parameters.nombreGeneric || '';
    this.nombreActividad = parameters.nombreActividad || '';         
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
