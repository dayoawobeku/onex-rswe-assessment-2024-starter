'use client';

import {useState} from 'react';
import Image from 'next/image';
import {FeatureProps, SpecificationsProps} from '@/types';

interface ExpandableSectionProps {
  title: string;
  options: Record<string, string>;
  numberOfInitiallyVisibleOptions: number;
  buttonType?: 'arrow' | 'underline';
  showMore: boolean;
  setShowMore: (value: boolean) => void;
  details: DetailsProps;
}

interface DetailsProps {
  about: {
    title: string;
    features: FeatureProps[];
  };
  specifications: SpecificationsProps;
}

function ExpandableSection({
  title,
  options,
  numberOfInitiallyVisibleOptions,
  buttonType = 'arrow',
  showMore,
  setShowMore,
  details,
}: ExpandableSectionProps) {
  const initiallyVisibleOptions = Object.fromEntries(
    Object.entries(options).slice(0, numberOfInitiallyVisibleOptions),
  );

  const handleShowMore = () => {
    setShowMore(!showMore);
  };

  const optionsToShow = showMore ? options : initiallyVisibleOptions;

  return (
    <div className="flex flex-col">
      <div className="flex flex-col gap-4">
        <p className="font-semibold">{title}</p>
        <div className="flex items-start gap-10 w-fit">
          <div className="flex flex-col gap-2">
            {Object.keys(optionsToShow).map(key => (
              <p key={key}>{key}</p>
            ))}
          </div>
          <div className="flex flex-col gap-2">
            {Object.values(optionsToShow).map(value => (
              <p key={value}>{value}</p>
            ))}
          </div>
        </div>
      </div>

      {buttonType === 'arrow' ? (
        <button
          className="mt-6 flex items-center gap-2 text-sm text-blue tracking-0.15 group w-fit"
          onClick={handleShowMore}
        >
          <span>
            {showMore
              ? details.specifications.button.showLess
              : details.specifications.button.showMore}
          </span>
          <Image
            src="/images/arrow-right.svg"
            alt="arrow right"
            width={16}
            height={16}
            className="transform group-hover:translate-x-1 transition-transform"
          />
        </button>
      ) : buttonType === 'underline' ? (
        <button
          className="mt-8 text-sm text-blue tracking-0.15 underline w-fit"
          onClick={handleShowMore}
        >
          <span>
            {showMore
              ? details.specifications.button.showLess
              : details.specifications.button.showMore}
          </span>
        </button>
      ) : null}
    </div>
  );
}

export default function Details({details}: {details: DetailsProps}) {
  const [showMore, setShowMore] = useState({
    interior: false,
    charging: false,
  });

  const handleShowAllSpecifications = () => {
    setShowMore(prev => ({
      interior: !prev.charging ? true : !prev.interior,
      charging: !prev.interior ? true : !prev.charging,
    }));
  };

  return (
    <section className="py-14 pl-[5.7%] pr-[9.6%]">
      <h1 className="text-3.5xl text-grey font-semibold tracking-0.25">
        {details.about.title}
      </h1>

      <div className="mt-10 flex items-center gap-[120px]">
        {details.about.features.map((feature, index) => (
          <div key={index} className="flex items-center gap-4">
            {feature.icon && (
              <Image
                src={`/images/${feature.icon}.svg`}
                alt={feature.title}
                width={feature.iconWidth}
                height={feature.iconHeight}
              />
            )}
            <p className="text-xl text-grey tracking-0.15 leading-8">
              {feature.title}
            </p>
          </div>
        ))}
      </div>

      <div className="mt-28">
        <h1 className="text-3.5xl text-grey font-semibold tracking-0.25">
          {details.specifications.title}
        </h1>

        <div className="mt-10 flex items-start gap-[106px] w-full text-xl text-grey tracking-0.15">
          <div className="flex flex-col gap-4">
            <p className="font-semibold">
              {details.specifications.categories.exteriorOptions.title}
            </p>
            <div className="flex items-start gap-10 w-fit">
              <div className="flex flex-col gap-2">
                {Object.keys(
                  details.specifications.categories.exteriorOptions.options,
                ).map(key => (
                  <p key={key}>{key}</p>
                ))}
              </div>
              <div className="flex flex-col gap-2">
                {Object.values(
                  details.specifications.categories.exteriorOptions.options,
                ).map(value => (
                  <p key={value}>{value}</p>
                ))}
              </div>
            </div>
          </div>

          <ExpandableSection
            title={details.specifications.categories.interiorOptions.title}
            options={details.specifications.categories.interiorOptions.options}
            numberOfInitiallyVisibleOptions={7}
            showMore={showMore.interior}
            setShowMore={value =>
              setShowMore(prev => ({...prev, interior: value}))
            }
            details={details}
          />

          <div className="flex flex-col">
            <div className="flex flex-col gap-14">
              <div className="flex flex-col gap-4">
                <p className="font-semibold">
                  {
                    details.specifications.categories.bevPerformanceOptions
                      .title
                  }
                </p>
                <div className="flex items-start gap-10 w-fit">
                  <div className="flex flex-col gap-2">
                    {Object.keys(
                      details.specifications.categories.bevPerformanceOptions
                        .options,
                    ).map(key => (
                      <p key={key}>{key}</p>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    {Object.values(
                      details.specifications.categories.bevPerformanceOptions
                        .options,
                    ).map(value => (
                      <p key={value}>{value}</p>
                    ))}
                  </div>
                </div>
              </div>
              <ExpandableSection
                title={details.specifications.categories.chargingOptions.title}
                options={
                  details.specifications.categories.chargingOptions.options
                }
                numberOfInitiallyVisibleOptions={3}
                buttonType="underline"
                showMore={showMore.charging}
                setShowMore={value =>
                  setShowMore(prev => ({...prev, charging: value}))
                }
                details={details}
              />
            </div>
          </div>
        </div>

        <div className="mt-18 flex items-center justify-center">
          <button
            className="w-[280px] flex items-center justify-center font-semibold text-blue h-15 outline outline-1 outline-blue rounded"
            onClick={handleShowAllSpecifications}
          >
            {showMore.interior && showMore.charging
              ? details.specifications.button.showLessSpecifications
              : details.specifications.button.showAllSpecifications}
          </button>
        </div>
      </div>
    </section>
  );
}
