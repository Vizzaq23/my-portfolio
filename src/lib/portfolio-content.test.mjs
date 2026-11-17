import test from 'node:test';
import assert from 'node:assert/strict';
import { smashTarget } from './portfolio-content.ts';
import { stepWalker } from './portfolio-physics.ts';
const actor=()=>({x:40,y:100,vy:0,grounded:true,jumps:0,support:1});
const target=(values={})=>({id:1,left:40,right:48,top:100,bottom:116,solid:false,kind:'letter',...values});

test('individual narrow glyph supports the character; breaking it removes support',()=>{
  const s=actor(), letter=target();
  stepWalker(s,[letter],0,1/120,400,1000);
  assert.equal(s.support,letter.id);
  stepWalker(s,[],0,1/120,400,1000);
  assert.equal(s.grounded,false);assert.ok(s.y>100);
});
test('smash breaks a letter before its surrounding card',()=>{
  const card=target({id:2,left:0,right:300,top:100,bottom:500,kind:'card'});
  const letter=target();
  assert.equal(smashTarget(actor(),[card,letter],1),letter);
  assert.equal(smashTarget(actor(),[card],1),card);
});
test('smash cannot affect scenery or distant content',()=>{
  assert.equal(smashTarget(actor(),[target({kind:'scenery'}),target({left:200,right:210}),target({top:400,bottom:416})],1),undefined);
});
test('facing direction chooses between nearby letters',()=>{
  const left=target({id:1,left:24,right:32}),right=target({id:2,left:76,right:84});
  assert.equal(smashTarget(actor(),[left,right],-1).id,1);
  assert.equal(smashTarget(actor(),[left,right],1).id,2);
});
