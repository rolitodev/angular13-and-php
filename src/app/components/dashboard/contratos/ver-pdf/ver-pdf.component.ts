import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { NotificacionesService } from 'src/app/services/notificaciones.service';

@Component({
  selector: 'app-ver-pdf',
  templateUrl: './ver-pdf.component.html',
  styleUrls: ['./ver-pdf.component.css']
})

export class VerPdfComponent implements OnInit {

  public pdfSrc: any = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<VerPdfComponent>,
    public _notificaciones: NotificacionesService
  ) { }

  ngOnInit(): void {
    this.pdfSrc = this.data.imagen_contrato;
  }

  onError(error: any) {
    this._notificaciones.mostrar('error', 'El archivo pdf que consultate se ha eliminado.');
    this.cerrarModal();
  }

  cerrarModal(): void {
    this.dialogRef.close();
  }

}
