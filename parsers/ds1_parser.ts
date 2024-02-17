import * as ds1 from "./ds1.json";

type Weapon = {
  name: string;
  attack_type: string;
  weight: number;
  durability: number;
};

let i = 0;
let ds1_weapons: Weapon[] = [];

while (ds1[i]) {
  ds1_weapons.push({
    name: ds1[i].name,
    attack_type: ds1[i].attack_type,
    weight: ds1[i].weight,
    durability: ds1[i].durability,
  });
  i++;
}

export default ds1_weapons;
