export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type TravelType = 'roadtrip' | 'domestic' | 'international';

export interface UnknownDestinationType {
  startLocation: string;
  type: TravelType | string;
  monthOfTravel: Month | string;
}

export interface KnownDestinationType {
  endLocation: string;
  monthOfTravel: Month | string;
}

export interface ActivityResponse {
  activities: {
    title: string;
    type: string;
    description: string;
    address: string;
  }[];
}

export interface DestinationResponse {
  destinations: { location: string; description: string }[];
}
