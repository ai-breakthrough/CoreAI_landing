import DotsSep from '@/components/DotsSep';
import SectionContainer from '@/components/SectionContainer';

import Header from '@/sections/Header';
import Services from '@/sections/Services';
import Problems from '@/sections/Problems';
import WhyAgentic from '@/sections/WhyAgentic';
import UseCases from '@/sections/UseCases';
import Footer from '@/sections/Footer';

export default function CoreAI() {
  return (
    <div className="min-h-screen bg-[#e7dfcc] text-[#0e0f0f]">
      <Header />
      <Services />
      <Problems />
      <DotsSep />
      <WhyAgentic />
      <DotsSep />
      <UseCases />
      <DotsSep />
      <section className="bg-black h-[500px]">
        <SectionContainer />
      </section>
      <DotsSep />
      <Footer />
    </div>
  );
}
