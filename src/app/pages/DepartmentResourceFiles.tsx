import { useParams, Link } from "react-router";
import { ArrowLeft, FileText, Folder } from "lucide-react";
import { getDepartmentResources } from "../data/departmentResources";
import { useTranslation } from "react-i18next";
import { WatermarkSection } from "../components/ui/WatermarkBackground";
import { useCmsResourceFiles } from "../data/sanityDepartmentResources";

export function DepartmentResourceFiles() {
  const { t } = useTranslation("home");
  const { deptId, resourceSlug } = useParams<{ deptId: string; resourceSlug: string }>();
  const departmentResources = getDepartmentResources(t);
  const dept = deptId ? departmentResources[deptId] : undefined;
  const resource = dept?.resources.find((r) => r.slug === resourceSlug);
  const cmsFiles = useCmsResourceFiles(resourceSlug);
  const files = cmsFiles && cmsFiles.length > 0 ? cmsFiles : resource?.files ?? [];

  if (!dept) {
    return (
      <main className="bg-white min-h-[60vh] flex items-center justify-center">
        <div className="text-center px-6">
          <p className="text-[#4A4A4A] text-lg mb-4">{t("departmentResourcesUI.notFoundTitle")}</p>
          <Link to="/departments" className="text-[#4E6132] font-bold hover:text-[#8B6543]">
            ← {t("departmentResourcesUI.backToDepartments")}
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-white min-h-screen">
      {/* Header */}
      <div className="bg-[#4E6132] relative overflow-hidden py-14 lg:py-16 px-6 lg:px-12">
        {/* Decorative circles */}
        <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 pointer-events-none" />
        <div className="absolute -bottom-20 -left-20 w-60 h-60 rounded-full bg-white/5 pointer-events-none" />

        <div className="max-w-5xl mx-auto relative z-10">
          <Link
            to={`/departments/${dept.id}/resources`}
            className="inline-flex items-center gap-2 text-white/70 hover:text-white text-sm font-semibold mb-6 transition-colors"
          >
            <ArrowLeft size={16} /> {t("departmentResourcesUI.backTo")} {dept.title} {t("departmentResourcesUI.resources")}
          </Link>
          <h1 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-3">
            {resource?.title ?? resourceSlug}
          </h1>
          {resource?.description && (
            <p className="text-white/75 text-base leading-relaxed max-w-2xl">
              {resource.description}
            </p>
          )}
        </div>
      </div>

      {/* File table */}
      <WatermarkSection className="py-14 lg:py-20 bg-white">
        <div className="max-w-5xl mx-auto px-6 lg:px-8">
          {/* Breadcrumb bar */}
          <div className="bg-[#F5F5DC] rounded-t-2xl px-6 py-3.5 border border-[#4E6132]/10 border-b-0 flex items-center gap-2 text-sm">
            <Link to={`/departments/${dept.id}/resources`} className="text-[#8B6543] font-semibold hover:text-[#4E6132]">
              {t("departmentResourcesUI.documents")}
            </Link>
            <span className="text-[#4A4A4A]/40">/</span>
            <span className="text-[#4E6132] font-bold">{resource?.title ?? resourceSlug}</span>
          </div>

          <div className="bg-[#F8F9F4] rounded-b-2xl border border-[#4E6132]/10 overflow-hidden">
            {/* Table header */}
            <div className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3.5 bg-[#4E6132]/5 border-b border-[#4E6132]/10 text-xs font-bold uppercase tracking-wider text-[#8B6543]">
              <span>{t("departmentResourcesUI.title")}</span>
              <span className="hidden sm:block w-20 text-right">{t("departmentResourcesUI.info")}</span>
              <span className="hidden sm:block w-28 text-right">{t("departmentResourcesUI.modified")}</span>
            </div>

            {files.length === 0 ? (
              <div className="px-6 py-14 text-center">
                <Folder size={32} className="text-[#4E6132]/20 mx-auto mb-3" />
                <p className="text-[#4A4A4A]/60 text-sm">
                  {t("departmentResourcesUI.noFiles")}
                </p>
              </div>
            ) : (
              files.map((file, i) => (
                <a
                  key={i}
                  href={file.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid grid-cols-[1fr_auto_auto] gap-4 px-6 py-3.5 items-center hover:bg-[#4E6132]/5 transition-colors border-b border-[#4E6132]/5 last:border-b-0 group"
                >
                  <span className="flex items-center gap-3 text-[#4E6132] font-semibold text-sm">
                    <FileText size={16} className="text-[#8B6543] flex-shrink-0" />
                    {file.name}
                  </span>
                  <span className="hidden sm:block w-20 text-right text-xs text-[#4A4A4A]/60">{file.info || "—"}</span>
                  <span className="hidden sm:block w-28 text-right text-xs text-[#4A4A4A]/60">{file.modified || "—"}</span>
                </a>
              ))
            )}
          </div>
        </div>
      </WatermarkSection>
    </main>
  );
}
