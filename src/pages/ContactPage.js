import contactImg from "../assets/images/contact.png";
import { Phone, MapPin, Send, Twitter, Facebook, Instagram, Linkedin } from "lucide-react";

function CurvedArrow() {
  return (
    <svg
      viewBox="0 0 220 110"
      className="mx-auto h-[76px] w-[200px]"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M40 26C115 26 150 44 150 78"
        stroke="#23A6F0"
        strokeWidth="5"
        strokeLinecap="round"
      />
      <path
        d="M150 78L134 64"
        stroke="#23A6F0"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M150 78L166 64"
        stroke="#23A6F0"
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default function ContactPage() {
  return (
    <div className="w-full bg-white">
      <div className="mx-auto w-full max-w-[414px] px-[13px] md:max-w-[1050px] md:px-4">
        <div className="pb-20 pt-14 md:pb-28 md:pt-20">
          <div className="grid grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-10">
            <div className="text-center md:text-left">
              <div className="text-[14px] font-bold tracking-[0.2px] text-[#252B42]">CONTACT US</div>

              <div className="mt-6 text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[58px] md:leading-[80px]">
                Get in touch
                <br />
                today!
              </div>

              <div className="mx-auto mt-6 max-w-[300px] text-[14px] font-normal leading-5 tracking-[0.2px] text-[#737373] md:mx-0 md:max-w-[340px]">
                We know how large objects will act,
                <br />
                but things on a small scale
              </div>

              <div className="mt-8 space-y-3 text-[14px] font-bold leading-6 tracking-[0.2px] text-[#252B42]">
                <div>Phone : +451 215 215</div>
                <div>Fax : +451 215 215</div>
              </div>

              <div className="mt-10 flex items-center justify-center gap-6 text-[#252B42] md:justify-start">
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" onClick={(e) => e.preventDefault()} aria-label="Linkedin">
                  <Linkedin className="h-5 w-5" />
                </a>
              </div>
            </div>

            <div className="relative mx-auto h-[320px] w-[320px] md:h-[520px] md:w-[520px]">
              <div className="absolute right-0 top-6 h-[250px] w-[250px] rounded-full bg-[#FFE9EA] md:top-10 md:h-[430px] md:w-[430px]" />
              <div className="absolute left-[62px] top-3 h-12 w-12 rounded-full bg-[#FFE9EA] md:left-[92px] md:top-16 md:h-14 md:w-14" />
              <div className="absolute right-2 top-[92px] h-3 w-3 rounded-full bg-[#977DF4] md:right-6 md:top-[140px]" />
              <div className="absolute right-[90px] top-[160px] h-3 w-3 rounded-full bg-[#FFE9EA] md:right-[110px] md:top-[240px] md:h-4 md:w-4" />
              <div className="absolute left-[70px] top-[220px] h-3 w-3 rounded-full bg-[#977DF4] md:left-[120px] md:top-[330px]" />

              <img
                src={contactImg}
                alt="Contact"
                className="relative z-10 mx-auto h-full w-full object-contain"
              />
            </div>
          </div>
        </div>

        <div className="pb-24 md:pb-28">
          <div className="text-center">
            <div className="text-[14px] font-bold tracking-[0.2px] text-[#252B42]">VISIT OUR OFFICE</div>
            <div className="mx-auto mt-4 max-w-[520px] text-[40px] font-bold leading-[50px] tracking-[0.2px] text-[#252B42] md:text-[40px] md:leading-[50px]">
              We help small businesses
              <br />
              with big ideas
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-0">
            <div className="mx-auto flex h-[343px] w-full max-w-[328px] flex-col items-center justify-center gap-5 bg-white px-6 text-center">
              <Phone className="h-16 w-16 text-[#23A6F0]" strokeWidth={1.5} />
              <div className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#252B42]">
                georgia.young@example.com
                <br />
                georgia.young@ple.com
              </div>
              <div className="text-[16px] font-bold tracking-[0.1px] text-[#252B42]">Get Support</div>
              <button
                type="button"
                className="h-11 w-[189px] rounded-[37px] border border-[#23A6F0] text-[14px] font-bold tracking-[0.2px] text-[#23A6F0]"
              >
                Submit Request
              </button>
            </div>

            <div className="mx-auto flex h-[343px] w-full max-w-[328px] flex-col items-center justify-center gap-5 bg-[#252B42] px-6 text-center">
              <MapPin className="h-16 w-16 text-[#23A6F0]" strokeWidth={1.5} />
              <div className="text-[14px] font-bold leading-6 tracking-[0.2px] text-white">
                georgia.young@example.com
                <br />
                georgia.young@ple.com
              </div>
              <div className="text-[16px] font-bold tracking-[0.1px] text-white">Get Support</div>
              <button
                type="button"
                className="h-11 w-[189px] rounded-[37px] border border-[#23A6F0] text-[14px] font-bold tracking-[0.2px] text-[#23A6F0]"
              >
                Submit Request
              </button>
            </div>

            <div className="mx-auto flex h-[343px] w-full max-w-[328px] flex-col items-center justify-center gap-5 bg-white px-6 text-center">
              <Send className="h-16 w-16 text-[#23A6F0]" strokeWidth={1.5} />
              <div className="text-[14px] font-bold leading-6 tracking-[0.2px] text-[#252B42]">
                georgia.young@example.com
                <br />
                georgia.young@ple.com
              </div>
              <div className="text-[16px] font-bold tracking-[0.1px] text-[#252B42]">Get Support</div>
              <button
                type="button"
                className="h-11 w-[189px] rounded-[37px] border border-[#23A6F0] text-[14px] font-bold tracking-[0.2px] text-[#23A6F0]"
              >
                Submit Request
              </button>
            </div>
          </div>
        </div>

        <div className="pb-20 pt-2 md:pb-24">
          <div className="text-center">
            <div className="mb-2">
              <CurvedArrow />
            </div>

            <div className="text-[14px] font-bold tracking-[0.2px] text-[#252B42]">
              WE Can&apos;t WAIT TO MEET YOU
            </div>

            <div className="mt-4 text-[58px] font-bold leading-[80px] tracking-[0.2px] text-[#252B42]">
              Let&apos;s Talk
            </div>

            <button
              type="button"
              className="mt-6 h-[52px] w-[186px] rounded-[5px] bg-[#23A6F0] text-[14px] font-bold tracking-[0.2px] text-white"
            >
              Try it free now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
