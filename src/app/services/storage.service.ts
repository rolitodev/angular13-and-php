import { Injectable } from '@angular/core';
import { Encriptar } from '../tools/encriptar.tools';

@Injectable({
  providedIn: 'root'
})

export class StorageService {

  private storage = localStorage;
  private encryptTools: Encriptar = new Encriptar();

  constructor() { }

  getItem(key: string) {
    const itemEncripted = this.storage.getItem(key);
    if (!itemEncripted) { return null; }
    return this.encryptTools.desencrypt(itemEncripted);
  }

  getItemNoEncrypt(key: string): any {
    const item = this.storage.getItem(key);
    return item;
  }

  setItem(key: string, value: any) {
    this.storage.setItem(key, this.encryptTools.encrypt(value));
  }

  setItemNoEncrypt(key: string, value: any) {
    this.storage.setItem(key, value);
  }

  removeItem(key: string) {
    this.storage.removeItem(key);
  }

  clear() {
    this.storage.clear();
  }

}
