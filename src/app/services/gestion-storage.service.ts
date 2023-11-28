import { Article } from './../interfaces/interfaces';
import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

@Injectable({
  providedIn: 'root'
})
export class GestionStorageService {

  constructor() {}

  // Almacena una cadena de caracteres. Para cada string se necesita un identificador (key) y su valor (value)
  // Mediante await se espera a que el método asíncrono de almacenar datos finalice
  async setString(key: string, value: string) {
    await Preferences.set({ key, value });
  }
  
  // A partir de su clave identificadora (key) obtiene el valor de una cadena de caracteres almacenada en local
  async getString(key: string): Promise<{ value: any }> {
    return await Preferences.get({ key });
  }
  
  // Almacena un objeto con formato JSON en local. Por cada objeto, se necesita una clave (key) y el valor del objeto (value)
  async setObject(key: string, value: any) {
    await Preferences.set({ key, value: JSON.stringify(value) });
  }
  
  // A partir de su clave obtiene un objeto almacenado en local
  // Antes de devolverlo, debe ser convertido de formato JSON a formato normal
  async getObject(key: string): Promise<Article[]> {
    const ret: any = await Preferences.get({ key });
    return JSON.parse(ret.value);
  }
  
  // Dada su clave, elimina un elemento almacenado en local independientemente de su tipo
  async removeItem(key: string) {
    await Preferences.remove({ key });
  }
  
  // Vacía el almacenamiento local
  async clear() {
    await Preferences.clear();
  }
}