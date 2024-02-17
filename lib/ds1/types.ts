export type WeaponData = {
  damage: {
    physical: string;
    magic: string;
    fire: string;
    lightning: string;
  };
  requirements: {
    strength: string;
    dexterity: string;
    intelligence: string;
    faith: string;
  };
  critical: string;
  stability: string;
  durability: string;
  weight: string;
  type: string;
  attack_type: string;
  enchantable: boolean;
  upgrades: UpgradeTable | undefined;
};

export type WeaponURL = {
  name: string;
  url: string | null;
};

export type UpgradeTable = {
  [key: string]: {
    [key: string]: string;
  };
};
