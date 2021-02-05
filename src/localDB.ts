import Dexie from "dexie";

export interface ITalks {
  id?: number; // Primary key. Optional (autoincremented)
  TalkID: string;
}
class MyAppDatabase extends Dexie {
  // Declare implicit table properties.
  // (just to inform Typescript. Instanciated by Dexie in stores() method)
  talks: Dexie.Table<ITalks, number>; // number = type of the primkey
  //...other tables goes here...

  constructor() {
    super("MyAppDatabase");
    this.version(1).stores({
      talks: "++id",
      //...other tables goes here...
    });
    // The following line is needed if your typescript
    // is compiled using babel instead of tsc:
    this.talks = this.table("talks");
  }
}

export const localDB = new MyAppDatabase();

// @ts-ignore
window.localDB = localDB;
