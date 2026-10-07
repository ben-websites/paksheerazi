import { Star, Quote, CheckCircle, ShieldCheck, Sparkles } from "lucide-react";

const REVIEWS = [
  {
    name: "Ghaffari Builders & Developers",
    role: "Govt Contractor, Gulistan-e-Jauhar, Karachi",
    text: "This is to certify that Mr. Muhammad Ikhlaq S/O Jumma Khan worked with us previous eight years as water supplier. He is a very responsible person & does his work with honesty on time. His cooperation with us in these years is highly appreciated.",
    rating: 5,
    tag: "Client Certificate (2013)",
  },
  {
    name: "Ababeel Builders & Developers",
    role: "Civil Engineering & Construction, Karachi",
    text: "Mr. Muhammad Ikhlaq worked in our organization as a water tanker supplier since 1992. He is thoroughly acquainted with the job; on only one phone call his team is ready to deliver. His supply of water is always on time, honest and hardworking.",
    rating: 5,
    tag: "Client Certificate (2017)",
  },
  {
    name: "Mari Petroleum Company Limited (MPCL)",
    role: "National Oil & Gas Exploration E&P",
    text: "Awarded annual purchase order for water disposal tankers and industrial water supply. Pak Sheerazi & Sons demonstrated full compliance with health, safety, environmental, and prompt delivery requirements.",
    rating: 5,
    tag: "Corporate Purchase Order",
  }
];

const TestimonialsSection = () => {
  return (
    <section className="section-padding bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white border-t border-sky-800/40 relative overflow-hidden">
      
      {/* Decorative Ocean Blue Ambient Lighting */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-sky-500/15 rounded-full blur-3xl pointer-events-none" />

      <div className="container-custom relative z-10">
        
        <div className="text-center max-w-2xl mx-auto mb-14">
          <span className="badge-dark-sky text-xs font-black mb-2 inline-flex items-center gap-1.5 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Trusted Across Karachi
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight">
            What Our Clients Say
          </h2>
          <p className="text-sm text-slate-300 font-normal mt-2">
            Read authentic reviews from homeowners, business leaders, and construction engineers who rely on our bulk water supply daily.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {REVIEWS.map((review, i) => (
            <div
              key={i}
              className="bg-slate-900/80 p-7 sm:p-8 rounded-none border border-sky-800/40 hover:border-cyan-400 shadow-xl hover:shadow-cyan-500/15 hover:-translate-y-2 transition-all duration-400 flex flex-col justify-between group"
            >
              <div>
                {/* Rating Stars */}
                <div className="flex items-center gap-1 text-amber-400 mb-5">
                  {[...Array(review.rating)].map((_, r) => (
                    <Star key={r} className="w-4 h-4 fill-amber-400" />
                  ))}
                  <span className="text-xs font-bold text-slate-300 ml-2">5.0 / 5.0</span>
                </div>

                <p className="text-xs sm:text-sm text-slate-200 font-normal leading-relaxed italic mb-6">
                  "{review.text}"
                </p>
              </div>

              <div className="pt-4 border-t border-sky-800/40 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-sm text-white group-hover:text-cyan-300 transition-colors">
                    {review.name}
                  </h4>
                  <p className="text-xs text-slate-400">{review.role}</p>
                </div>
                <span className="badge-dark-sky text-[10px] shrink-0 font-bold">
                  <CheckCircle className="w-3 h-3 text-cyan-400" />
                  {review.tag}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
