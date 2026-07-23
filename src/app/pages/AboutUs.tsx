import { Link } from "react-router";

export function AboutUs() {
  return (
    <main className="bg-white">
      {/* Hero */}
      <div 
        className="relative h-[340px] flex items-center justify-center text-center text-white bg-[#4E6132]"
        style={{
          backgroundImage: "linear-gradient(rgba(78,97,50,0.85), rgba(78,97,50,0.85)), url('/assets/CPR 3 - Copy.webp')",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <h1 className="font-['Outfit'] text-4xl lg:text-5xl font-black relative z-10 text-white">Who We Are</h1>
      </div>

      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4 text-sm text-[#4A4A4A]/70">
        <Link to="/" className="text-[#8B6543] hover:underline font-semibold">Home</Link> <span className="mx-2">/</span> Who We Are
      </div>

      {/* About */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">About CPR</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-6">About Conseil Protestant du Rwanda</h2>
          <div className="max-w-3xl text-[#4A4A4A] text-lg leading-relaxed space-y-4">
            <p>The Protestant Council of Rwanda (CPR) was established in 1963 to promote and share innovative development initiatives and deliver essential services to our member churches and the wider community.</p>
            <p>We are committed to developing strong, impactful partnerships and providing world-class services to those we work with, fostering faith, unity, and sustainable development across Rwanda.</p>
          </div>
        </div>
      </section>

      {/* Vision / Mission */}
      <section className="py-16 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid md:grid-cols-2 gap-12">
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">Our Vision</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132] mb-4">Our Vision</h2>
            <p className="text-[#4A4A4A] leading-relaxed">A united, faithful, and prosperous Rwandan society where every individual lives in dignity and peace.</p>
          </div>
          <div>
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">Our Mission</span>
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132] mb-4">Our Mission</h2>
            <p className="text-[#4A4A4A] leading-relaxed">To bring together Protestant churches in Rwanda for a coordinated impact in evangelization, education, health, and holistic socio-economic development.</p>
          </div>
        </div>
      </section>

      {/* Model */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
           <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">Our Model</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132] mb-4">Our Model</h2>
          <p className="text-[#4A4A4A] max-w-3xl leading-relaxed">We operate through a collaborative partnership structure, engaging our 19 member churches to deploy community-focused programs. Our funding model leverages both local contributions and international partnerships to ensure the sustainability of our initiatives.</p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-[#4E6132]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#EAD196]" />
            <span className="text-[#EAD196] text-xs font-bold uppercase tracking-widest">Our Values</span>
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-white mb-10">Our Core Values</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Faith", desc: "Rooted in our Christian beliefs, faith guides all our actions and decisions." },
              { title: "Unity", desc: "Bringing together diverse denominations to speak and act with one voice." },
              { title: "Integrity", desc: "Upholding transparency and accountability in all our operations." },
              { title: "Service", desc: "Dedicated to serving the most vulnerable communities with compassion." },
              { title: "Excellence", desc: "Striving for the highest quality in our education, health, and development programs." }
            ].map((val, i) => (
              <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-2xl text-white hover:bg-white/10 transition-colors">
                <h3 className="font-['Outfit'] font-bold text-xl text-[#EAD196] mb-3">{val.title}</h3>
                <p className="text-white/80 text-sm leading-relaxed">{val.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-[#F8F9FA]">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="h-px w-10 bg-[#8B6543]" />
              <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">Leadership</span>
              <div className="h-px w-10 bg-[#8B6543]" />
            </div>
            <h2 className="font-['Outfit'] font-black text-3xl lg:text-4xl text-[#4E6132] mb-4">Our Team</h2>
            <p className="text-[#4A4A4A] max-w-2xl mx-auto">Our dedicated team of professionals and church leaders brings expertise from across various sectors to drive CPR's mission forward.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: "Rev. Dr. Samuel", role: "President", img: "/assets/CPR 3 - Copy.webp" },
              { name: "Pastor Michel", role: "General Secretary", img: "/assets/Gahini 3.webp" },
              { name: "Dr. Marie", role: "Head of Health", img: "/assets/Ensemble-Biryogo-juillet-2019-copy-1048x480.webp" },
              { name: "Mr. Jean", role: "Head of Education", img: "/assets/Gahini 2.webp" },
            ].map((member, i) => (
              <div key={i} className="text-center group">
                <div className="relative w-full aspect-[3/4] mb-4 rounded-2xl overflow-hidden bg-[#EDF1F7] border border-[#4E6132]/10">
                  <img src={member.img} alt={member.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <h3 className="font-['Outfit'] font-bold text-[#4E6132] text-lg">{member.name}</h3>
                <span className="text-[#8B6543] text-sm font-semibold">{member.role}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
           <div className="inline-flex items-center gap-2 mb-4">
            <div className="h-px w-10 bg-[#8B6543]" />
            <span className="text-[#8B6543] text-xs font-bold uppercase tracking-widest">Collaborations</span>
            <div className="h-px w-10 bg-[#8B6543]" />
          </div>
          <h2 className="font-['Outfit'] font-black text-3xl text-[#4E6132] mb-10">Our Partners</h2>
          <div className="flex flex-wrap justify-center items-center gap-12 lg:gap-20 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">WCC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">AACC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">FECLAC</div>
            <div className="text-2xl font-black font-['Outfit'] text-[#4E6132]">CBF</div>
          </div>
        </div>
      </section>
    </main>
  );
}
