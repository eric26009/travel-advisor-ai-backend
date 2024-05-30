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

export type TravelType = 'roadTrip' | 'domestic' | 'international';

export interface UnknownDestinationType {
  startingLocation: string;
  type: TravelType | string;
  monthOfTravel: Month | string;
}
