import {getTimes,getPosition,getMoonPosition,getMoonIllumination} from './vendor/suncalc.mjs';
export const ZONE='America/New_York',LAT=40.7128,LON=-74.006;
const clock=new Intl.DateTimeFormat('en-US',{timeZone:ZONE,hour:'numeric',minute:'2-digit',second:'2-digit',timeZoneName:'short'});
const dateParts=new Intl.DateTimeFormat('en-CA',{timeZone:ZONE,year:'numeric',month:'2-digit',day:'2-digit',hour:'2-digit',minute:'2-digit',second:'2-digit',hourCycle:'h23'});
const clamp=(v,a=0,b=1)=>Math.min(b,Math.max(a,v));
export function nyParts(date){return Object.fromEntries(dateParts.formatToParts(date).filter(p=>p.type!=='literal').map(p=>[p.type,Number(p.value)]))}
export function offsetMinutes(date){const p=nyParts(date);return Math.round((Date.UTC(p.year,p.month-1,p.day,p.hour,p.minute,p.second)-Math.floor(date.getTime()/1000)*1000)/60000)}
export function localNoon(date){const p=nyParts(date);const guess=new Date(Date.UTC(p.year,p.month-1,p.day,17));return new Date(Date.UTC(p.year,p.month-1,p.day,12)-offsetMinutes(guess)*60000)}
export function solarTimes(date){const noon=localNoon(date);return getTimes(noon,LAT,LON,0,offsetMinutes(noon))}
export function previewDate(mode,now=new Date()){const times=solarTimes(now);if(mode==='day')return times.solarNoon;if(mode==='sunset')return new Date(times.sunset.getTime()-8*60000);if(mode==='night')return new Date(times.dusk.getTime()+75*60000);if(mode==='dawn')return new Date(times.sunrise.getTime()+8*60000);return now}
export function skyState(date){const sun=getPosition(date,LAT,LON),moon=getMoonPosition(date,LAT,LON),phase=getMoonIllumination(date),times=solarTimes(date),noonAltitude=getPosition(times.solarNoon,LAT,LON).altitude;
 const daylight=clamp((sun.altitude+7)/20);const twilight=clamp(1-Math.abs(sun.altitude-1)/12);const night=1-clamp((sun.altitude+12)/12);
 return{date,sun,moon,phase,times,daylight,twilight,night,noonAltitude,clock:clock.format(date),sunVisible:sun.altitude>-.8,moonVisible:moon.altitude>0,sunX:1650-clamp((sun.azimuth-65)/230)*850,sunY:560-clamp(sun.altitude/Math.max(20,noonAltitude))*485,moonX:1500-clamp(moon.azimuth/360)*400,moonY:550-clamp(moon.altitude/70)*460};
}
export const formatTime=date=>new Intl.DateTimeFormat('en-US',{timeZone:ZONE,hour:'numeric',minute:'2-digit'}).format(date);
