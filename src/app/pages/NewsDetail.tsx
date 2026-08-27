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
import { getNews, NewsArticle } from "../data/news";
import { useCmsNews } from "../data/sanityNews";
import { ImageLightbox, LightboxImage } from "../components/ui/ImageLightbox";
import { PortableContent } from "../components/ui/PortableContent";

export function NewsDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation("home");
  const [copied, setCopied] = useState(false);
  const [selectedImgIdx, setSelectedImgIdx] = useState<number | null>(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  const cmsNews = useCmsNews();
  const allNews = useMemo(() => cmsNews ?? getNews(t), [cmsNews, t]);
  const article: NewsArticle = useMemo(() => {
    if (slug) {
      const found = allNews.find((n) => n.slug === slug);
      if (found) return found;
    }
    return allNews[0];
  }, [slug, allNews]);

  const relatedNews = useMemo(() => {
    return allNews.filter((n) => n.slug !== article.slug).slice(0, 3);
  }, [allNews, article]);

  const allArticleImages: LightboxImage[] = useMemo(() => {
    const list: LightboxImage[] = [{ src: article.image, alt: article.title }];
    if (article.inlineImages) {
      article.inlineImages.forEach((img) => list.push({ src: img.src, alt: img.caption || "" }));
    }
    if (!article.inlineImages && article.secondaryImage) {
      list.push({ src: article.secondaryImage, alt: article.secondaryCaption || "" });
    }
    return list;
  }, [article]);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <WatermarkSection className="bg-white min-h-screen">
      {/* Main Single-Column Article Content (Balanced width layout) */}
      <article className="py-6 lg:py-10">
        <div className="max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            to="/newsroom"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-[#4E6132] hover:text-[#8B6543] active:text-[#8B6543] transition-colors mb-4"
          >
            <ArrowLeft size={13} /> {t("newsroom.backToNewsroom", "Back to Newsroom")}
          </Link>

          {/* Article Title */}
          <h1 className="font-['Outfit'] font-black text-2xl sm:text-3xl text-[#111827] leading-snug mb-2">
            {article.title}
          </h1>

          {/* Article Date & Meta */}
          <div className="flex items-center gap-2.5 text-xs font-semibold text-[#4E6132] mb-4">
            <div className="flex items-center gap-1 hover:text-[#8B6543] cursor-default transition-colors">
              <Calendar size={13} className="text-[#4E6132]" />
              <span>{article.date}</span>
            </div>
            {article.author && (
              <>
                <span className="text-[#4E6132]/40">•</span>
                <span className="hover:text-[#8B6543] transition-colors">{t("newsroom.byAuthor", { defaultValue: "By {{author}}", author: article.author })}</span>
              </>
            )}
          </div>

          {/* Main Hero Image - Sharp edges (rounded-none) */}
          <div
            onClick={() => setSelectedImgIdx(0)}
            className="rounded-none overflow-hidden shadow-sm bg-[#EDF1F7] mb-1.5 aspect-[16/10] cursor-pointer hover:opacity-95 transition-opacity"
          >
            <img
              src={article.image}
              alt={article.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                (e.target as HTMLImageElement).src = "/cpr/cpr/assets/CPR 3 - Copy.webp";
              }}
            />
          </div>

          {/* Image Caption */}
          <p className="text-xs text-[#6B7280] leading-normal mb-4 border-b border-[#4E6132]/10 pb-2">
            {article.imageCaption || `${article.title} — Conseil Protestant du Rwanda.`}
          </p>

          {/* Article Paragraphs - Compact font size & tight spacing */}
          <div className="space-y-3 text-[#374151] text-sm sm:text-base leading-relaxed">
            {article.bodyBlocks && article.bodyBlocks.length > 0 ? (
              <PortableContent blocks={article.bodyBlocks} />
            ) : article.paragraphs && article.paragraphs.length > 0 ? (
              <>
                {article.paragraphs.map((paragraph, idx) => {
                  const inlineImg = article.inlineImages?.find(
                    (img) => img.afterParagraphIndex === idx
                  );

                  return (
                    <div key={idx} className="space-y-3">
                      <p
                        className={
                          paragraph.startsWith("1.") || paragraph.startsWith("2.")
                            ? "pl-3 font-medium text-[#4E6132]"
                            : ""
                        }
                      >
                        {paragraph}
                      </p>

                      {/* Inline Image block with caption - sharp edges */}
                      {inlineImg && (
                        <div className="my-4">
                          <div
                            onClick={() => {
                              const imgIndex = allArticleImages.findIndex((img) => img.src === inlineImg.src);
                              if (imgIndex !== -1) setSelectedImgIdx(imgIndex);
                            }}
                            className="rounded-none overflow-hidden shadow-sm bg-[#EDF1F7] mb-1.5 aspect-[16/10] cursor-pointer hover:opacity-95 transition-opacity"
                          >
                            <img
                              src={inlineImg.src}
                              alt={inlineImg.caption || "Kwibuka event highlight"}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/cpr/cpr/assets/CPR 3 - Copy.webp";
                              }}
                            />
                          </div>
                          {inlineImg.caption && (
                            <p className="text-xs text-[#6B7280] leading-normal border-b border-[#4E6132]/10 pb-2">
                              {inlineImg.caption}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  );
                })}

                {/* Fallback for secondaryImage if inlineImages array is not provided */}
                {!article.inlineImages && article.secondaryImage && (
                  <div className="my-4">
                    <div
                      onClick={() => {
                        const imgIndex = allArticleImages.findIndex((img) => img.src === article.secondaryImage);
                        if (imgIndex !== -1) setSelectedImgIdx(imgIndex);
                      }}
                      className="rounded-none overflow-hidden shadow-sm bg-[#EDF1F7] mb-1.5 aspect-[16/10] cursor-pointer hover:opacity-95 transition-opacity"
                    >
                      <img
                        src={article.secondaryImage}
                        alt="Secondary event highlight"
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = "/cpr/cpr/assets/CPR 3 - Copy.webp";
                        }}
                      />
                    </div>
                    <p className="text-xs text-[#6B7280] leading-normal border-b border-[#4E6132]/10 pb-2">
                      {article.secondaryCaption || t("newsroom.secondaryCaption", "Secondary view during CPR commemoration.")}
                    </p>
                  </div>
                )}
              </>
            ) : (
              <p>{article.excerpt}</p>
            )}
          </div>

          {/* Pullquote if available */}
          {article.quote && (
            <blockquote className="my-4 border-l-4 border-[#8B6543] bg-[#F8F9FA] p-4 rounded-r-none text-sm sm:text-base font-['Outfit'] font-bold text-[#4E6132] italic leading-snug shadow-sm">
              “{article.quote}”
            </blockquote>
          )}

          {/* Share & Action Bar */}
          <div className="mt-6 pt-4 border-t border-[#4E6132]/10 flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/newsroom"
              className="inline-flex items-center gap-1.5 bg-[#BC8A5F] text-white text-xs font-bold px-4 py-2 rounded-none hover:bg-[#4E6132] transition-colors shadow-sm"
            >
              <ArrowLeft size={14} /> {t("newsroom.returnToNewsroom", "Return to Newsroom")}
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
                href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(article.title)}`}
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
      <section className="py-12 bg-[#F8F9FA] border-t border-[#4E6132]/10">
        <div className="max-w-6xl mx-auto px-6 lg:px-8">
          <h3 className="font-['Outfit'] font-bold text-2xl text-[#4E6132] mb-8">
            {t("newsroom.moreNews", "More News & Stories")}
          </h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
            {relatedNews.map((item) => (
              <article
                key={item.slug}
                className="bg-white rounded-none overflow-hidden shadow-sm border border-[#4E6132]/10 flex flex-col h-full max-w-[360px] mx-auto w-full"
              >
                <Link to={`/newsroom/${item.slug}`} className="block aspect-[16/10] overflow-hidden rounded-none bg-[#EDF1F7] relative">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = "/cpr/cpr/assets/CPR 3 - Copy.webp";
                    }}
                  />
                </Link>

                <div className="p-5 lg:p-6 flex flex-col grow">
                  <div className="text-xs font-semibold text-[#4E6132] mb-2.5">
                    {item.date}
                  </div>
                  <h4 className="font-['Outfit'] font-bold text-lg lg:text-xl text-[#4E6132] mb-3 leading-snug hover:text-[#8B6543] transition-colors line-clamp-3">
                    <Link to={`/newsroom/${item.slug}`}>
                      {item.title}
                    </Link>
                  </h4>
                  <p className="text-[#4A4A4A] text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 grow">
                    {item.excerpt}
                  </p>
                  <div className="mt-auto">
                    <Link
                      to={`/newsroom/${item.slug}`}
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
      <ImageLightbox
        images={allArticleImages}
        selectedIndex={selectedImgIdx}
        onClose={() => setSelectedImgIdx(null)}
      />
    </WatermarkSection>
  );
}
