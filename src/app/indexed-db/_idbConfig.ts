import { DBConfig } from "ngx-indexed-db";

export const dbConfig: DBConfig = {
  name: 'NEB_Tool',
  version: 1,
  objectStoresMeta: [{
    store: 'user',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
  {
    store: 'company',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
  {
    store: 'facility',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
  {
    store: 'project',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
  {
    store: 'assessment',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
  {
    store: 'contact',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  },
  {
    store: 'nonEnergyBenefit',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: [
    ]
  }]
};