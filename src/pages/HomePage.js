import { Link } from "react-router-dom";
import {
  Heart,
  ShoppingCart,
  Eye,
  ChevronRight,
  Star,
  Clock,
  BarChart2,
  TrendingUp,
  Download,
} from "lucide-react";
import Container from "../layout/Container";

import heroImg from "../assets/images/home-page/hero-image.png";

import brand1 from "../assets/images/home-page/brand-1.png";
import brand2 from "../assets/images/home-page/brand-2.png";
import brand3 from "../assets/images/home-page/brand-3.png";
import brand4 from "../assets/images/home-page/brand-4.png";
import brand5 from "../assets/images/home-page/brand-5.png";
import brand6 from "../assets/images/home-page/brand-6.png";

import top1 from "../assets/images/home-page/top-product-1.jpg";
import top2 from "../assets/images/home-page/top-product-2.jpg";
import top3 from "../assets/images/home-page/top-product-3.jpg";

import weLove1 from "../assets/images/home-page/we-love-1.png";
import weLove2 from "../assets/images/home-page/we-love-2.png";

import post1 from "../assets/images/home-page/featured-post-1.png";
import post2 from "../assets/images/home-page/featured-post-2.png";

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

import easyWinsIcon from "../assets/icons/easy-wins.png";
import concreteIcon from "../assets/icons/concrete.png";
import hackGrowthIcon from "../assets/icons/hack-growth.png";

const bestsellers = [b1, b2, b3, b4, b5, b6, b7, b8, b9, b10];
const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

