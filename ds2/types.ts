export type WeaponData = {
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  counter_damage: number;
  poise_damage: number;
  stability: number;
  durability: number;
  weight: number;
  weapon_type: string;
  attack_type: string;
  enchantable: boolean;
  special: string;
  upgrades: UpgradeTable | undefined;
};

export type ShieldData = {
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  durability: number;
  weight: number;
  weapon_type: string;
  attack_type: string;
  special: string;
  upgrades: UpgradeTable | undefined;
};

export type WeaponURL = {
  name: string;
  url: string | null;
};

export type UpgradeTable = {
  [key: string]: {
    [key: string]: string | number | null;
  };
};

export type ArmorPiece = {
  durability: string;
  weight: string;
  protection: {
    physical: string;
    strike: string;
    slash: string;
    thrust: string;
    magic: string;
    fire: string;
    lightning: string;
    bleed: string;
    poison: string;
    curse: string;
  };
  poise: string;
};

export type ArmorData = {
  [key: string]: {
    [key: string]: ArmorPiece;
  };
};
