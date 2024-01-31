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
          className="mt-6 sm:mt-8 text-sm text-blue tracking-0.15 underline w-fit"
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

interface FeaturesSectionProps {
  features: FeatureProps[];
}

function FeaturesSection({features}: FeaturesSectionProps) {
  return (
    <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-6 lg:gap-16 xl:gap-[120px] lg:whitespace-nowrap">
      {features.map((feature, index) => (
        <div key={index} className="flex items-center gap-4">
          {feature.icon && (
            <Image
              src={`/images/${feature.icon}.svg`}
              alt={feature.title}
              width={feature.iconWidth}
              height={feature.iconHeight}
            />
          )}
          <p className="lg:text-xl text-grey lg:tracking-0.15">
            {feature.title}
          </p>
        </div>
      ))}
    </div>
  );
}

interface CategoriesSectionProps {
  title: string;
  options: Record<string, string>;
}

function CategoriesSection({title, options}: CategoriesSectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <p className="font-semibold">{title}</p>
      <div className="flex items-start gap-10 w-fit">
        <div className="flex flex-col gap-2">
          {Object.keys(options).map(key => (
            <p key={key}>{key}</p>
          ))}
        </div>
        <div className="flex flex-col gap-2">
          {Object.values(options).map(value => (
            <p key={value}>{value}</p>
          ))}
        </div>
      </div>
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
    <section className="py-14 px-4 xl:pl-[5.7%] xl:pr-[9.6%]">
      <h1 className="text-2xl lg:text-3.5xl text-grey font-semibold tracking-0.25">
        {details.about.title}
      </h1>

      <FeaturesSection features={details.about.features} />

      <div className="mt-12 lg:mt-28">
        <h1 className="text-2xl lg:text-3.5xl text-grey font-semibold tracking-0.25">
          {details.specifications.title}
        </h1>

        <div className="mt-6 sm:mt-10 flex items-start flex-col sm:flex-row gap-6 justify-between lg:justify-start lg:gap-16 xl:gap-[106px] w-full lg:text-xl text-grey tracking-0.15">
          <CategoriesSection
            title={details.specifications.categories.exteriorOptions.title}
            options={details.specifications.categories.exteriorOptions.options}
          />

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

          <div className="flex flex-col gap-6 sm:gap-14">
            <CategoriesSection
              title={
                details.specifications.categories.bevPerformanceOptions.title
              }
              options={
                details.specifications.categories.bevPerformanceOptions.options
              }
            />

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

        <div className="mt-12 sm:mt-18 flex items-center justify-center">
          <button
            className="w-[280px] flex items-center justify-center font-semibold text-blue h-12 lg:h-15 outline outline-1 outline-blue rounded"
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