export default function HomePage() {
  return (
    <div className="w-full bg-white">
      <div className="w-full pt-6">
        <div className="mx-auto w-full max-w-[1292px] px-4">
          <div className="relative h-[622px] w-full">
            <div className="relative h-full w-full overflow-hidden rounded-[20px] bg-[linear-gradient(90deg,#96E9FB_0%,#ABECD6_100%)]">
              <div className="relative z-10 flex h-full w-full items-center">
                <div className="flex w-full flex-col justify-center px-6 md:max-w-[560px] md:px-0 md:pl-[120px]">
                  <div className="text-base font-bold tracking-[0.1px] text-[#2A7CC7]">
                    SUMMER 2020
                  </div>

                  <h1 className="mt-4 text-[58px] font-bold leading-[80px] tracking-[0.2px] text-[#252B42] md:whitespace-nowrap">
                    NEW COLLECTION
                  </h1>

                  <p className="mt-4 max-w-[376px] text-base leading-7 tracking-[0.2px] text-[#737373]">
                    We know how large objects will act, but things on a small scale.
                  </p>

                  <Link
                    to="/shop"
                    className="mt-8 inline-flex h-14 w-fit items-center justify-center rounded-[5px] bg-[#23A6F0] px-10 text-sm font-bold tracking-[0.2px] text-white"
                  >
                    SHOP NOW
                  </Link>
                </div>
              </div>
            </div>

            <img
              src={heroImg}
              alt=""
              className="pointer-events-none absolute bottom-0 right-0 z-20 h-[619px] w-[740px] object-contain object-bottom md:right-[-90px]"
            />
          </div>
        </div>
      </div>

      <div className="w-full py-12">
        <div className="mx-auto flex h-[175px] w-full max-w-[1050px] flex-wrap items-center justify-between gap-y-8 px-4 md:px-0">
          {brands.map((x, i) => (
            <img key={i} src={x} alt="" className="h-10 w-auto opacity-60" />
          ))}
        </div>
      </div>

      <div className="w-full py-10 md:h-[732px] md:py-20">
        <div className="mx-auto w-full max-w-[1440px] px-4">
          <div className="mx-auto w-full max-w-[1198px]">
            <div className="flex w-full flex-col gap-[30px] md:flex-row">
              <TopWeekLarge img={top1} />
              <div className="flex w-full flex-col gap-[22px] md:w-[557px]">
                <TopWeekSmall img={top2} h={289} w={557} overlayW={347} overlayH={173} />
                <TopWeekSmall img={top3} h={261} w={557} overlayW={360} overlayH={153} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-14">
        <Container>
          <div className="text-center">
            <div className="text-sm font-bold tracking-[0.2px] text-[#23A6F0]">
              Featured Products
            </div>
            <div className="mt-2 text-2xl font-bold tracking-[0.2px] text-[#252B42]">
              BESTSELLER PRODUCTS
            </div>
            <div className="mt-2 text-sm tracking-[0.2px] text-[#737373]">
              Problems trying to resolve the conflict between
            </div>
          </div>

          <div className="mt-10 flex flex-wrap justify-between gap-y-12">
            {bestsellers.map((img, i) => (
              <div
                key={i}
                className="flex basis-1/2 flex-col items-center px-2 text-center md:basis-1/5 md:px-0"
              >
                <div className="h-[238px] w-[183px] overflow-hidden bg-[#F9F9F9]">
                  <img src={img} alt="" className="h-full w-full object-cover" />
                </div>

                <div className="mt-6 text-sm font-bold tracking-[0.2px] text-[#252B42]">
                  Graphic Design
                </div>
                <div className="mt-2 text-sm font-bold tracking-[0.2px] text-[#737373]">
                  English Department
                </div>

                <div className="mt-2 flex items-center gap-2 text-sm font-bold">
                  <span className="text-[#BDBDBD]">$16.48</span>
                  <span className="text-[#23856D]">$6.48</span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <span className="h-4 w-4 rounded-full bg-[#23A6F0]" />
                  <span className="h-4 w-4 rounded-full bg-[#23856D]" />
                  <span className="h-4 w-4 rounded-full bg-[#E77C40]" />
                  <span className="h-4 w-4 rounded-full bg-[#252B42]" />
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              type="button"
              className="h-[52px] rounded-[5px] border border-[#23A6F0] px-10 text-sm font-bold tracking-[0.2px] text-[#23A6F0]"
            >
              LOAD MORE PRODUCTS
            </button>
          </div>
        </Container>
      </div>

      <div className="w-full py-20">
        <Container>
          <div className="flex flex-col items-center gap-12 md:flex-row md:items-center md:gap-20">
            <div className="flex w-full max-w-[513px] gap-4">
              <div className="h-[498px] w-[217px] overflow-hidden">
                <img src={weLove1} alt="" className="h-full w-full object-cover" />
              </div>
              <div className="h-[498px] w-[280px] overflow-hidden">
                <img src={weLove2} alt="" className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="w-full max-w-[447px]">
              <div className="text-sm font-bold tracking-[0.2px] text-[#23A6F0]">
                Featured Products
              </div>
              <div className="mt-2 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
                We love what we do
              </div>

              <p className="mt-6 max-w-[320px] text-sm leading-5 tracking-[0.2px] text-[#737373]">
                Problems trying to resolve the conflict between the two major realms of
                Classical physics: Newtonian mechanics
              </p>

              <p className="mt-6 max-w-[320px] text-sm leading-5 tracking-[0.2px] text-[#737373]">
                Problems trying to resolve the conflict between the two major realms of
                Classical physics: Newtonian mechanics
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="w-full py-20">
        <Container>
          <div className="text-center">
            <div className="text-sm font-bold tracking-[0.2px] text-[#23A6F0]">
              Featured Products
            </div>
            <div className="mt-2 text-2xl font-bold tracking-[0.2px] text-[#252B42]">
              THE BEST SERVICES
            </div>
            <div className="mt-2 text-sm tracking-[0.2px] text-[#737373]">
              Problems trying to resolve the conflict between
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-12 md:flex-row md:items-start md:justify-between">
            <ServiceItem
              icon={easyWinsIcon}
              title="Easy Wins"
              text="Get your best looking smile now!"
            />
            <ServiceItem
              icon={concreteIcon}
              title="Concrete"
              text="Defalcate is most focused in helping you discover your most beautiful smile"
            />
            <ServiceItem
              icon={hackGrowthIcon}
              title="Hack Growth"
              text="Overcame any hurdle or any other problem."
            />
          </div>
        </Container>
      </div>

      <div className="w-full py-20">
        <Container>
          <div className="text-center">
            <div className="text-sm font-bold tracking-[0.2px] text-[#23A6F0]">
              Practice Advice
            </div>
            <div className="mt-2 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
              Featured Posts
            </div>
          </div>

          <div className="mt-16 flex flex-col items-center gap-8 md:flex-row md:justify-center md:gap-20">
            <PostCard img={post1} />
            <PostCard img={post2} />
          </div>
        </Container>
      </div>
    </div>
  );
}

function TopWeekLarge({ img }) {
  return (
    <div className="relative h-[400px] w-full overflow-hidden rounded-[5px] bg-[#F9F9F9] md:h-[572px] md:w-[611px]">
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />

      <div className="absolute bottom-0 left-0 h-[238px] w-[420px] bg-[rgba(45,139,192,0.75)] px-8 py-10">
        <div className="max-w-[240px] text-2xl font-bold leading-8 tracking-[0.1px] text-white">
          Top Product Of the Week
        </div>
        <button
          type="button"
          className="mt-6 inline-flex h-11 items-center justify-center rounded-[5px] border border-white px-6 text-sm font-bold tracking-[0.2px] text-white"
        >
          EXPLORE ITEMS
        </button>
      </div>
    </div>
  );
}

function TopWeekSmall({ img, h, w, overlayW, overlayH }) {
  return (
    <div
      className="relative w-full overflow-hidden rounded-[5px] bg-[#F9F9F9]"
      style={{ height: `${h}px` }}
    >
      <img src={img} alt="" className="absolute inset-0 h-full w-full object-cover" />

      <div
        className="absolute bottom-0 left-0 bg-[rgba(45,139,192,0.75)] px-6 py-7"
        style={{ width: `${overlayW}px`, height: `${overlayH}px` }}
      >
        <div className="text-sm font-bold tracking-[0.2px] text-white">
          Top Product Of the Week
        </div>
        <button
          type="button"
          className="mt-4 inline-flex h-11 items-center justify-center rounded-[5px] border border-white px-6 text-sm font-bold tracking-[0.2px] text-white"
        >
          EXPLORE ITEMS
        </button>
      </div>

      <div className="hidden md:block" style={{ width: `${w}px` }} />
    </div>
  );
}

function ServiceItem({ icon, title, text }) {
  return (
    <div className="flex w-full flex-col items-center text-center md:w-[320px]">
      <img src={icon} alt="" className="h-[72px] w-[72px]" />
      <div className="mt-6 text-base font-bold tracking-[0.1px] text-[#252B42]">
        {title}
      </div>
      <div className="mt-2 max-w-[200px] text-sm leading-5 tracking-[0.2px] text-[#737373]">
        {text}
      </div>
    </div>
  );
}

function PostCard({ img }) {
  return (
    <div className="flex h-[404px] w-full max-w-[510px] overflow-hidden rounded-[5px] bg-white shadow-[0px_2px_4px_rgba(0,0,0,0.1)]">
      <div className="relative w-[209px] flex-shrink-0">
        <img src={img} alt="" className="h-full w-full object-cover" />

        <span className="absolute left-5 top-5 rounded bg-[#E74040] px-3 py-1 text-xs font-bold text-white">
          Sale
        </span>

        <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-3">
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          >
            <Heart className="h-4 w-4 text-[#252B42]" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          >
            <ShoppingCart className="h-4 w-4 text-[#252B42]" />
          </button>
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-[0px_2px_8px_rgba(0,0,0,0.12)]"
          >
            <Eye className="h-4 w-4 text-[#252B42]" />
          </button>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-7 py-7">
        <div className="flex items-start justify-between">
          <div className="text-xs font-bold tracking-[0.2px] text-[#23A6F0]">
            English Department
          </div>

          <div className="inline-flex items-center gap-1 rounded-full bg-[#252B42] px-3 py-1 text-xs font-bold text-white">
            <Star className="h-4 w-4 text-[#FFCE31]" />
            4.9
          </div>
        </div>

        <div className="mt-3 text-xl font-bold tracking-[0.2px] text-[#252B42]">
          Graphic Design
        </div>

        <div className="mt-3 max-w-[260px] text-sm leading-5 tracking-[0.2px] text-[#737373]">
          We focus on ergonomics and meeting you where you work. It's only a keystroke
          away.
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold text-[#737373]">
          <Download className="h-4 w-4" />
          <span>15 Sales</span>
        </div>

        <div className="mt-4 flex items-center gap-2 text-sm font-bold">
          <span className="text-[#BDBDBD]">$16.48</span>
          <span className="text-[#23856D]">$6.48</span>
        </div>

        <div className="mt-4 flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-[#23A6F0]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#23856D]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#E77C40]" />
          <span className="h-2.5 w-2.5 rounded-full bg-[#252B42]" />
        </div>

        <div className="mt-5 flex items-center gap-5 text-xs font-bold text-[#737373]">
          <span className="inline-flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#23A6F0]" />
            22h...
          </span>
          <span className="inline-flex items-center gap-2">
            <BarChart2 className="h-4 w-4 text-[#E77C40]" />
            64 Lessons
          </span>
          <span className="inline-flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-[#23856D]" />
            Progress
          </span>
        </div>

        <Link
          to="/blog"
          className="mt-auto inline-flex h-11 w-fit items-center gap-2 rounded-full border border-[#23A6F0] px-6 text-sm font-bold tracking-[0.2px] text-[#23A6F0]"
        >
          Learn More <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
