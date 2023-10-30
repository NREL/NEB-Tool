import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ElectronService {

  isElectron: boolean;
  electronWindow: ElectronWindow;
  constructor() {
    this.electronWindow  = window;
    this.isElectron = this.electronWindow["electronAPI"];
    if (this.isElectron) {
      console.log('Application running inside of Electron.')
      //application running in electron listen for signals
      this.listen();
    } else {
      console.warn('Application is running on the Web.');
    }
  }

  //listens for messages from electron about updates
  listen(): void {
    if (!this.electronWindow["electronAPI"]) {
      return;
    }
    this.electronWindow["electronAPI"].on("release-info", (data: { releaseName: string, releaseNotes: string }) => {
      console.log('release-info');
      console.log(data);
    });
    this.electronWindow["electronAPI"].on("available", (data: any) => {
      console.log('available');
      console.log(data);
    });
    this.electronWindow["electronAPI"].on("error", (data: any) => {
      console.log('error');
      console.log(data);
    });
    this.electronWindow["electronAPI"].on("update-downloaded", (data: any) => {
      console.log('update-downloaded');
      console.log(data)
    });
  }

  //Used to tell electron that app is ready
  //does nothing when in browser
  sendAppReady(data: any): void {
    if (!this.electronWindow["electronAPI"]) {
      return;
    }
    this.electronWindow["electronAPI"].send("ready", data);
  }

  //send signal to ipcMain to update
  sendUpdateSignal() {
    if (!this.electronWindow["electronAPI"]) {
      return;
    }
    this.electronWindow["electronAPI"].send("update");
  }

  sendAppRelaunch(){
    if(!this.electronWindow["electronAPI"]){
      return;
    }
    this.electronWindow["electronAPI"].send("relaunch");
  }
}

export interface ElectronWindow extends Window {
  electronAPI?: any
}