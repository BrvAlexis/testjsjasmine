const { Shop, Item } = require('../src/gilded_rose.cjs');

describe("Gilded Rose", function() {
  let gildedRose;
  let items;

  beforeEach(() => {
    items = [
      new Item("+5 Dexterity Vest", 10, 20),
      new Item("Aged Brie", 2, 0),
      new Item("Elixir of the Mongoose", 5, 7),
      new Item("Sulfuras, Hand of Ragnaros", 0, 80),
      new Item("Backstage passes to a TAFKAL80ETC concert", 15, 20),
      new Item("Backstage passes to a TAFKAL80ETC concert", 10, 49),
      new Item("Backstage passes to a TAFKAL80ETC concert", 5, 39),
      new Item("Conjured Mana Cake", 3, 6),
    ];
    gildedRose = new Shop(items);
  });

  it("should increase quality by 3 when there are 5 days or less (Backstage passes)", function() {
    gildedRose.updateQuality();
    expect(items[5].quality).toBe(22); // 20 + 2 (10 days left)
    expect(items[6].quality).toBe(50); // 49 + 1 (max 50)
    expect(items[7].quality).toBe(42); // 39 + 3 (5 days left)
  });

  it("should not change the quality of Sulfuras", function() {
    gildedRose.updateQuality();
    expect(items[3].quality).toBe(80);
    expect(items[4].quality).toBe(80);
  });

  // Exemple de test pour la règle "Quality Bounds" :
it("should limit quality to be between 0 and 50", function() {
  const item1 = new Item("Normal Item", 5, 60);
  const item2 = new Item("Normal Item", 5, -10);
  gildedRose.items.push(item1, item2);

  gildedRose.updateQuality();

  expect(item1.quality).toBe(50); // Max quality
  expect(item2.quality).toBe(0); // Min quality
});

// Exemple de test pour la règle "Quality Bounds" :
it("should limit quality to be between 0 and 50", function() {
  const item1 = new Item("Normal Item", 5, 60);
  const item2 = new Item("Normal Item", 5, -10);
  gildedRose.items.push(item1, item2);

  gildedRose.updateQuality();

  expect(item1.quality).toBe(50); // Max quality
  expect(item2.quality).toBe(0); // Min quality
});

// Exemple de test pour la règle "Conjured items" après la date de vente :
it("should decrease quality by 4 for Conjured items after sell-by date", function() {
  const conjuredItem = new Item("Conjured Mana Cake", -1, 10);
  gildedRose.items.push(conjuredItem);

  gildedRose.updateQuality();

  expect(conjuredItem.quality).toBe(6); // 10 - 4
});

// Exemple de test pour la règle "Conjured items" après la date de vente :
it("should decrease quality by 4 for Conjured items after sell-by date", function() {
  const conjuredItem = new Item("Conjured Mana Cake", -1, 10);
  gildedRose.items.push(conjuredItem);

  gildedRose.updateQuality();

  expect(conjuredItem.quality).toBe(6); // 10 - 4
});

  // Exemple de test pour la règle "Aged Brie" :
  it("should increase the quality of Aged Brie as it gets older", function() {
    gildedRose.updateQuality();
    expect(items[1].quality).toBe(1); // 0 + 1
  });

  // Exemple de test pour la règle "Conjured items" :
  it("should decrease the quality of Conjured items twice as fast", function() {
    gildedRose.updateQuality();
    expect(items[8].quality).toBe(4); // 6 - 2
  });

  it("should decrease quality by 2 for Conjured items", () => {
    // Arrange
    const conjuredItem = new Item("Conjured Mana Cake", 3, 6);
    items.push(conjuredItem);
  
    // Act
    const gildedRose = new Shop(items);
    gildedRose.updateQuality();
  
    // Assert
    expect(conjuredItem.quality).toBe(4); // 6 - 2
  });
});