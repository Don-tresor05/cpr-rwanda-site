import { useParams, Link } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ArrowRight, CheckCircle2, FileText } from "lucide-react";
import { useScrollReveal } from "../hooks/useScrollReveal";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { ScrollIndicator } from "../components/ui/ScrollIndicator";
import { getDepartmentResources } from "../data/departmentResources";
import { useTranslation } from "react-i18next";
import { useCmsResourceGroups } from "../data/sanityDepartmentResources";

export function DepartmentResources() {
  const { t } = useTranslation("home");
  const { deptId } = useParams<{ deptId: string }>();
  const departmentResources = getDepartmentResources(t);
  const dept = deptId ? departmentResources[deptId] : undefined;
  const { ref: contentRef, visible: contentVisible } = useScrollReveal();
  const cmsGroups = useCmsResourceGroups(deptId);

  if (!dept) {
    return (
      <main className="bg-white min-h-screen flex items-center justify-center">
        <div className="text-center px-6">
          <h1 className="font-['Outfit'] font-black text-4xl text-[#4E6132] mb-4">
            {t("departmentResourcesUI.deptNotFoundTitle")}
          </h1>
          <p className="text-[#4A4A4A] mb-8">
            {t("departmentResourcesUI.deptNotFoundDesc")}
          </p>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 bg-[#4E6132] text-white font-bold px-6 py-3 rounded-xl hover:bg-[#3b4b26] transition-all duration-300 text-sm"
          >
            <ArrowLeft size={16} /> {t("departmentResourcesUI.backToDepartments")}
          </Link>
        </div>
      </main>
    );
  }

  const Icon = dept.icon;

  return (
    <main className="bg-white">
      {/* Hero */}
      <div
        className="relative min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)] flex items-end justify-start pb-16 px-6 lg:px-12 text-white bg-[#4E6132]"
        style={{
          backgroundImage: `linear-gradient(rgba(78,97,50,0.4), rgba(78,97,50,0.85)), url('${dept.image}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="relative z-10 max-w-7xl w-full mx-auto">
          {/* Breadcrumb */}
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={14} /> {t("departmentResourcesUI.backToDepartments")}
          </Link>

          <h1 className="font-['Outfit'] text-5xl lg:text-7xl font-black text-white drop-shadow-md">
            {dept.title}
          </h1>
        </div>
        <ScrollIndicator />
      </div>

      {/* Overview */}
      <WatermarkSection className="py-16 lg:py-20 bg-white">
        <div ref={contentRef} className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12 lg:gap-16 items-start">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={contentVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="inline-flex items-center gap-2 mb-3">
                <div className="h-px w-8" style={{ backgroundColor: dept.accent }} />
                <span
                  className="text-xs font-bold uppercase tracking-widest"
                  style={{ color: dept.accent }}
                >
                  {t("departmentResourcesUI.overview")}
                </span>
                <div className="h-px w-8" style={{ backgroundColor: dept.accent }} />
              </div>

              <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mt-2 mb-6">
                {t("departmentResourcesUI.about")} {dept.title}
              </h2>

              <p className="text-[#4A4A4A] text-lg leading-relaxed mb-8">
                {dept.overview}
              </p>

              {/* Key Activities */}
              <h3 className="font-['Outfit'] font-bold text-xl text-[#4E6132] mb-4">
                {t("departmentResourcesUI.keyActivities")}
              </h3>
              <ul className="space-y-3">
                {dept.keyActivities.map((activity, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -15 }}
                    animate={contentVisible ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.2 + idx * 0.07 }}
                    className="flex items-start gap-3 text-[#4A4A4A]"
                  >
                    <CheckCircle2
                      size={18}
                      className="mt-0.5 flex-shrink-0"
                      style={{ color: dept.accent }}
                    />
                    <span className="leading-relaxed">{activity}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Image Card */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={contentVisible ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="lg:col-span-2"
            >
              <div className="rounded-2xl overflow-hidden shadow-xl border border-[#4E6132]/10">
                <div className="relative aspect-[4/3]">
                  <img
                    src={dept.image}
                    alt={dept.title}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className="absolute inset-0"
                    style={{
                      background: `linear-gradient(135deg, ${dept.accent}30 0%, transparent 50%, ${dept.accent}15 100%)`,
                    }}
                  />
                </div>
                <div className="p-5 bg-white">
                  <div className="flex items-center gap-3 mb-2">
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{ backgroundColor: dept.accent }}
                    >
                      <Icon size={20} color="white" strokeWidth={1.5} />
                    </div>
                    <span
                      className="font-['Outfit'] font-bold text-lg"
                      style={{ color: dept.accent }}
                    >
                      {dept.title}
                    </span>
                  </div>
                  <p className="text-[#4A4A4A] text-sm leading-relaxed">
                    {t("departmentResourcesUI.partOfCpr")}
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </WatermarkSection>

      {/* Resources Section */}
      {(cmsGroups?.length || dept.resources.length > 0) && (
        <section className="py-16 lg:py-20 bg-[#F8F9F4]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-3">
                {t("departmentResourcesUI.resourcesAndDocs")}
              </h2>
              <p className="text-[#4A4A4A] max-w-xl mx-auto">
                {t("departmentResourcesUI.accessResources")} {dept.title} {t("departmentResourcesUI.department")}.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {(cmsGroups ?? dept.resources.map((r) => ({ slug: r.slug, title: r.title, description: r.description, cardType: r.type }))).map((resource, idx) => {
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: idx * 0.1 }}
                    className="group"
                  >
                    <Link
                      to={`/departments/${dept.id}/resources/${resource.slug}`}
                      className="block bg-white rounded-2xl p-6 shadow-sm border border-[#4E6132]/10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                    >
                    <div
                      className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                      style={{ backgroundColor: `${dept.accent}15`, color: dept.accent }}
                    >
                      <FileText size={22} />
                    </div>
                    <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-lg mb-2">
                      {resource.title}
                    </h3>
                    <p className="text-[#4A4A4A] text-sm leading-relaxed mb-4">
                      {resource.description}
                    </p>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider"
                      style={{ color: dept.accent }}
                    >
                      {resource.cardType === "download" ? t("departmentResourcesUI.download") : resource.cardType === "link" ? t("departmentResourcesUI.visit") : t("departmentResourcesUI.view")}
                      <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
                    </span>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* Back to Departments CTA */}
      <section className="py-16 bg-[#4E6132] relative overflow-hidden">
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5" />

        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center relative z-10">
          <h2 className="font-['Outfit'] font-black text-2xl lg:text-3xl text-white mb-4">
            {t("departmentResourcesUI.exploreMore")}
          </h2>
          <p className="text-white/70 text-lg mb-8 max-w-xl mx-auto">
            {t("departmentResourcesUI.discoverHow")}
          </p>
          <Link
            to="/departments"
            className="inline-flex items-center gap-2 bg-white text-[#4E6132] font-bold px-8 py-3.5 rounded-xl hover:bg-[#F5F5DC] transition-all duration-300 hover:scale-105 text-sm shadow-lg"
          >
            <ArrowLeft size={16} /> {t("departmentResourcesUI.allDepartments")}
          </Link>
        </div>
      </section>
    </main>
  );
}
