import { useParams, Link } from "react-router";
import { useEffect, useMemo, useState } from "react";
import {
  Calendar,
  ArrowLeft,
  Share2,
  Check,
  Facebook,
  Twitter,
  Linkedin,
  ArrowRight,
} from "lucide-react";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { useTranslation } from "react-i18next";
import {
  useCmsDepartmentActivity,
  useCmsDepartmentActivities,
} from "../data/sanityDepartmentResources";
import { getDepartmentResources } from "../data/departmentResources";
import { ImageLightbox, LightboxImage } from "../components/ui/ImageLightbox";
import { PortableContent } from "../components/ui/PortableContent";

export function DepartmentActivityDetail() {
  const { deptId, slug } = useParams<{ deptId: string; slug: string }>();
  const { t } = useTranslation("home");
  const [copied, setCopied] = useState(false);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const activity = useCmsDepartmentActivity(slug);
  const allActivities = useCmsDepartmentActivities(deptId);
  const fallbackDept = deptId ? getDepartmentResources(t)[deptId] : undefined;
  const heroImage = activity?.image || fallbackDept?.image;

  const relatedActivities = useMemo(() => {
    if (!allActivities || !activity) return [];
    return allActivities.filter((a) => a.slug !== activity.slug).slice(0, 3);
  }, [allActivities, activity]);

  const allArticleImages: LightboxImage[] = useMemo(() => {
    if (!heroImage) return [];
    return [{ src: heroImage, alt: activity?.title || "" }];
  }, [heroImage, activity]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!activity) {
    return (
      <main className="bg-white min-h-[50vh] flex items-center justify-center">
        <p className="text-[#4A4A4A] text-lg font-semibold animate-pulse">
          {t("departmentResourcesUI.loading", "Loading...")}
        </p>
      </main>
    );
  }

  return (
    <WatermarkSection className="bg-white min-h-screen">
      {/* Main Single-Column Article Content */}
      <article className="py-6 lg:py-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            to={`/departments/${deptId}/resources`}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E6132] hover:text-[#8B6543] active:text-[#8B6543] transition-colors mb-4"
          >
            <ArrowLeft size={13} /> {t("departmentResourcesUI.backToDepartments", "Back to Department")}
          </Link>

          {/* Article Title */}
          <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#111827] leading-snug mb-2">
            {activity.title}
          </h1>

          {/* Article Date & Meta */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-[#4E6132] mb-4">
            <div className="flex items-center gap-1 hover:text-[#8B6543] cursor-default transition-colors">
              <Calendar size={13} className="text-[#4E6132]" />
              <span>{activity.date}</span>
            </div>
            {activity.author && (
              <>
                <span className="text-[#4E6132]/40">•</span>
                <span className="hover:text-[#8B6543] transition-colors">
                  {t("newsroom.byAuthor", { defaultValue: "By {{author}}", author: activity.author })}
                </span>
              </>
            )}
          </div>

          {/* Main Hero Image */}
          {heroImage && (
            <div className="mb-4">
              <div
                onClick={() => setSelectedImgIdx(0)}
                className="rounded-none overflow-hidden shadow-sm bg-[#EDF1F7] mb-1.5 aspect-[16/10] cursor-pointer hover:opacity-95 transition-opacity"
              >
                <img
                  src={heroImage}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <p className="text-xs text-[#6B7280] leading-normal border-b border-[#4E6132]/10 pb-2">
                {activity.imageCaption || `${activity.title} — Conseil Protestant du Rwanda.`}
              </p>
            </div>
          )}

          {/* Article Body */}
          <div className="space-y-3 text-[#374151] text-sm sm:text-base leading-relaxed mt-6">
            {activity.bodyBlocks && activity.bodyBlocks.length > 0 ? (
              <PortableContent blocks={activity.bodyBlocks} />
            ) : (
              <p>{activity.excerpt}</p>
            )}
          </div>

          {/* Pullquote if available */}
          {activity.quote && (
            <blockquote className="my-4 border-l-4 border-[#8B6543] bg-[#F8F9FA] p-4 rounded-r-none text-sm sm:text-base font-['Outfit'] font-bold text-[#4E6132] italic leading-snug shadow-sm">
              “{activity.quote}”
            </blockquote>
          )}

          {/* Share & Action Bar */}
          <div className="mt-6 pt-4 border-t border-[#4E6132]/10 flex flex-wrap items-center justify-between gap-3">
            <Link
              to={`/departments/${deptId}/resources`}
              className="inline-flex items-center gap-1.5 bg-[#BC8A5F] text-white text-xs font-bold px-4 py-2 rounded-none hover:bg-[#4E6132] transition-colors shadow-sm"
            >
              <ArrowLeft size={14} /> {t("departmentResourcesUI.backToDepartments", "Back to Department")}
            </Link>

            <div className="flex items-center gap-3">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4E6132] flex items-center gap-1.5">
                <Share2 size={14} className="text-[#8B6543]" /> {t("newsroom.shareLabel", "Share:")}
              </span>
              <button
                onClick={handleCopyLink}
                className="inline-flex items-center gap-1.5 bg-[#F8F9FA] text-[#4E6132] border border-[#4E6132]/20 hover:bg-[#BC8A5F] hover:text-white px-3 py-1.5 rounded-none text-xs font-bold transition-all"
              >
                {copied ? <Check size={14} className="text-green-500" /> : <Share2 size={14} />}
                <span>{copied ? t("newsroom.copied", "Copied!") : t("newsroom.shareBtn", "Share")}</span>
              </button>
              <a
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(activity.title)}`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-[#F8F9FA] border border-[#4E6132]/20 flex items-center justify-center text-[#4E6132] hover:bg-[#BC8A5F] hover:text-white transition-colors"
              >
                <Twitter size={14} />
              </a>
              <a
                href={`https://www.facebook.com/sharer/sharer.php`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-[#F8F9FA] border border-[#4E6132]/20 flex items-center justify-center text-[#4E6132] hover:bg-[#BC8A5F] hover:text-white transition-colors"
              >
                <Facebook size={14} />
              </a>
              <a
                href={`https://www.linkedin.com/shareArticle`}
                target="_blank"
                rel="noreferrer"
                className="w-8 h-8 rounded-none bg-[#F8F9FA] border border-[#4E6132]/20 flex items-center justify-center text-[#4E6132] hover:bg-[#BC8A5F] hover:text-white transition-colors"
              >
                <Linkedin size={14} />
              </a>
            </div>
          </div>
        </div>
      </article>

      {/* Bottom Related Stories Grid */}
      {relatedActivities.length > 0 && (
        <section className="py-12 bg-[#F8F9FA] border-t border-[#4E6132]/10">
          <div className="max-w-6xl mx-auto px-6 lg:px-8">
            <h3 className="font-['Outfit'] font-bold text-2xl text-[#4E6132] mb-8">
              {t("departmentResourcesUI.otherActivities", "More Activities & Milestones")}
            </h3>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
              {relatedActivities.map((item) => (
                <article
                  key={item.slug}
                  className="bg-white rounded-none overflow-hidden shadow-sm border border-[#4E6132]/10 flex flex-col h-full max-w-[360px] mx-auto w-full"
                >
                  {item.image && (
                    <Link to={`/departments/${deptId}/activities/${item.slug}`} className="block aspect-[16/10] overflow-hidden rounded-none bg-[#EDF1F7] relative">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover"
                      />
                    </Link>
                  )}

                  <div className="p-5 lg:p-6 flex flex-col grow">
                    <div className="text-xs font-semibold text-[#4E6132] mb-2.5">
                      {item.date}
                    </div>
                    <h4 className="font-['Outfit'] font-bold text-lg lg:text-xl text-[#4E6132] mb-3 leading-snug hover:text-[#8B6543] transition-colors line-clamp-3">
                      <Link to={`/departments/${deptId}/activities/${item.slug}`}>
                        {item.title}
                      </Link>
                    </h4>
                    <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 grow">
                      {item.excerpt}
                    </p>
                    <div className="mt-auto">
                      <Link
                        to={`/departments/${deptId}/activities/${item.slug}`}
                        className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-semibold text-[#4E6132] hover:text-[#8B6543] transition-colors"
                      >
                        {t("newsroom.readMore", "Read more")} <ArrowRight size={14} />
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {allArticleImages.length > 0 && (
        <ImageLightbox
          images={allArticleImages}
          selectedIndex={selectedImgIdx}
          onClose={() => setSelectedImgIdx(null)}
        />
      )}
    </WatermarkSection>
  );
}
