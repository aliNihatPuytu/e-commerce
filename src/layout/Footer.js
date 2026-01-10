import { Facebook, Instagram, Twitter } from "lucide-react";
import Container from "./Container";

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center bg-white">
      <div className="w-full border-t border-[#E6E6E6]">
        <Container className="flex items-center justify-between py-10">
          <div className="text-2xl font-bold text-[#252B42]">Bandage</div>
          <div className="flex items-center gap-4 text-[#23A6F0]">
            <Facebook className="h-5 w-5" />
            <Instagram className="h-5 w-5" />
            <Twitter className="h-5 w-5" />
          </div>
        </Container>
      </div>

      <div className="w-full">
        <Container className="flex flex-col gap-10 pb-10 pt-6 lg:flex-row lg:items-start lg:justify-between">
          <FooterCol
            title="Company Info"
            items={["About Us", "Carrier", "We are hiring", "Blog"]}
          />
          <FooterCol
            title="Legal"
            items={["About Us", "Carrier", "We are hiring", "Blog"]}
          />
          <FooterCol
            title="Features"
            items={[
              "Business Marketing",
              "User Analytic",
              "Live Chat",
              "Unlimited Support",
            ]}
          />
          <FooterCol
            title="Resources"
            items={["IOS & Android", "Watch a Demo", "Customers", "API"]}
          />

          <div className="flex w-full flex-col gap-4 lg:w-[320px]">
            <div className="text-base font-bold text-[#252B42]">Get In Touch</div>
            <div className="flex w-full flex-col overflow-hidden rounded-md border border-[#E6E6E6] sm:flex-row">
              <input
                className="flex-1 bg-[#F9F9F9] px-4 py-3 text-sm text-[#737373] outline-none"
                placeholder="Your Email"
              />
              <button
                type="button"
                className="bg-[#23A6F0] px-6 py-3 text-sm font-semibold text-white"
              >
                Subscribe
              </button>
            </div>
            <div className="text-xs text-[#737373]">Lore imp sum dolor Amit</div>
          </div>
        </Container>
      </div>

      <div className="w-full bg-[#FAFAFA]">
        <Container className="py-6">
          <div className="text-sm font-semibold text-[#737373]">
            Made With Love By Finland All Right Reserved
          </div>
        </Container>
      </div>
    </footer>
  );
}

function FooterCol({ title, items }) {
  return (
    <div className="flex flex-col gap-3">
      <div className="text-base font-bold text-[#252B42]">{title}</div>
      <div className="flex flex-col gap-2">
        {items.map((x) => (
          <a key={x} href="#" className="text-sm font-semibold text-[#737373]">
            {x}
          </a>
        ))}
      </div>
    </div>
  );
}
