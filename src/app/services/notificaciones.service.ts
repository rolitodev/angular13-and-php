import { Injectable } from '@angular/core';
import { NgxNotificationDirection, NgxNotificationMsgService, NgxNotificationStatusMsg } from 'ngx-notification-msg';

@Injectable({
  providedIn: 'root'
})

export class NotificacionesService {

  constructor(private ngxNotificationMsgService: NgxNotificationMsgService) { }

  mostrar(tipo: string, mensaje: string): void {

    switch (tipo) {

      case "error":
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.FAILURE,
          header: 'Error',
          messages: [mensaje],
          direction: NgxNotificationDirection.BOTTOM
        });
        break;

      case "correcto":
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.SUCCESS,
          header: 'Hey',
          messages: [mensaje],
          direction: NgxNotificationDirection.BOTTOM
        });
        break;

      case "info":
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.INFO,
          header: 'Hey',
          messages: [mensaje],
          direction: NgxNotificationDirection.BOTTOM
        });
        break;

      default:
        this.ngxNotificationMsgService.open({
          status: NgxNotificationStatusMsg.NONE,
          header: 'Hey',
          messages: [mensaje],
          direction: NgxNotificationDirection.BOTTOM
        });
        break;
    }

  }

}
