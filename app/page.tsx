import { Hero } from "./components/home/Hero";
import { Thesis } from "./components/home/Thesis";
import { HowWeWork } from "./components/home/HowWeWork";
import { Engagement } from "./components/home/Engagement";
import { SeniorPartnerPromise } from "./components/home/SeniorPartnerPromise";
import { WhoWeWorkWith } from "./components/home/WhoWeWorkWith";
import { ClosingCTA } from "./components/home/ClosingCTA";

// Section order maps to copy doc:
//   01 Thesis · 02 How we work · 03 Engagement · 04 Senior partner promise
//   05 Who we work with (also hosts the client carousel) · 06 Closing CTA
export default function Home() {
  return (
    <>
      <Hero />
      <Thesis />
      <HowWeWork />
      <Engagement />
      <SeniorPartnerPromise />
      <WhoWeWorkWith />
      <ClosingCTA />
    </>
  );
}
