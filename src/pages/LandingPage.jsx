import { lazy, Suspense, useRef } from "react";

import Container from "../components/Container";
import Hero from "../components/LandingPage/Hero";
import LazySection from "../shared/LazySection";

const About = lazy(() => import("../components/LandingPage/About"));
const OurExpert = lazy(() => import("../components/LandingPage/OurExpert"));
const OurProducts = lazy(() => import("../components/LandingPage/OurProducts"));
const OurServices = lazy(() => import("../components/LandingPage/OurServices"));
const OurClients = lazy(() => import("../components/LandingPage/OurClients"));

export default function LandingPage() {
  const seeProduct = useRef(null);

  const handleClickToProduct = () => {
    seeProduct.current?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <Hero />

      <LazySection>
        <Suspense fallback={null}>
          <About handleClickToProduct={handleClickToProduct} />
        </Suspense>
      </LazySection>

      <Container>
        <div className=" md:mx-20 mx-8">
          <LazySection>
            <Suspense fallback={null}>
              <OurExpert />
            </Suspense>
          </LazySection>

          <LazySection>
            <Suspense fallback={null}>
              <OurServices />
            </Suspense>
          </LazySection>

          <LazySection>
            <Suspense fallback={null}>
              <OurProducts seeProduct={seeProduct} />
            </Suspense>
          </LazySection>

          <LazySection>
            <Suspense fallback={null}>
              <OurClients />
            </Suspense>
          </LazySection>
        </div>
      </Container>
    </>
  );
}
