import * as ds3 from "./ds3.json";

type Accessory = {
  id: string;
  name: string;
  description: string;
  knowledge: string;
  dlc: number;
};

type Armor = {
  id: string;
  name: string;
  description: string;
  knowledge: string;
  dlc: number;
};

type Conversation = {
  dlc: number;
  id: string;
  text: string;
};

type Item = {
  id: string;
  name: string;
  description: string;
  knowledge: string;
  dlc: number;
};

type Magic = {
  id: string;
  name: string;
  description: string;
  knowledge: string;
  dlc: number;
};

type Weapon = {
  id: string;
  name: string;
  description: string;
  knowledge: string;
  dlc: number;
};

type DS3Data = {
  languages: {
    [key: string]: unknown;
    engUS: {
      accessory: {
        [key: string]: Accessory;
      };
      armor: {
        [key: string]: Armor;
      };
      containers: unknown;
      conversations: {
        [key: string]: Conversation;
      };
      item: {
        [key: string]: Item;
      };
      magic: {
        [key: string]: Magic;
      };
      weapon: {
        [key: string]: Weapon;
      };
    };
  };
};

const ds3_data = ds3 as DS3Data;

// console.log(Object.keys(ds3_data.languages.engUS.armor));
console.log(ds3_data.languages.engUS.weapon);
