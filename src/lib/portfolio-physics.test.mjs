import test from 'node:test';
import assert from 'node:assert/strict';
import { stepWalker, jumpWalker } from './portfolio-physics.ts';
const state = (values={}) => ({x:40,y:80,vy:300,grounded:false,jumps:1,support:null,...values});
const surface = (values={}) => ({id:1,left:0,right:200,top:100,bottom:130,solid:false,...values});
test('lands on highest crossed surface regardless of registry order',()=>{
 const s=state(); stepWalker(s,[surface({id:2,top:120}),surface()],0,.1,800,2000);
 assert.equal(s.y,100); assert.equal(s.support,1); assert.equal(s.jumps,0);
});
test('one-way interface allows upward passage and intentional drop',()=>{
 const s=state({y:150,vy:-760});stepWalker(s,[surface()],0,.1,800,2000);assert.ok(s.y<100);
 const d=state({y:100,vy:0,grounded:true});stepWalker(d,[surface()],0,.05,800,2000,true);assert.ok(d.y>100);
});
test('solid scenery stops side movement and head bumps',()=>{
 const s=state({x:40,y:180});stepWalker(s,[surface({left:80,right:100,top:80,bottom:200,solid:true})],1,.1,800,2000);assert.equal(s.x,52);
 const h=state({y:200,vy:-760});stepWalker(h,[surface({solid:true})],0,.05,800,2000);assert.equal(h.y,188);assert.equal(h.vy,0);
});
test('double jump is capped until landing',()=>{
 const s=state({grounded:true,jumps:0});assert.ok(jumpWalker(s));assert.ok(jumpWalker(s));assert.equal(jumpWalker(s),false);
});
test('walking off an edge falls; page floor catches the player',()=>{
 const s=state({x:190,y:100,vy:0,grounded:true});stepWalker(s,[surface()],1,.1,800,2000);assert.equal(s.grounded,false);assert.ok(s.y>100);
 s.y=1999;stepWalker(s,[],0,.1,800,2000);assert.equal(s.y,2000);assert.equal(s.grounded,true);
});
