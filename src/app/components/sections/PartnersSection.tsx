import { useTranslation } from "react-i18next";
import { useAboutPage } from "../../data/pageContent";
import { usePartners } from "../../data/cmsContent";
import { PartnersCarousel } from "../ui/PartnersCarousel";

const FALLBACK_PARTNERS = [
  { name: "WCC" },
  { name: "AACC" },
  { name: "FECCLAHA" },
  { name: "CBF" },
  { name: "PPLM" },
  { name: "RIC" },
  { name: "RICH" },
  { name: "PEACE PLAN RWANDA" },
];

interface PartnersSectionProps {
  id?: string;
}

export function PartnersSection({ id = "our-partners" }: PartnersSectionProps) {
  const { t } = useTranslation("home");
  const cms = useAboutPage();
  const cmsPartners = usePartners();

  return (
    <section id={id} className="bg-[#F8F9FA] pt-12 pb-12 lg:pt-14 lg:pb-16 scroll-mt-32 border-t border-[#8B6543]/10 w-full overflow-hidden">
      <div className="w-full">
        <div className="text-center mb-14 lg:mb-20">
          <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132]">
            {cms?.partners?.title ?? t("aboutPage.partners.title")}
          </h2>
          <p className="text-[#8B6543] font-medium mt-3 text-sm tracking-wide">
            {cms?.partners?.subtitle ?? t("aboutPage.partners.subtitle")}
          </p>
        </div>
        
        {/* Sliding Partners Carousel */}
        <PartnersCarousel
          partners={cmsPartners && cmsPartners.length > 0 ? cmsPartners : FALLBACK_PARTNERS}
        />
      </div>
    </section>
  );
}
