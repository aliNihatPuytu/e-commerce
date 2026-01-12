import { Link } from "react-router-dom";
import { ChevronRight, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

import hero1 from "../assets/images/team-page/hero-image-1.png";
import hero2 from "../assets/images/team-page/hero-image-2.png";
import hero3 from "../assets/images/team-page/hero-image-3.png";
import hero4 from "../assets/images/team-page/hero-image-4.png";
import hero5 from "../assets/images/team-page/hero-image-5.png";

import gokhanImg from "../assets/images/team-page/gokhan-ozdemir.jpg";
import aliImg from "../assets/images/team-page/Ali_Nihat_Puytu.JPG";

import u1 from "../assets/images/team-page/team-user-1.jpg";
import u2 from "../assets/images/team-page/team-user-2.jpg";
import u3 from "../assets/images/team-page/team-user-3.jpg";
import u4 from "../assets/images/team-page/team-user-4.jpg";
import u5 from "../assets/images/team-page/team-user-5.jpg";
import u6 from "../assets/images/team-page/team-user-6.jpg";
import u7 from "../assets/images/team-page/team-user-7.jpg";
import u8 from "../assets/images/team-page/team-user-8.jpg";
import u9 from "../assets/images/team-page/team-user-9.jpg";

import fbIcon from "../assets/images/home-page/facebook.png";
import igIcon from "../assets/images/home-page/instagram.png";
import twIcon from "../assets/images/home-page/twitter.png";

const members = [
  { id: 1, name: "Gökhan Özdemir", role: "Project Manager", img: gokhanImg },
  { id: 2, name: "Ali Nihat Puytu", role: "Full Stack Developer", img: aliImg },
  { id: 3, name: "Username", role: "Frontend Developer", img: u3 },
  { id: 4, name: "Username", role: "Backend Developer", img: u4 },
  { id: 5, name: "Username", role: "UI/UX Designer", img: u5 },
  { id: 6, name: "Username", role: "QA Engineer", img: u6 },
  { id: 7, name: "Username", role: "Data Analyst", img: u7 },
  { id: 8, name: "Username", role: "Product Designer", img: u8 },
  { id: 9, name: "Username", role: "Marketing", img: u9 },
];

export default function TeamPage() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[414px] px-[13px] md:max-w-[1050px] md:px-4">
        <div className="pb-8 pt-10 md:pb-10 md:pt-20">
          <div className="text-center">
            <div className="text-xs font-bold tracking-[0.2px] text-[#737373] md:text-sm">
              WHAT WE DO
            </div>

            <div className="mt-4 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
              Innovation tailored for you
            </div>

            <div className="mt-4 flex items-center justify-center gap-2 text-sm font-bold tracking-[0.2px]">
              <Link to="/" className="text-[#252B42]">
                Home
              </Link>
              <ChevronRight className="h-4 w-4 text-[#BDBDBD]" />
              <span className="text-[#737373]">Team</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[414px] px-[13px] md:max-w-[1440px] md:px-0">
        <div className="grid grid-cols-1 gap-2 md:grid-cols-[700px_360px_360px] md:gap-[10px]">
          <div className="w-full overflow-hidden md:row-span-2">
            <img
              src={hero1}
              alt=""
              className="h-[320px] w-full object-cover md:h-[530px] md:w-[700px]"
            />
          </div>

          <div className="overflow-hidden">
            <img
              src={hero2}
              alt=""
              className="h-[156px] w-full object-cover md:h-[260px] md:w-[360px]"
            />
          </div>

          <div className="overflow-hidden">
            <img
              src={hero3}
              alt=""
              className="h-[156px] w-full object-cover md:h-[260px] md:w-[360px]"
            />
          </div>

          <div className="overflow-hidden">
            <img
              src={hero4}
              alt=""
              className="h-[156px] w-full object-cover md:h-[260px] md:w-[360px]"
            />
          </div>

          <div className="overflow-hidden">
            <img
              src={hero5}
              alt=""
              className="h-[156px] w-full object-cover md:h-[260px] md:w-[360px]"
            />
          </div>
        </div>
      </div>

      <div className="mx-auto w-full max-w-[414px] px-[13px] md:max-w-[1050px] md:px-4">
        <div className="py-16 md:py-24">
          <div className="text-center text-[30px] font-bold tracking-[0.2px] text-[#252B42] md:text-[40px] md:leading-[50px]">
            Meet Our Team
          </div>

          <div className="mt-12 grid grid-cols-1 gap-y-16 md:mt-20 md:grid-cols-3 md:gap-x-[30px] md:gap-y-24">
            {members.map((m) => (
              <TeamCard key={m.id} img={m.img} name={m.name} role={m.role} />
            ))}
          </div>
        </div>

        <div className="pb-16 pt-4 md:pb-20 md:pt-6">
          <div className="mx-auto flex w-full flex-col items-center text-center">
            <div className="text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42]">
              Start your
              <br className="md:hidden" />
              14 days free trial
            </div>

            <div className="mt-4 max-w-[440px] text-sm tracking-[0.2px] text-[#737373]">
              Met minim Mollie non desert Alamo est sit cliquey dolor do met sent. RELIT official consequent.
            </div>

            <button
              type="button"
              className="mt-8 h-[52px] w-[186px] rounded-[5px] bg-[#23A6F0] text-sm font-bold tracking-[0.2px] text-white"
            >
              Try it free now
            </button>

            <div className="mt-10 flex items-center justify-center gap-7 text-[#23A6F0]">
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" onClick={(e) => e.preventDefault()} aria-label="Linkedin">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TeamCard({ img, name, role }) {
  return (
    <div className="flex flex-col items-center text-center">
      <div className="h-[231px] w-[329px] overflow-hidden bg-[#F9F9F9]">
        <img src={img} alt={name} className="h-full w-full object-cover" />
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
