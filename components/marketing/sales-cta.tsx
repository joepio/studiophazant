export function SalesCta() {
  return (
    <section
      id="contact"
      aria-labelledby="sales-cta-title"
      className="bg-[#bedfe3] px-6 py-16 text-[#315f5d] md:px-10 md:py-24"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-8 md:flex-row md:items-end md:justify-between md:gap-16">
        <div className="max-w-3xl">
          <p className="font-ui-sans mb-4 text-[10px] font-semibold uppercase tracking-[0.24em]">
            Studio Phazant · Noord-Holland
          </p>
          <h2
            id="sales-cta-title"
            className="font-serif text-4xl italic leading-[0.95] tracking-tight md:text-6xl"
          >
            Op zoek naar maatwerk meubels?
          </h2>
          <p className="font-ui-sans mt-6 max-w-2xl text-base leading-relaxed md:text-lg">
            Als meubelmaker in Noord-Holland ontwerp en maak ik unieke meubels,
            interieurs en houten objecten op maat — met aandacht voor materiaal,
            gebruik en een lange levensduur.
          </p>
        </div>

        <a
          href="mailto:info@studiophazant.nl?subject=Aanvraag%20maatwerk%20meubel"
          className="font-ui-sans inline-flex shrink-0 items-center justify-center bg-[#56894f] px-6 py-4 text-center text-sm font-semibold uppercase tracking-[0.12em] text-[#fff4d1] transition-colors hover:bg-[#ffdd82] hover:text-[#315f5d] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#315f5d]"
        >
          Bespreek je project
        </a>
      </div>
    </section>
  );
}
