import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const STORAGE_KEY = "cpr_cookie_consent";

function getStoredConsent(): CookiePreferences | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch {
    /* ignore */
  }
  return null;
}

function storeConsent(prefs: CookiePreferences) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(prefs));
}

export function CookieConsent() {
  const { t } = useTranslation("common");
  const [visible, setVisible] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [prefs, setPrefs] = useState<CookiePreferences>({
    necessary: true,
    functional: true,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    const existing = getStoredConsent();
    if (!existing) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAcceptAll = () => {
    const all: CookiePreferences = {
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    storeConsent(all);
    setVisible(false);
  };

  const handleRejectAll = () => {
    const minimal: CookiePreferences = {
      necessary: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    storeConsent(minimal);
    setVisible(false);
  };

  const handleSavePreferences = () => {
    storeConsent(prefs);
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/20 backdrop-blur-[2px] z-[9998] transition-opacity duration-500" />

      {/* Banner */}
      <div className="fixed bottom-0 inset-x-0 z-[9999] px-4 pb-4 sm:px-6 sm:pb-6 animate-slide-up">
        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
          {/* Main content */}
          <div className="p-5 sm:p-7">
            <div className="flex items-start gap-4">
              {/* Shield icon */}
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#4E6132]/10 flex items-center justify-center mt-0.5">
                <svg className="w-5 h-5 text-[#4E6132]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>

              <div className="flex-1 min-w-0">
                <h3 className="text-base sm:text-lg font-bold text-gray-900 mb-1.5">
                  {t("cookie.title")}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-4">
                  {t("cookie.description")}
                </p>

                {/* Cookie Settings Panel */}
                {showSettings && (
                  <div className="mb-4 p-4 bg-gray-50 rounded-xl border border-gray-100 space-y-3">
                    {/* Necessary */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t("cookie.essential")}</p>
                        <p className="text-xs text-gray-500">{t("cookie.essentialDesc")}</p>
                      </div>
                      <div className="w-10 h-5 bg-[#4E6132] rounded-full relative flex-shrink-0 ml-3">
                        <div className="absolute right-0.5 top-0.5 w-4 h-4 bg-white rounded-full shadow" />
                      </div>
                    </div>
                    {/* Functional */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t("cookie.functional")}</p>
                        <p className="text-xs text-gray-500">{t("cookie.functionalDesc")}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrefs((p) => ({ ...p, functional: !p.functional }))}
                        className={`w-10 h-5 rounded-full relative flex-shrink-0 ml-3 transition-colors ${prefs.functional ? "bg-[#4E6132]" : "bg-gray-300"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs.functional ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                    {/* Analytics */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t("cookie.analytics")}</p>
                        <p className="text-xs text-gray-500">{t("cookie.analyticsDesc")}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrefs((p) => ({ ...p, analytics: !p.analytics }))}
                        className={`w-10 h-5 rounded-full relative flex-shrink-0 ml-3 transition-colors ${prefs.analytics ? "bg-[#4E6132]" : "bg-gray-300"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs.analytics ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                    {/* Marketing */}
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-gray-800">{t("cookie.marketing")}</p>
                        <p className="text-xs text-gray-500">{t("cookie.marketingDesc")}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => setPrefs((p) => ({ ...p, marketing: !p.marketing }))}
                        className={`w-10 h-5 rounded-full relative flex-shrink-0 ml-3 transition-colors ${prefs.marketing ? "bg-[#4E6132]" : "bg-gray-300"}`}
                      >
                        <div className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-transform ${prefs.marketing ? "translate-x-5" : "translate-x-0.5"}`} />
                      </button>
                    </div>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2.5 sm:gap-3">
                  <button
                    type="button"
                    onClick={() => setShowSettings(!showSettings)}
                    className="text-sm font-medium text-gray-500 hover:text-gray-800 underline underline-offset-2 transition-colors order-last sm:order-first"
                  >
                    {showSettings ? t("cookie.hideSettings") : t("cookie.settings")}
                  </button>

                  <div className="flex-1" />

                  {showSettings && (
                    <button
                      type="button"
                      onClick={handleSavePreferences}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold bg-[#4E6132] text-white hover:bg-[#3d4e29] transition-colors"
                    >
                      {t("cookie.save")}
                    </button>
                  )}

                  <button
                    type="button"
                    onClick={handleRejectAll}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-gray-200 text-gray-700 hover:border-gray-300 hover:bg-gray-50 transition-colors"
                  >
                    {t("cookie.reject")}
                  </button>

                  <button
                    type="button"
                    onClick={handleAcceptAll}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border-2 border-[#4E6132] text-[#4E6132] hover:bg-[#4E6132]/5 transition-colors"
                  >
                    {t("cookie.accept")}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Trust badges */}
          <div className="px-5 sm:px-7 py-3 bg-gray-50 border-t border-gray-100 flex items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              {t("cookie.trustPrivacy")}
            </div>
            <div className="flex items-center gap-1.5 text-xs text-gray-400">
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
              {t("cookie.trustGdpr")}
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-slide-up {
          animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
      `}</style>
    </>
  );
}
