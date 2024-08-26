document.addEventListener("alpine:init", () => {
  Alpine.data("products", () => ({
    items: [
      {
        id: 1,
        title: "Coffee Robusta",
        image: "https://coffee.alexflipnote.dev/random",
        price: 25000,
      },
      {
        id: 2,
        title: "Coffee Arabica",
        image: "https://coffee.alexflipnote.dev/random",
        price: 30000,
      },
    ],
  }));

  Alpine.store("cart", {
    items: [],
    total: 0,
    quantity: 0,
    add(product) {
      // cek apakah product sudah ada di cart
      const cartItem = this.items.find((item) => item.id === product.id);

      // jika belum ada
      if (!cartItem) {
        this.items.push({ ...product, quantity: 1, total: product.price });
        this.quantity++;
        this.total += product.price;
      } else {
        this.items = this.items.map((item) => {
          if (item.id !== product.id) {
            return item;
          } else {
            // jika barang sudah ada
            item.quantity++;
            item.total = item.price * item.quantity;
            this.quantity++;
            this.total += item.price;
            return item;
          }
        });
      }
      console.log(this.total);
    },
    remove(id) {
      // cari data yang akan dihapus
      const item = this.items.find((item) => item.id === id);
      //   jika lebih dari 1
      if (item.quantity > 1) {
        this.items = this.items.map((item) => {
          if (item.id !== id) {
            return item;
          } else {
            item.quantity--;
            item.total = item.price * item.quantity;
            this.quantity--;
            this.total -= item.price;
            return item;
          }
        });
      } else if (item.quantity === 1) {
        this.items = this.items.filter((item) => item.id !== id);
        this.quantity--;
        this.total -= item.price;
      }
    },
  });
});

// konveris ke rupiah
const rupiah = (price) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(price);
};
