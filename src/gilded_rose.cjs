class Item {
  constructor(name, sellIn, quality) {
    this.name = name;
    this.sellIn = sellIn;
    this.quality = quality;
  }
}

class Shop {
  constructor(items = []) {
    this.items = items;
  }

  updateQuality() {
    for (let i = 0; i < this.items.length; i++) {
      const item = this.items[i];

      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        // Decrease quality for non-legendary items
        if (item.quality > 0) {
          const qualityDecrease = item.name.includes('Conjured') ? 2 : 1;
          item.quality -= qualityDecrease;
        }

        // Update quality for specific items
        if (item.name === 'Aged Brie') {
          item.quality += 1;
        } else if (item.name === 'Backstage passes to a TAFKAL80ETC concert') {
          if (item.sellIn <= 0) {
            item.quality = 0;
          } else if (item.sellIn <= 5) {
            item.quality += 3;
          } else if (item.sellIn <= 10) {
            item.quality += 2;
          }
        }
      }

      // Decrease sellIn for all items except Sulfuras
      if (item.name !== 'Sulfuras, Hand of Ragnaros') {
        item.sellIn -= 1;
      }

      // Ensure quality bounds
      if (item.quality < 0) {
        item.quality = 0;
      } else if (item.quality > 50) {
        item.quality = 50;
      }
    }

    return this.items;
  }
}

module.exports = {
  Item,
  Shop,
};
