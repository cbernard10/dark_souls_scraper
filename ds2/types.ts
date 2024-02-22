export type WeaponData = {
  damage: {
    physical: string;
    magic: string;
    fire: string;
    lightning: string;
  };
  requirements: {
    strength: string | null;
    dexterity: string | null;
    intelligence: string | null;
    faith: string | null;
  };
  critical: string;
  stability: string;
  durability: string;
  weight: string;
  auxiliary: string | null;
  type: string;
  attack_type: string;
  enchantable: boolean;
  special: string;
  upgrades: UpgradeTable | undefined;
};

export type DS2WeaponData = {
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  weight: number;
  durability: number;
  stability: number;
  type: string;
  attack_type: string;
  enchantable: boolean;
  special: string;
  upgrades: UpgradeTable;
};

export type ShieldData = {
  damage: {
    physical: string;
    magic: string;
    fire: string;
    lightning: string;
  };
  requirements: {
    strength: string | null;
    dexterity: string | null;
    intelligence: string | null;
    faith: string | null;
  };
  critical: string;
  stability: string;
  durability: string;
  weight: string;
  type: string;
  attack_type: string;
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
