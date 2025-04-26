import moment from "moment";

export const DATE_FORMAT = "cccc dd à HH'h'mm";
export const DURATION_FORMAT = "hh'h'mm";
export const DATE_ONLY_FORMAT = "cccc dd";
export const TIME_FORMAT = "HH'h'mm";

export function dateWithLocalDay(date) {
  let res = moment(date.toString());
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return daysOfWeek[res.format("d")] + " " + res.format("D");
  // TODO: find the proper way to do this....
}

export function logTimeStamp(date) {
  let res = moment(date.toString());
  const daysOfWeek = ["Di", "Lu", "Ma", "Me", "Je", "Ve", "Sa"];
  return daysOfWeek[res.format("d")] + " " + res.format("D, HH:mm");
}

export function localDayOfWeek(date : Date){
  let res = moment(date);
  const daysOfWeek = [
    "Dimanche",
    "Lundi",
    "Mardi",
    "Mercredi",
    "Jeudi",
    "Vendredi",
    "Samedi",
  ];
  return daysOfWeek[res.format("d")];
}
