export interface MainProps {
  main: {
    new: string;
    car: {
      name: string;
      vin: {
        label: string;
        value: string;
      };
      price: string;
      colourTitle: string;
      colors: {
        color: string;
        backgroundColor: string;
        displayName: string;
      }[];
      button: {
        orderNow: string;
      };
      delivery: string;
      vision: string;
      viewCollection: string;
    };
    accordion: {
      items: {
        value: string;
        trigger: string;
        content: string;
        features: {
          title: string;
          description: string;
        }[];
      }[];
    };
  };
}

export interface FeatureProps {
  title: string;
  icon?: string;
  iconWidth?: number;
  iconHeight?: number;
}

export interface SpecificationsProps {
  title: string;
  categories: {
    exteriorOptions: {
      title: string;
      options: Record<string, string>;
    };
    interiorOptions: {
      title: string;
      options: Record<string, string>;
    };
    bevPerformanceOptions: {
      title: string;
      options: Record<string, string>;
    };
    chargingOptions: {
      title: string;
      options: Record<string, string>;
    };
  };
  button: {
    showMore: string;
    showLess: string;
    showAllSpecifications: string;
    showLessSpecifications: string;
  };
}
