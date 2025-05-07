import type {DropdownData} from '../Dropdowns';
import type {ClubKit} from '../Dropdowns/ClubKit';
import type {ClubMakes} from '../Dropdowns/ClubMakes';

export type EditClubListingState = {
  make: ClubMakes | null;
  model: {
    driver: ClubKit | null;
    iron: ClubKit | null;
    putter: ClubKit | null;
    wedge: ClubKit | null;
  };
  flex: {
    driver: DropdownData | null;
    iron: DropdownData | null;
    wedge: DropdownData | null;
  };
  grip: {
    iron: DropdownData | null;
    putter: DropdownData | null;
  };
  shaft: {
    driver: DropdownData | null;
    iron: DropdownData | null;
    wedge: DropdownData | null;
  };
  driver: {
    loft: string;
  };
  iron: {
    setComposition: string;
    lieAngle: string;
  };
  putter: {
    length: string;
  };
  wedge: {
    bounce: string;
    grind: string;
    loft: string;
  };
};
