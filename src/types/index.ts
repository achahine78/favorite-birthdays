export type DatePickerValue = {
  $d: string;
  $M: string;
  $D: string;
};

export type Birth = {
  text: string;
  year: number;
};

export type AugmentedBirth = Birth & {
  date: string;
};

export type LikesMap = Record<string, AugmentedBirth>;

export type LikesByDateMap = {
  [key: string]: AugmentedBirth[];
};
