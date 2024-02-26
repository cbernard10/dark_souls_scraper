export type WeaponShieldData = {
  requirements: {
    strength: number;
    dexterity: number;
    intelligence: number;
    faith: number;
  };
  critical: number | null;
  durability: number;
  weight: number;
  auxiliary: number | null;
  weapon_type: string;
  attack_type: string;
  enchantable: boolean;
  special: string;
  upgrades: UpgradeTable | undefined;
};

export type WeaponURL = {
  name: string;
  url: string | null;
};

type UpgradeRow = {
  [key: string]: number | string;
};

export type UpgradeTable = {
  [key: string]: UpgradeRow;
};

export type ArmorPiece = {
  type: string;
  durability: number;
  weight: number;
  protection: {
    physical: number;
    strike: number;
    slash: number;
    thrust: number;
    magic: number;
    fire: number;
    lightning: number;
    bleed: number;
    poison: number;
    curse: number;
  };
  poise: number;
};

export type ArmorData = {
  [key: string]: ArmorPiece;
};
