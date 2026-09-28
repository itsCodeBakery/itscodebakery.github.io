/* Original rendered irises move as rigid image layers inside the eyelids.
   The surrounding facial image is never stretched or displaced. */
(function(root,factory){
 if(typeof module==='object'&&module.exports)module.exports=factory();
 else root.ShayanAvatarRenderer=factory();
})(typeof window!=='undefined'?window:this,function(){
 'use strict';
 const eyes=[
  {cx:469,cy:318,rx:20.8,ry:20.8,travel:13,edge:[432,323,443,304,454,298,468,299,486,297,500,312,506,326,490,337,453,337,432,326],light:['#d1bdb7','#eee5e3','#c9b5b0']},
  {cx:623,cy:321,rx:20.8,ry:20.8,travel:13,edge:[590,328,598,309,608,300,623,301,641,300,656,313,663,329,649,341,615,342,590,330],light:['#d6c3bb','#f8f2ef','#eee4e2']}
 ];
 function outline(ctx,a){
  ctx.beginPath();ctx.moveTo(a[0],a[1]);
  ctx.bezierCurveTo(...a.slice(2,8));ctx.bezierCurveTo(...a.slice(8,14));ctx.bezierCurveTo(...a.slice(14,20));ctx.closePath();
 }
 function paintEye(ctx,image,eye,x,y){
  const {cx,cy,rx,ry,edge,light}=eye;
  ctx.save();outline(ctx,edge);ctx.clip();
  // Sclera is reconstructed beneath the moving image layer, within the original eyelid.
  const white=ctx.createLinearGradient(cx-40,cy,cx+40,cy);
  white.addColorStop(0,light[0]);white.addColorStop(.58,light[1]);white.addColorStop(1,light[2]);
  ctx.fillStyle=white;ctx.fillRect(cx-42,cy-27,84,56);
  const dx=x*eye.travel,dy=y*4;
  ctx.save();ctx.beginPath();ctx.ellipse(cx+dx,cy+dy,rx,ry,0,0,Math.PI*2);ctx.clip();
  ctx.drawImage(image,cx-rx,cy-ry,rx*2,ry*2,cx-rx+dx,cy-ry+dy,rx*2,ry*2);
  ctx.restore();
  const shadow=ctx.createLinearGradient(0,cy-23,0,cy+21);
  shadow.addColorStop(0,'rgba(49,23,13,.48)');shadow.addColorStop(.27,'rgba(49,23,13,.13)');shadow.addColorStop(.62,'rgba(49,23,13,0)');shadow.addColorStop(1,'rgba(91,45,28,.10)');
  ctx.fillStyle=shadow;ctx.fillRect(cx-42,cy-27,84,56);
  ctx.restore();
 }
 function draw(ctx,image,x=0,y=0){
  ctx.clearRect(0,0,1086,1448);ctx.drawImage(image,0,0,1086,1448);
  for(const eye of eyes)paintEye(ctx,image,eye,x,y);
 }
 return{draw,width:1086,height:1448};
});
