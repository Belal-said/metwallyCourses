import {DateTime} from "luxon"

const now = DateTime.now();

console.log(now.toString())
// console.log(now.year)
// console.log(now.month)
// console.log(now.day)
// console.log(now.zoneName)
// console.log(now.toISO())
// console.log(now.toISODate())
// console.log(now.toISOTime())

console.log( now.toLocaleString(DateTime.DATETIME_HUGE_WITH_SECONDS) )
console.log( now.toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY) )
