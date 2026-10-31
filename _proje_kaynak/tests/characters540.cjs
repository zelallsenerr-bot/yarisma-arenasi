const vm=require('node:vm'),fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),root=path.resolve(__dirname,'../..');
let mem=new Map,context={window:{localStorage:{getItem:k=>mem.get(k)||null,setItem:(k,v)=>mem.set(k,v)},dispatchEvent(){},addEventListener(){}},Event:function(){}};vm.createContext(context);
for(const f of ['player-profile338.js','humans435/profile443-data.js','humans435/profile443.js'])vm.runInContext(fs.readFileSync(path.join(root,f),'utf8'),context);
const P=context.window.ArenaProfile338,H=context.window.ArenaPlayerAppearance443;
let assets=new Set;
for(let gender of ['male','female']){const choices=H.choices(gender);assert.equal(choices.length,14);assert.equal(new Set(choices.map(o=>o.id)).size,14);
 for(const c of choices){P.save({name:'Test',gender,age:30,appearance:c.id});assert.equal(P.get().appearance,c.id,'saved '+c.id);for(const pose of ['standing','seated']){const e=H.entry(gender,30,pose);assert(e,gender+' '+c.id+' '+pose);assert.equal(e.gender,gender);assert.equal(e.seated,pose==='seated');assert(e.rect.every(Number.isFinite));assert(e.rect[0]>=0&&e.rect[1]>=0&&e.rect[0]+e.rect[2]<=e.size[0]&&e.rect[1]+e.rect[3]<=e.size[1]);assert(fs.existsSync(path.join(root,e.asset)),e.asset);assets.add(e.asset)}}
 P.save({name:'Test',gender,age:12,appearance:'default'});assert.equal(H.entry(gender,12).ageBand,'child');P.save({name:'Test',gender,age:70,appearance:'default'});assert.equal(H.entry(gender,70).ageBand,'senior');
}
P.save({name:'Saved',gender:'male',age:30,appearance:'new4'});P.save({name:'Saved',gender:'male',age:31});assert.equal(P.get().appearance,'new4','missing choice retains selection');
console.log('PASS: 28 selections, standing/seated assets, saved identity, age defaults, backwards compatibility');
