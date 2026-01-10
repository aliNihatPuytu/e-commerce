import heroImg from "../assets/images/home-page/hero-image.png";

import brand1 from "../assets/images/home-page/brand-1.png";
import brand2 from "../assets/images/home-page/brand-2.png";
import brand3 from "../assets/images/home-page/brand-3.png";
import brand4 from "../assets/images/home-page/brand-4.png";
import brand5 from "../assets/images/home-page/brand-5.png";
import brand6 from "../assets/images/home-page/brand-6.png";

import topLeftImg from "../assets/images/home-page/top-product-1.jpg";
import topRightTopImg from "../assets/images/home-page/top-product-2.jpg";
import topRightBottomImg from "../assets/images/home-page/top-product-3.jpg";

import bestseller1 from "../assets/images/home-page/bestseller-1.png";
import bestseller2 from "../assets/images/home-page/bestseller-2.png";
import bestseller3 from "../assets/images/home-page/bestseller-3.png";
import bestseller4 from "../assets/images/home-page/bestseller-4.png";
import bestseller5 from "../assets/images/home-page/bestseller-5.png";
import bestseller6 from "../assets/images/home-page/bestseller-6.png";
import bestseller7 from "../assets/images/home-page/bestseller-7.png";
import bestseller8 from "../assets/images/home-page/bestseller-8.png";
import bestseller9 from "../assets/images/home-page/bestseller-9.png";
import bestseller10 from "../assets/images/home-page/bestseller-10.png";

import weLove1 from "../assets/images/home-page/we-love-1.png";
import weLove2 from "../assets/images/home-page/we-love-2.png";

import featuredPost1 from "../assets/images/home-page/featured-post-1.png";
import featuredPost2 from "../assets/images/home-page/featured-post-2.png";

import easyWinsIcon from "../assets/icons/easy-wins.png";
import concreteIcon from "../assets/icons/concrete.png";
import hackGrowthIcon from "../assets/icons/hack-growth.png";

export const heroImage = heroImg;

export const brandLogos = [brand1, brand2, brand3, brand4, brand5, brand6];

export const topProducts = {
  left: topLeftImg,
  rightTop: topRightTopImg,
  rightBottom: topRightBottomImg,
};

export const bestsellerProducts = [
  bestseller1,
  bestseller2,
  bestseller3,
  bestseller4,
  bestseller5,
  bestseller6,
  bestseller7,
  bestseller8,
  bestseller9,
  bestseller10,
].map((img, i) => ({
  id: i + 1,
  title: "Graphic Design",
  dept: "English Department",
  oldPrice: "$16.48",
  price: "$6.48",
  img,
}));

export const weLoveImages = [weLove1, weLove2];

export const serviceItems = [
  {
    id: 1,
    title: "Easy Wins",
    desc: "Get your best looking smile now!",
    icon: easyWinsIcon,
  },
  {
    id: 2,
    title: "Concrete",
    desc: "Defalcate is most focused in helping you discover your most beautiful smile",
    icon: concreteIcon,
  },
  {
    id: 3,
    title: "Hack Growth",
    desc: "Overcame any hurdle or any other problem.",
    icon: hackGrowthIcon,
  },
];

export const featuredPosts = [
  {
    id: 1,
    img: featuredPost1,
    tag: "English Department",
    title: "Graphic Design",
    desc: "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
  },
  {
    id: 2,
    img: featuredPost2,
    tag: "English Department",
    title: "Graphic Design",
    desc: "We focus on ergonomics and meeting you where you work. It’s only a keystroke away.",
    date: "22 April 2021",
    comments: "10 comments",
  },
];

const homepageData = {
  heroImage,
  brandLogos,
  topProducts,
  bestsellerProducts,
  weLoveImages,
  serviceItems,
  featuredPosts,
};

export default homepageData;
