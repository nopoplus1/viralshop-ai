import {cookies} from 'next/headers';
import {createHmac,randomBytes,scryptSync,timingSafeEqual} from 'node:crypto';
import {readDB} from './db';
const secret=process.env.AUTH_SECRET||'dev-only-change-this-secret-before-deploying-viralshop';
export function hashPassword(p:string){const salt=randomBytes(16).toString('hex');return salt+':'+scryptSync(p,salt,64).toString('hex')}
export function verifyPassword(p:string,h:string){const [salt,key]=h.split(':');if(!salt||!key)return false;const a=scryptSync(p,salt,64),b=Buffer.from(key,'hex');return a.length===b.length&&timingSafeEqual(a,b)}
export function sign(payload:string){return createHmac('sha256',secret).update(payload).digest('hex')}
export async function setSession(userId:string){const exp=Date.now()+1000*60*60*24*14;const raw=`${userId}.${exp}`;const c=await cookies();c.set('vs_session',raw+'.'+sign(raw),{httpOnly:true,sameSite:'lax',secure:process.env.NODE_ENV==='production',path:'/',maxAge:60*60*24*14})}
export async function clearSession(){(await cookies()).delete('vs_session')}
export async function currentUser(){const c=await cookies(),v=c.get('vs_session')?.value;if(!v)return null;const [uid,exp,sig]=v.split('.');const raw=uid+'.'+exp;if(!uid||!exp||!sig||Number(exp)<Date.now()||sign(raw)!==sig)return null;const db=await readDB();const u=db.users.find(x=>x.id===uid);if(!u||u.isActive===false)return null;const ownerEmail=(process.env.OWNER_EMAIL||process.env.ADMIN_EMAIL||'').trim().toLowerCase();if(ownerEmail&&u.email===ownerEmail&&u.planId!=='pro'){u.planId='pro';u.subscription={planId:'pro',status:'active',source:'owner_comp',expiresAt:null};const {mutate}=await import('./db');await mutate(d=>{const target=d.users.find(x=>x.id===uid);if(target){target.planId='pro';target.subscription={planId:'pro',status:'active',source:'owner_comp',expiresAt:null}}})}const safe={id:u.id,email:u.email,name:u.name,role:u.role,planId:u.planId,createdAt:u.createdAt};return safe}
