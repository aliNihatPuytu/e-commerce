import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

import aboutHero from "../assets/about-hero.png";
import aboutVideo from "../assets/about-video.png";
import ctaImg from "../assets/images/shop-page/product-8.png";

import t1 from "../assets/images/team-page/team-user-1.jpg";
import t2 from "../assets/images/team-page/team-user-2.jpg";
import t3 from "../assets/images/team-page/team-user-3.jpg";

import fbIcon from "../assets/images/home-page/facebook.png";
import igIcon from "../assets/images/home-page/instagram.png";
import twIcon from "../assets/images/home-page/twitter.png";

import brand1 from "../assets/images/home-page/brand-1.png";
import brand2 from "../assets/images/home-page/brand-2.png";
import brand3 from "../assets/images/home-page/brand-3.png";
import brand4 from "../assets/images/home-page/brand-4.png";
import brand5 from "../assets/images/home-page/brand-5.png";
import brand6 from "../assets/images/home-page/brand-6.png";

const team = [
  { id: 1, name: "Username", role: "Profession", img: t1 },
  { id: 2, name: "Username", role: "Profession", img: t2 },
  { id: 3, name: "Username", role: "Profession", img: t3 },
];

const brands = [brand1, brand2, brand3, brand4, brand5, brand6];

export default function AboutPage() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[414px] px-[13px] md:max-w-[1050px] md:px-4">
        <div className="pb-8 pt-10 md:pb-16 md:pt-20">
          <div className="grid grid-cols-1 items-center gap-10 md:grid-cols-[1fr_510px] md:gap-16">
            <div className="text-center md:text-left">
              <div className="text-xs font-bold tracking-[0.2px] text-[#737373] md:text-sm">
                ABOUT COMPANY
              </div>

              <div className="mt-4 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                ABOUT US
              </div>

              <div className="mt-4 text-sm tracking-[0.2px] text-[#737373] md:max-w-[360px] md:text-[20px] md:leading-[30px]">
                We know how large objects will act,
                <br className="hidden md:block" />
                but things on a small scale
              </div>

              <button
                type="button"
                className="mt-7 h-[52px] w-[186px] rounded-[5px] bg-[#23A6F0] text-sm font-bold tracking-[0.2px] text-white"
              >
                Get Quote Now
              </button>

              <div className="mt-6 flex items-center justify-center gap-2 text-sm font-bold tracking-[0.2px] md:justify-start">
                <Link to="/" className="text-[#252B42]">
                  Home
                </Link>
                <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
                <span className="text-[#737373]">About</span>
              </div>
            </div>

            <div className="relative mx-auto w-full max-w-[510px]">
              <div className="absolute right-[-34px] top-8 h-[340px] w-[340px] rounded-full bg-[#FFE9EA] md:right-[-90px] md:top-10 md:h-[450px] md:w-[450px]" />
              <div className="absolute left-6 top-0 h-14 w-14 rounded-full bg-[#FFE9EA] md:left-10 md:top-2 md:h-16 md:w-16" />
              <div className="absolute left-0 top-[150px] h-16 w-16 rounded-full bg-[#FFE9EA] md:left-2 md:top-[180px] md:h-20 md:w-20" />

              <div className="absolute left-12 top-[210px] h-3 w-3 rounded-full bg-[#977DF4] md:left-16 md:top-[250px]" />
              <div className="absolute left-4 top-[320px] h-2 w-2 rounded-full bg-[#977DF4] md:left-6 md:top-[380px]" />
              <div className="absolute right-12 top-[110px] h-2 w-2 rounded-full bg-[#977DF4] md:right-16 md:top-[140px]" />
              <div className="absolute right-4 top-[260px] h-3 w-3 rounded-full bg-[#23A6F0] md:right-8 md:top-[310px]" />

              <img src={aboutHero} alt="About hero" className="relative z-10 w-full" />
            </div>
          </div>
        </div>

        <div className="py-12 md:py-20">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-10">
            <div>
              <div className="text-sm font-bold tracking-[0.2px] text-[#E74040]">Problems trying</div>
              <div className="mt-3 max-w-[420px] text-[24px] font-bold leading-[32px] tracking-[0.2px] text-[#252B42]">
                Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
              </div>
            </div>

            <div className="max-w-[520px] text-sm tracking-[0.2px] text-[#737373] md:pt-7">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </div>
          </div>
        </div>

        <div className="pb-12 md:pb-20">
          <div className="grid grid-cols-2 gap-y-10 text-center md:grid-cols-4 md:gap-y-0">
            <Stat value="15K" label="Happy Customers" />
            <Stat value="150K" label="Monthly Visitors" />
            <Stat value="15" label="Countries Worldwide" />
            <Stat value="100+" label="Top Partners" />
          </div>
        </div>

        <div className="pb-14 md:pb-24">
          <div className="relative mx-auto w-full overflow-hidden rounded-2xl md:max-w-[989px]">
            <img src={aboutVideo} alt="About video" className="h-[316px] w-full object-cover md:h-[540px]" />
            <div className="absolute inset-0 flex items-center justify-center">
              <button
                type="button"
                className="flex h-16 w-16 items-center justify-center rounded-full bg-[#23A6F0] md:h-20 md:w-20"
                aria-label="Play"
              >
                <div className="h-0 w-0 translate-x-[2px] border-y-[10px] border-y-transparent border-l-[16px] border-l-white md:border-y-[12px] md:border-l-[18px]" />
              </button>
            </div>
          </div>
        </div>

        <div className="pb-14 md:pb-24">
          <div className="text-center">
            <div className="text-[30px] font-bold tracking-[0.2px] text-[#252B42] md:text-[40px] md:leading-[50px]">
              Meet Our Team
            </div>
            <div className="mx-auto mt-3 max-w-[470px] text-sm tracking-[0.2px] text-[#737373]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </div>
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-12 md:mt-20 md:grid-cols-3 md:gap-x-10 md:gap-y-0">
            {team.map((m) => (
              <TeamMiniCard key={m.id} img={m.img} name={m.name} role={m.role} />
            ))}
          </div>
        </div>

        <div className="pb-16 md:pb-24">
          <div className="text-center">
            <div className="text-[30px] font-bold tracking-[0.2px] text-[#252B42] md:text-[40px] md:leading-[50px]">
              Big Companies Are Here
            </div>
            <div className="mx-auto mt-3 max-w-[470px] text-sm tracking-[0.2px] text-[#737373]">
              Problems trying to resolve the conflict between the two major realms of Classical physics: Newtonian mechanics
            </div>
          </div>

          <div className="mx-auto mt-10 grid max-w-[327px] grid-cols-1 justify-items-center gap-y-[60px] md:mt-16 md:max-w-[900px] md:grid-cols-6 md:gap-x-10 md:gap-y-0">
            {brands.map((b, i) => (
              <img key={i} src={b} alt="" className="h-8 object-contain md:h-10" />
            ))}
          </div>
        </div>
      </div>

      <div className="w-full bg-white">
        <div className="mx-auto w-full max-w-[414px] md:max-w-[1440px]">
          <div className="flex w-full flex-col md:flex-row">
            <div className="w-full bg-[#2A7CC7] md:w-1/2">
              <div className="flex min-h-[520px] items-center px-[13px] md:min-h-[640px] md:px-0">
                <div className="mx-auto w-full max-w-[420px] text-center text-white md:text-left">
                  <div className="text-sm font-bold tracking-[0.2px] opacity-95">WORK WITH US</div>
                  <div className="mt-4 text-[40px] font-bold leading-[50px] tracking-[0.2px] md:text-[58px] md:leading-[80px]">
                    Now Let’s grow Yours
                  </div>
                  <div className="mt-4 text-sm tracking-[0.2px] opacity-95 md:text-base">
                    The gradual accumulation of information about atomic and small-scale behavior during the first quarter of the 20th
                  </div>

                  <button
                    type="button"
                    className="mt-8 h-[52px] w-[186px] rounded-[5px] border border-white text-sm font-bold tracking-[0.2px] text-white"
                  >
                    Button
                  </button>
                </div>
              </div>
            </div>

            <div className="w-full md:w-1/2">
              <img src={ctaImg} alt="CTA" className="h-[520px] w-full object-cover md:h-[640px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, label }) {
  return (
    <div className="flex flex-col items-center">
      <div className="text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">{value}</div>
      <div className="mt-1 text-sm font-bold tracking-[0.2px] text-[#737373]">{label}</div>
    </div>
  );
}

function TeamMiniCard({ img, name, role }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="w-full overflow-hidden bg-[#F9F9F9]">
        <img src={img} alt={name} className="h-[231px] w-full object-cover" />
      </div>

      <div className="mt-6 text-sm font-bold tracking-[0.2px] text-[#252B42]">{name}</div>
      <div className="mt-1 text-xs font-semibold tracking-[0.2px] text-[#737373]">{role}</div>

      <div className="mt-3 flex items-center justify-center gap-4">
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
          <img src={fbIcon} alt="" className="h-6 w-6" />
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">
          <img src={igIcon} alt="" className="h-6 w-6" />
        </a>
        <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
          <img src={twIcon} alt="" className="h-6 w-6" />
        </a>
      </div>
    </div>
  );
}
