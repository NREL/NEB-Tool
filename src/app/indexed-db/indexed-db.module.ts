import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dbConfig } from './_idbConfig';
import { NgxIndexedDBModule } from 'ngx-indexed-db';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ]
})
export class IndexedDbModule { }
