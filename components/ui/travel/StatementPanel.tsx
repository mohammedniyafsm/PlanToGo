"use client"

import ScrollReveal from "@/components/ScrollReveal";

export default function StatementPanel() {
  return (
    <>
      <div className="w-full text-white bg-[#0038FF] flex justify-end pt-[100px] md:pt-[180px] pb-[80px] md:pb-[120px] px-8 md:pr-[60px] md:pl-24 overflow-hidden">
        <ScrollReveal
          enableColorReveal={true}
          startColor="#0524B3"
          endColor="#ffffff"

          enableTranslateY={true}
          translateYDistance="10px"

          enableClipReveal={false}

          baseOpacity={1}

          scrollStart="top 80%"
          scrollEnd="center 50%"
          scrub={0.6}
          stagger={0.03}
          ease="power3.out"

          lineHeight="1.12"
          letterSpacing="-0.05em"
          wordGap="0.15em"
          textAlign="left"
          fontSize="clamp(38px, 4.2vw, 56px)"

          containerClassName="w-fit max-w-[700px] text-left relative z-10"
          textClassName="font-light text-left select-none"
        >
          <div className="select-none font-sans" style={{ fontFamily: 'var(--font-display)' }}>
            every trip begins
            <br />
            with <span className="font-bold tracking-tighter">strangers,</span> and
            <br />
            ends with <span className="italic font-bold" style={{ fontFamily: 'var(--font-serif-italic)', fontSize: '1.05em' }}>stories</span> to tell.
            <br />
          </div>
        </ScrollReveal>
      </div>
    </>
  );
}