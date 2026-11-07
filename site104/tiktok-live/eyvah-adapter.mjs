// Independent Turkish free-text answer validation for LIVE quiz comments.
// This module does not change the original Eyvah Düşüyorum game.
export function normalizeTurkish(value) {
  return String(value ?? '').normalize('NFKC').toLocaleLowerCase('tr-TR')
    .replace(/ı/g,'i').replace(/ğ/g,'g').replace(/ü/g,'u')
    .replace(/ş/g,'s').replace(/ö/g,'o').replace(/ç/g,'c')
    .replace(/[^a-z0-9 ]/g,' ').replace(/\s+/g,' ').trim();
}
export function validateWrittenAnswer(comment, acceptedAnswers) {
  const answer=normalizeTurkish(comment);
  if(!answer || answer.length>120)return {valid:false,correct:false};
  const accepted=(Array.isArray(acceptedAnswers)?acceptedAnswers:[acceptedAnswers])
    .map(normalizeTurkish).filter(Boolean);
  return {valid:true,correct:accepted.includes(answer)};
}
export function assignPositions(players, centerId) {
  if(!Array.isArray(players)||players.length!==11)throw Error('Exactly 11 players required');
  const ids=players.map(p=>p.id);
  if(ids.some(id=>typeof id!=='string'||!id.trim())||new Set(ids).size!==11)throw Error('Unique stable user IDs required');
  if(!ids.includes(centerId))throw Error('Center must be among players');
  return {center:players.find(p=>p.id===centerId),opponents:players.filter(p=>p.id!==centerId).map((player,i)=>({number:i+1,player}))};
}
