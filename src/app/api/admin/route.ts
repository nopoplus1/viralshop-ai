import {NextRequest,NextResponse} from 'next/server';
import {currentUser} from '@/lib/auth';
import {mutate,readDB,id,now} from '@/lib/db';

async function requireAdmin(){const user=await currentUser();return user&&['admin','owner'].includes(user.role)?user:null}
export async function GET(){
 const admin=await requireAdmin();if(!admin)return NextResponse.json({error:'دسترسی ادمین لازم است.'},{status:403});
 const d=await readDB();
 const month=new Date().toISOString().slice(0,7);
 return NextResponse.json({
  stats:{users:d.users.length,activeUsers:d.users.filter(u=>u.isActive!==false).length,stores:d.stores.length,products:d.products.length,contents:d.contents.length,aiRequests:d.usage.length,monthlyAiRequests:d.usage.filter(x=>x.month===month).length,pendingPayments:d.payments.filter(x=>x.status==='pending').length},
  users:d.users.map(u=>({id:u.id,email:u.email,name:u.name,role:u.role,planId:u.planId,isActive:u.isActive!==false,subscription:u.subscription,createdAt:u.createdAt})),
  stores:d.stores.map(s=>({...s,ownerEmail:d.users.find(u=>u.id===s.userId)?.email||''})),
  products:d.products,contents:d.contents,usage:d.usage,payments:d.payments,plans:d.plans,audit:d.audit,
  ai:{configured:!!(process.env.AI_API_KEY&&process.env.AI_BASE_URL&&process.env.AI_TEXT_MODEL),baseUrl:process.env.AI_BASE_URL||'',model:process.env.AI_TEXT_MODEL||'',hasKey:!!process.env.AI_API_KEY},
  payment:{provider:process.env.PAYMENT_PROVIDER||'manual',configured:false}
 });
}
export async function POST(req:NextRequest){
 const admin=await requireAdmin();if(!admin)return NextResponse.json({error:'دسترسی ادمین لازم است.'},{status:403});
 const body=await req.json().catch(()=>({}));const action=String(body.action||'');
 try{
  const result=await mutate(db=>{
   let output:any={ok:true};
   if(action==='updateUser'){
    const u=db.users.find(x=>x.id===body.userId);if(!u)throw new Error('کاربر پیدا نشد.');
    if(u.email===(process.env.ADMIN_EMAIL||'').trim().toLowerCase()&&body.role&&body.role!=='admin')throw new Error('نقش ادمین اصلی قابل تغییر نیست.');
    if(body.planId){if(!db.plans.some(p=>p.id===body.planId))throw new Error('پلن انتخاب‌شده معتبر نیست.');u.planId=body.planId;u.subscription={planId:body.planId,status:'active',source:'admin_grant',expiresAt:body.expiresAt||null,updatedAt:now()}}
    if(body.role&&['admin','owner','user'].includes(body.role))u.role=body.role;
    if(typeof body.isActive==='boolean')u.isActive=body.isActive;
    output={id:u.id,email:u.email,role:u.role,planId:u.planId,isActive:u.isActive!==false};
   }else if(action==='deleteUser'){
    if(body.userId===admin.id)throw new Error('نمی‌توانید حساب خودتان را حذف کنید.');
    const u=db.users.find(x=>x.id===body.userId);if(!u)throw new Error('کاربر پیدا نشد.');
    const storeIds=db.stores.filter(x=>x.userId===body.userId).map(x=>x.id);db.users=db.users.filter(x=>x.id!==body.userId);db.stores=db.stores.filter(x=>x.userId!==body.userId);for(const key of ['products','members','contents','metrics'] as const)db[key]=db[key].filter(x=>x.userId!==body.userId&&!storeIds.includes(x.storeId));db.usage=db.usage.filter(x=>x.userId!==body.userId);output={ok:true};
   }else if(action==='deleteStore'){
    const store=db.stores.find(x=>x.id===body.storeId);if(!store)throw new Error('فروشگاه پیدا نشد.');const ids=[store.id];db.stores=db.stores.filter(x=>x.id!==store.id);db.products=db.products.filter(x=>x.storeId!==store.id);db.members=db.members.filter(x=>x.storeId!==store.id);db.contents=db.contents.filter(x=>x.storeId!==store.id);db.metrics=db.metrics.filter(x=>x.storeId!==store.id);output={ok:true};
   }else if(action==='updatePayment'){
    const p=db.payments.find(x=>x.id===body.paymentId);if(!p)throw new Error('پرداخت پیدا نشد.');
    if(!['pending','paid','rejected','refunded'].includes(body.status))throw new Error('وضعیت پرداخت نامعتبر است.');p.status=body.status;p.reviewedAt=now();p.reviewedBy=admin.id;
    if(body.status==='paid'){const u=db.users.find(x=>x.id===p.userId);if(u&&db.plans.some(x=>x.id===p.planId)){u.planId=p.planId;u.subscription={planId:p.planId,status:'active',source:'payment',expiresAt:null}}}
    output=p;
   }else if(action==='updatePlan'){
    const p=db.plans.find(x=>x.id===body.planId);if(!p)throw new Error('پلن پیدا نشد.');
    p.name=String(body.name??p.name);p.price=Math.max(0,Number(body.price??p.price));p.monthlyLimit=Math.max(0,Number(body.monthlyLimit??p.monthlyLimit));p.stores=Math.max(1,Number(body.stores??p.stores));output=p;
   }else if(action==='grantOwner'){
    const u=db.users.find(x=>x.email===String(body.email||'').trim().toLowerCase());if(!u)throw new Error('ابتدا این ایمیل باید ثبت‌نام کند.');u.role='admin';u.planId='pro';u.isActive=true;u.subscription={planId:'pro',status:'active',source:'owner_comp',expiresAt:null};output={id:u.id,email:u.email,role:u.role,planId:u.planId};
   }else throw new Error('عملیات نامعتبر است.');
   db.audit.push({id:id(),userId:admin.id,action:'admin.'+action,targetId:body.userId||body.paymentId||body.planId||body.storeId||'',createdAt:now()});return output;
  });
  return NextResponse.json({result});
 }catch(e:any){return NextResponse.json({error:e.message||'خطای سرور'},{status:400})}
}
