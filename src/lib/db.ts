import { promises as fs } from 'node:fs';
import path from 'node:path';
export type Row = {id:string; userId?:string; storeId?:string; createdAt:string; [key:string]:any};
export type DB = {users:any[];stores:Row[];products:Row[];members:Row[];contents:Row[];metrics:Row[];usage:Row[];plans:any[];payments:Row[];audit:Row[]};
const file=path.join(process.cwd(),'data','db.json');
const empty:DB={users:[],stores:[],products:[],members:[],contents:[],metrics:[],usage:[],plans:[{id:'free',name:'رایگان',price:0,monthlyLimit:3,stores:1},{id:'starter',name:'شروع',price:299000,monthlyLimit:50,stores:3},{id:'pro',name:'حرفه‌ای',price:799000,monthlyLimit:250,stores:10}],payments:[],audit:[]};
let chain=Promise.resolve();
export async function readDB():Promise<DB>{try{return {...empty,...JSON.parse(await fs.readFile(file,'utf8'))}}catch{return structuredClone(empty)}}
export async function writeDB(db:DB){await fs.mkdir(path.dirname(file),{recursive:true});const tmp=file+'.tmp';await fs.writeFile(tmp,JSON.stringify(db,null,2));await fs.rename(tmp,file)}
export async function mutate<T>(fn:(db:DB)=>T|Promise<T>):Promise<T>{let result!:T;const task=chain.then(async()=>{const db=await readDB();result=await fn(db);await writeDB(db)});chain=task.catch(()=>{});await task;return result}
export const id=()=>crypto.randomUUID();
export const now=()=>new Date().toISOString();
