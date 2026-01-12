import sp1 from "../assets/images/shop-page/product-1.png";
import sp2 from "../assets/images/shop-page/product-2.png";
import sp3 from "../assets/images/shop-page/product-3.png";
import sp4 from "../assets/images/shop-page/product-4.png";
import sp5 from "../assets/images/shop-page/product-5.png";
import sp6 from "../assets/images/shop-page/product-6.png";
import sp7 from "../assets/images/shop-page/product-7.png";
import sp8 from "../assets/images/shop-page/product-8.png";
import sp9 from "../assets/images/shop-page/product-9.png";
import sp10 from "../assets/images/shop-page/product-10.png";
import sp11 from "../assets/images/shop-page/product-11.png";
import sp12 from "../assets/images/shop-page/product-12.png";

import top1 from "../assets/images/home-page/top-product-1.jpg";
import top2 from "../assets/images/home-page/top-product-2.jpg";
import top3 from "../assets/images/home-page/top-product-3.jpg";

import b1 from "../assets/images/home-page/bestseller-1.png";
import b2 from "../assets/images/home-page/bestseller-2.png";
import b3 from "../assets/images/home-page/bestseller-3.png";
import b4 from "../assets/images/home-page/bestseller-4.png";
import b5 from "../assets/images/home-page/bestseller-5.png";
import b6 from "../assets/images/home-page/bestseller-6.png";
import b7 from "../assets/images/home-page/bestseller-7.png";
import b8 from "../assets/images/home-page/bestseller-8.png";
import b9 from "../assets/images/home-page/bestseller-9.png";
import b10 from "../assets/images/home-page/bestseller-10.png";

export const SHOP_PRODUCTS = [
  { id: 1, img: sp1, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 2, img: sp2, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 3, img: sp3, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 4, img: sp4, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 5, img: sp5, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 6, img: sp6, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 7, img: sp7, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 8, img: sp8, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 9, img: sp9, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 10, img: sp10, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 11, img: sp11, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 12, img: sp12, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
];

export const TOP_PRODUCTS = [
  { id: 13, img: top1, title: "Floating Phone", department: "English Department", price: "$1,139.33", sale: "" },
  { id: 14, img: top2, title: "Floating Phone", department: "English Department", price: "$1,139.33", sale: "" },
  { id: 15, img: top3, title: "Floating Phone", department: "English Department", price: "$1,139.33", sale: "" },
];

export const HOME_BESTSELLERS = [
  { id: 16, img: b1, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 17, img: b2, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 18, img: b3, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 19, img: b4, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 20, img: b5, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 21, img: b6, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 22, img: b7, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 23, img: b8, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 24, img: b9, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
  { id: 25, img: b10, title: "Graphic Design", department: "English Department", price: "$16.48", sale: "$6.48" },
];

export const ALL_PRODUCTS = [...SHOP_PRODUCTS, ...TOP_PRODUCTS, ...HOME_BESTSELLERS];

export const PRODUCTS_BY_ID = ALL_PRODUCTS.reduce((acc, p) => {
  acc[String(p.id)] = p;
  return acc;
}, {});
