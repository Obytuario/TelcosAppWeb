import {
  Component,
  OnInit,
  ViewChild,
  Inject,
  PLATFORM_ID
} from '@angular/core';

import { MapsAPILoader } from '@agm/core';

import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-technical',
  templateUrl: './technical.component.html',
  styleUrls: ['./technical.component.sass']
})
export class TechnicalComponent implements OnInit {
  latitude = 4.6446389;
  longitude = -74.0994413;
  markers: any;
  previous:any;

  @ViewChild('streetviewMap', { static: true }) streetviewMap: any;
  @ViewChild('panoramaMap', { static: true }) panoramaMap: any;

  breadscrums = [
    {
      title: 'Seguimiento Ordenes',
      items: ['Mapas'],
      active: 'Localización'
    }
  ];
  iconMap = 
    {
      iconUrl: 'https://cdn-icons-png.flaticon.com/128/2671/2671879.png',
      iconHeigh: 10      
    }
    

  constructor(
    @Inject(PLATFORM_ID) private platformId: any,
    private mapsAPILoader: MapsAPILoader
  ) { }

  ngOnInit(): void {
    this.markerData();
    this.initStreetViewMap();
  }
  initStreetViewMap() {
    if (isPlatformBrowser(this.platformId)) {
      this.mapsAPILoader.load().then(() => {
        const center = { lat: 23.02482, lng: 72.55991 };
        const map = new window['google'].maps.Map(
          this.streetviewMap.nativeElement,
          {
            center,
            zoom: 12,
            scrollwheel: false
          }
        );
        const panorama = new window['google'].maps.StreetViewPanorama(
          this.panoramaMap.nativeElement,
          {
            position: center,
            pov: { heading: 34, pitch: 10 },
            scrollwheel: false
          }
        );
        map.setStreetView(panorama);
      });
    }
  }

  clickedMarker(infowindow) {
    if (this.previous) {
        this.previous.close();
    }
    this.previous = infowindow;
 }

  private markerData() {
    this.markers = [
      {
        latitude:4.6446389,
        longitude:-74.0994413,
        tecnico:'Carlos Torres', 
        suscriptor:'Ramo S.A',       
        iconUrlOT: 'https://cdn.icon-icons.com/icons2/1379/PNG/96/foldergreengoogledrive_93478.png',
        labelOptionsOT:{
          color:'#FFFFFF',
          text:'OT-12338'
        },
        labelOptions:{
          color:'#FFFFFF',
          text:'Carlos Torres'
        }
      },
      {
        latitude: 4.6435723,
        longitude: -74.1034807,  
        tecnico:'Julian Calderon', 
        suscriptor:'Claudia ortiz',   
        iconUrlOT: 'https://cdn.icon-icons.com/icons2/1379/PNG/96/foldergreygoogledrive_92990.png',
        labelOptionsOT:{
          color:'#FFFFFF',
          text:'OT-12390'
        },
        labelOptions:{
          color:'#FFFFFF',
          text:'Julian Calderon'
        }
      },
      {
        latitude: 4.6448381,
        longitude: -74.0999455,
        tecnico:'Diego Garzon', 
        suscriptor:'Herrarias del sur S.A',        
        iconUrlOT: 'https://cdn.icon-icons.com/icons2/1379/PNG/96/folderredgoogledrive_93221.png',
        labelOptionsOT:{
          color:'#FFFFFF',
          text:'OT-12333'
        },
        labelOptions:{
          color:'#FFFFFF',
          text:'Diego Garzon'
        }
      },
      {
        latitude: 4.1454967,
        longitude: -73.6321953,
        tecnico:'Diego Garzon', 
        suscriptor:'Herrarias del sur S.A',        
        iconUrlOT: 'https://cdn.icon-icons.com/icons2/1379/PNG/96/folderredgoogledrive_93221.png',
        labelOptionsOT:{
          color:'#FFFFFF',
          text:'OT-12333'
        },
        labelOptions:{
          color:'#FFFFFF',
          text:'Diego Garzon'
        }
      }
    ];
  }

}
