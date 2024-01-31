'use client';

import {useEffect, useState} from 'react';
import Image from 'next/image';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {MainProps} from '@/types';

const getTransformForIndex = (index: number) => {
  switch (index % 5) {
    case 0:
      return '';
    case 1:
      return 'rotate(25deg)';
    case 2:
      return 'scaleX(-1)';
    case 3:
      return 'scaleX(-1) rotate(25deg)';
    case 4:
      return 'scaleX(-1) rotate(-15deg)';
    default:
      return '';
  }
};

export default function Main({main}: MainProps) {
  const [api, setApi] = useState<CarouselApi>();
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(main.car.colors[3].color);

  useEffect(() => {
    if (api) {
      api.on('select', () => {
        setActiveIndex(api.selectedScrollSnap());
      });
    }
  }, [api]);

  return (
    <main className="flex items-stretch basis-full">
      <div className="basis-[65.8%] pl-[3.3%] pr-[3.9%] pt-18 flex flex-col items-center gap-18">
        <div className="flex items-center gap-[3.3%] h-auto w-full">
          <Carousel className="grow" setApi={setApi}>
            <CarouselContent>
              {Array.from({length: 5}).map((_, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <div className="relative grow h-[calc(100vw-73.125vw)]">
                      <Image
                        src={`/images/car-${selectedColor}.png`}
                        alt={`tesla model 3 ${selectedColor}`}
                        fill
                        className="w-full h-auto object-contain"
                        sizes="(min-width: 1024px) 20vw, (min-width: 768px) 30vw, 50vw"
                        quality={100}
                        priority
                        style={{
                          transform: getTransformForIndex(index),
                        }}
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious
              className="flex items-center justify-center w-[37px] h-[37px] bg-green-light rounded-full ml-10"
              onCarouselClick={() => {
                api?.scrollTo(activeIndex - 1);
                setActiveIndex(activeIndex - 1);
              }}
            />
            <CarouselNext
              className="flex items-center justify-center w-[37px] h-[37px] bg-green-light rounded-full mr-12"
              onCarouselClick={() => {
                api?.scrollTo(activeIndex + 1);
                setActiveIndex(activeIndex + 1);
              }}
            />
          </Carousel>
        </div>
        <div className="flex items-center gap-4">
          {Array.from({length: 5}).map((_, index) => (
            <button
              key={index}
              className={`z-10 w-18 h-18 rounded flex items-center justify-center ${
                index === activeIndex
                  ? 'bg-[#f5f5f5] outline outline-1 outline-green'
                  : 'bg-slate-950/20 hover:bg-slate-950/20'
              }`}
              onClick={() => {
                api?.scrollTo(index);
                setActiveIndex(index);
              }}
            >
              <Image
                src={`/images/car-${selectedColor}.png`}
                alt="car"
                width={66}
                height={39}
                className="opacity-80 mix-blend-multiply"
                style={{
                  transform: getTransformForIndex(index),
                }}
              />
            </button>
          ))}
        </div>
      </div>

      <div className="basis-[34.2%] py-18 pl-10 pr-[3.3%] bg-white">
        <div className="flex flex-col">
          <div className="px-2 py-1 rounded-full bg-green/20 text-xs text-blue uppercase font-semibold w-fit">
            {main.new}
          </div>
          <h1 className="mt-2 text-3.5xl text-grey font-semibold tracking-0.25">
            {main.car.name}
          </h1>
          <div className="mt-2 flex gap-4 tracking-0.15">
            <p className="text-grey-light">{main.car.vin.label}</p>
            <p className="text-grey">{main.car.vin.value}</p>
          </div>
          <div className="mt-4 flex items-center gap-1">
            <Image src="/images/star.svg" alt="star" width={24} height={24} />
            <Image src="/images/star.svg" alt="star" width={24} height={24} />
            <Image src="/images/star.svg" alt="star" width={24} height={24} />
            <Image src="/images/star.svg" alt="star" width={24} height={24} />
            <Image src="/images/star.svg" alt="star" width={24} height={24} />
          </div>
        </div>

        <p className="mt-6 text-grey text-2xl font-medium">{main.car.price}</p>

        <div className="mt-6 border-t-[0.5px] border-border py-6">
          <p className="text-grey font-semibold">{main.car.colourTitle}</p>

          <div className="mt-4.5 flex items-center justify-between pr-5">
            <div className="flex items-center gap-4">
              {main.car.colors.map((color, index) => (
                <button
                  key={index}
                  className={`w-7 h-7 rounded-full ${selectedColor === color.color ? 'outline outline-1 outline-offset-4 outline-green' : ''}`}
                  style={{
                    backgroundColor: color.backgroundColor,
                    border: color.color === 'white' ? '1px solid #E0E0E0' : '',
                  }}
                  onClick={() => {
                    setSelectedColor(color.color);
                  }}
                />
              ))}
            </div>
            <p className="text-xs text-grey font-semibold uppercase tracking-1">
              {
                main.car.colors.find(color => color.color === selectedColor)
                  ?.displayName
              }
            </p>
          </div>
        </div>

        <button className="mt-16 w-full rounded bg-blue text-green font-semibold flex items-center justify-center h-15">
          {main.car.button.orderNow}
        </button>

        <p className="mt-6 text-grey-light tracking-0.15 text-center">
          {main.car.delivery}
        </p>

        <div className="mt-18">
          <p className="text-grey text-2xl font-medium leading-9">
            {main.car.vision}
          </p>
          <a
            href="https://www.tesla.com/en_gb/models/design#overview"
            target="_blank"
            rel="noreferrer"
            className="mt-6 block text-blue text-xl underline"
          >
            {main.car.viewCollection}
          </a>
        </div>

        <Accordion type="single" collapsible className="mt-10">
          {main.accordion.items.map(item => (
            <AccordionItem key={item.value} value={item.value}>
              <AccordionTrigger className="pt-5 pb-8 text-grey font-semibold">
                {item.trigger}
              </AccordionTrigger>
              <AccordionContent>
                <p>{item.content}</p>
                <ul className="list-disc pl-4 py-3 space-y-1">
                  {item.features.map(feature => (
                    <li key={feature.title}>
                      <span className="font-medium">{feature.title}:</span>{' '}
                      {feature.description}
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </main>
  );
}
