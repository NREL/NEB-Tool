import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { dbConfig } from './_idbConfig';
import { NgxIndexedDBModule } from 'ngx-indexed-db';
import { provideNgxWebstorage, withLocalStorage, withNgxWebstorageConfig, withSessionStorage } from 'ngx-webstorage';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    NgxIndexedDBModule.forRoot(dbConfig)
  ],
  providers: [
    provideNgxWebstorage(
      withNgxWebstorageConfig({ separator: ':', caseSensitive: true }),
      withLocalStorage(),
      withSessionStorage()
    ),
  ]
})
export class IndexedDbModule { }
