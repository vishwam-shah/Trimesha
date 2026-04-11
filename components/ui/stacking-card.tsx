// component.tsx
'use client';
import { ReactLenis } from 'lenis/react';
import { useTransform, motion, useScroll, MotionValue } from 'motion/react';
import { useRef, forwardRef, useCallback } from 'react';
import Link from 'next/link';
import { ServiceVisual } from '@/components/ui/service-visual';

interface ProjectData {
  title: string;
  description: string;
  link: string;
  color: string;
}

interface CardProps {
  i: number;
  title: string;
  description: string;
  slug: string;
  color: string;
  progress: MotionValue<number>;
  range: [number, number];
  targetScale: number;
}

export const Card = ({
  i,
  title,
  description,
  slug,
  color,
  progress,
  range,
  targetScale,
}: CardProps) => {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'start start'],
  });

  const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className='h-screen flex items-center justify-center sticky top-0 px-4'
    >
      <motion.div
        style={{
          backgroundColor: color,
          scale,
          top: `calc(-5vh + ${i * 25}px)`,
          width: '100%',
          maxWidth: '1152px',
        }}
        className='relative flex max-h-[92dvh] min-h-0 origin-top flex-col overflow-hidden rounded-2xl shadow-2xl md:h-[550px] md:max-h-none md:flex-row'
      >
        {/* Content Side */}
        <div className='flex w-full flex-col justify-center bg-black/10 p-6 backdrop-blur-sm sm:p-8 md:w-[45%] md:p-12'>
          <div className='flex-1 flex flex-col justify-center'>
            <h2 className='mb-4 text-2xl font-bold leading-tight text-white sm:mb-6 sm:text-3xl md:text-4xl'>
              {title}
            </h2>
            <p className='mb-6 line-clamp-6 text-base leading-relaxed text-white/90 md:text-lg'>
              {description}
            </p>
            <Link
              href={`/services/${slug}`}
              className='group inline-flex items-center gap-3 font-semibold text-white transition-all duration-300 hover:gap-4'
            >
              <span className='text-base sm:text-lg'>Learn More</span>
              <svg
                width='24'
                height='14'
                viewBox='0 0 22 12'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
                className='group-hover:translate-x-1 transition-transform'
              >
                <path
                  d='M21.5303 6.53033C21.8232 6.23744 21.8232 5.76256 21.5303 5.46967L16.7574 0.696699C16.4645 0.403806 15.9896 0.403806 15.6967 0.696699C15.4038 0.989592 15.4038 1.46447 15.6967 1.75736L19.9393 6L15.6967 10.2426C15.4038 10.5355 15.4038 11.0104 15.6967 11.3033C15.9896 11.5962 16.4645 11.5962 16.7574 11.3033L21.5303 6.53033ZM0 6.75L21 6.75V5.25L0 5.25L0 6.75Z'
                  fill='white'
                />
              </svg>
            </Link>
          </div>
        </div>

        {/* Visual side */}
        <div className='relative h-56 w-full shrink-0 overflow-hidden sm:h-72 md:h-full md:w-[55%] md:shrink'>
          <motion.div
            className='absolute inset-0 w-full h-full'
            style={{ scale: imageScale }}
          >
            <ServiceVisual
              slug={slug}
              color={color}
              variant='card'
              className='absolute inset-0 size-full'
            />
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

interface ComponentRootProps {
  projects: ProjectData[];
}

const Component = forwardRef<HTMLElement, ComponentRootProps>(
  ({ projects }, ref) => {
    const container = useRef<HTMLElement | null>(null);
    const setMainRef = useCallback(
      (node: HTMLElement | null) => {
        container.current = node;
        if (typeof ref === 'function') {
          ref(node);
        } else if (ref != null) {
          (ref as React.MutableRefObject<HTMLElement | null>).current = node;
        }
      },
      [ref],
    );
    const { scrollYProgress } = useScroll({
      target: container,
      offset: ['start start', 'end end'],
    });

    return (
      <ReactLenis root>
        <main className='relative bg-black' ref={setMainRef}>
        <>
          <section className='text-white h-[70vh] w-full bg-slate-950 grid place-content-center'>
            <div className='absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:54px_54px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]'></div>

            <h1 className='2xl:text-7xl text-5xl px-8 font-semibold text-center tracking-tight leading-[120%]'>
              Stacking Cards Using <br /> Motion. Scroll down! 👇
            </h1>
          </section>
        </>

        <section className='text-white w-full bg-slate-950'>
          {projects.map((project, i) => {
            const targetScale = 1 - (projects.length - i) * 0.05;
            return (
              <Card
                key={`p_${i}`}
                i={i}
                slug={project.link}
                title={project.title}
                color={project.color}
                description={project.description}
                progress={scrollYProgress}
                range={[i * 0.25, 1]}
                targetScale={targetScale}
              />
            );
          })}
        </section>

        <footer className='group bg-slate-950'>
          <h1 className='text-[16vw] translate-y-20 leading-[100%] uppercase font-semibold text-center bg-gradient-to-r from-gray-400 to-gray-800 bg-clip-text text-transparent transition-all ease-linear'>
            ui-layout
          </h1>
          <div className='bg-black h-40 relative z-10 grid place-content-center text-2xl rounded-tr-full rounded-tl-full'></div>
        </footer>
        </main>
      </ReactLenis>
    );
  },
);

Component.displayName = 'Component';

export default Component;
