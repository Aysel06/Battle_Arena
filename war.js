class Character {
  constructor(name, health, power) {
    this._name = name;
    this._health = health;
    this._power = power;
  }

  get name() {
    return this._name;
  }

  set name(value) {
    if (typeof value !== "string") {
      throw new TypeError("Name must be a string");
    }
    this._name = value;
  }

  get health() {
    return this._health;
  }

  set health(value) {
    if (typeof value !== "number") {
      throw new TypeError("Health must be a number");
    }
    this._health = value;
  }

  get power() {
    return this._power;
  }

  set power(value) {
    if (typeof value !== "number") {
      throw new TypeError("Power must be a number");
    }
    this._power = value;
  }

  describe() {
    return `${this.name} | HP: ${this.health} | Power: ${this.power}`;
  }

  static battle(a, b) {
    let attackA;
    let attackB;

    if (a instanceof Warrior) {
      attackA = a.attack();
    } else if (a instanceof Mage) {
      attackA = a.castSpell();
    } else if (a instanceof Archer) {
      attackA = a.attack();
    }

    if (b instanceof Warrior) {
      attackB = b.attack();
    } else if (b instanceof Mage) {
      attackB = b.castSpell();
    } else if (b instanceof Archer) {
      attackB = b.attack();
    }

    return attackA > attackB
      ? `Winner: ${a.name}`
      : `Winner: ${b.name}`;
  }

  [Symbol.toPrimitive](hint) {
    if (hint === "number") {
      return this.health;
    }

    if (hint === "string") {
      return this.describe();
    }

    return this.describe();
  }
}

class Warrior extends Character {
  constructor(name, health, power) {
    super(name, health, power);
    this._shield = 0;
  }

  get shield() {
    return this._shield;
  }

  set shield(value) {
    if (typeof value !== "number") {
      throw new TypeError("Shield must be a number");
    }
    this._shield = value;
  }

  attack() {
    return this.power + this.shield / 2;
  }
}

class Mage extends Character {
  constructor(name, health, power) {
    super(name, health, power);
    this._mana = 0;
  }

  get mana() {
    return this._mana;
  }

  set mana(value) {
    if (typeof value !== "number") {
      throw new TypeError("Mana must be a number");
    }
    this._mana = value;
  }

  castSpell() {
    if (this.mana > 0) {
      return this.power * 2;
    }
    return 0;
  }
}

class Archer extends Character {
  constructor(name, health, power) {
    super(name, health, power);
    this._arrows = 0;
  }

  get arrows() {
    return this._arrows;
  }

  set arrows(value) {
    if (typeof value !== "number") {
      throw new TypeError("Arrows must be a number");
    }
    this._arrows = value;
  }

  attack() {
    if (this.arrows <= 0) {
      return 0;
    }

    this._arrows--;
    return this.power;
  }
}

const g = new Mage("Gandalf", 80, 40);
g.mana = 10;

const a = new Warrior("Aragorn", 100, 30);
a.shield = 20;

console.log(Character.battle(g, a));
console.log(`${a}`);
console.log(+g);
