import type {DropdownData} from '../Dropdowns';
import type {ClubKit} from '../Dropdowns/ClubKit';
import type {ClubMakes} from '../Dropdowns/ClubMakes';
import type {ClubCondition} from '../Dropdowns/ClubCondition';

export type AddClubListingState = {
  make: ClubMakes | null;
  condition: ClubCondition | null;
  model: {
    driver: ClubKit | null;
    iron: ClubKit | null;
    putter: ClubKit | null;
    wedge: ClubKit | null;
  };
  flex: {
    driver: DropdownData | null;
    iron: DropdownData | null;
    putter: DropdownData | null;
    wedge: DropdownData | null;
  };
  grip: {
    driver: DropdownData | null;
    iron: DropdownData | null;
    putter: DropdownData | null;
    wedge: DropdownData | null;
  };
  shaft: {
    driver: DropdownData | null;
    iron: DropdownData | null;
    putter: DropdownData | null;
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
    grind: {name: string} | null;
    loft: string;
  };
  description: string;
  price: string;
  loading: boolean;
};
