import { Component } from '@angular/core';
import { ProducerService } from './producer.service';
import { HttpClient } from '@angular/common/http';
import { Color } from './color';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'producercon';
  
  constructor(private service:ProducerService){}
  observed:Color[]=[]

  ngOnInit():void {
    this.service.subscribe('/topic/change',():void=>{
      this.service.Changecolour().subscribe((res:Color[])=>{console.log(res)
    this.observed=res
  for(var i=0;i<this.observed.length;i++){
    document.getElementById(this.observed[i].idd)!.style.fill=this.observed[i].colour
  }})
    })
  }
 
  shapetype=''
  backsend:string[]=[]
connnnect:string[]=[]
   shapes:{type:string,x:any,y:any,w:any,h:any,id:string,color:string}[]=[]
   connected:{first:string,second:string}[]=[]
   id=''
   counterQ=-1;
   machinecounter=-1;
   x1=0;
   x2=0;
   y1=0;
   y2=0;
   processtime=30;
   linepoints:any[]=[]
   onebyone:any[]=[]
   items:any[]=[]
  makeDraggable(event:any) {
    var svg = event.target.getAttribute("x");
    var y=event.target.getAttribute("y");
    console.log(svg);
    console.log(y);
  
  }
  randomcolor(){
    var color 
    color="#"+((1<<24)*Math.random()|0).toString(16)
    console.log(color)
    return color
  }
  getattrib(id:any){
    console.log (document.getElementById(id)!.style.width);
  }
  queueselected(){
    this.shapetype='rect'
    console.log("rect")
  }
  machine(){
    this.shapetype='circle'
  }
  connector(){
    this.shapetype='line'
  }
  selectedplace(event:any){
    if(this.shapetype=='line'){
      this.onebyone.push(event.target.getAttribute("id"))
      console.log(event.offsetX,event.offsetY)
      this.linepoints.push(event.offsetX)
      this.linepoints.push(event.offsetY);
if(this.linepoints.length==4){
  this.connected.push({first:this.onebyone[0],second:this.onebyone[1]})
  this.connnnect.push(this.onebyone[0])
  this.connnnect.push(this.onebyone[1])
  this.onebyone=[]
  console.log(this.connected)
  console.log("kkk")
  this.id='0';
  document.getElementById
  this.shapes.push({type:this.shapetype,x:this.linepoints[0],y:this.linepoints[1],w:this.linepoints[2],h:this.linepoints[3],id:this.id,color:"black"});
  console.log(this.shapes)
  this.linepoints=[]
  this.shapetype=''
} 
    }
    else if(this.shapetype=='rect'||this.shapetype=='circle'){
      if(this.shapetype=='rect'){
        this.counterQ++;
    this.id='Q'+ this.counterQ;
      }
      else{
        this.machinecounter++;
    this.id='M'+ this.machinecounter;
      }
    console.log(event.offsetX,event.offsetY)
    this.shapes.push({type:this.shapetype,x:event.offsetX,y:event.offsetY,w:50,h:30,id:this.id,color:"green"});
    this.backsend.push(this.id)
    console.log(this.id)
    this.shapetype=''
    console.log(this.shapes)
  }
  

  }
  start(){
    document.getElementById("M0")!.style.fill="black"

    var web;
    var numofitems=0
   numofitems=parseInt( (<HTMLInputElement>document.getElementById("items")).value)
   console.log(numofitems)
    var color
    for(var i=1;i<=numofitems;i++){
      color="#"+((1<<24)*Math.random()|0).toString(16)
       this.items.push(color)
    }
  //  this.service.subscribe("change",6545);
    this.service.drawedshapes(this.backsend,this.connected,this.items);
    console.log(this.items);
    this.service.Changecolour().subscribe((res:Color[])=>{console.log(res)
      this.observed=res

    for(var i=0;i<this.observed.length;i++){
      console.log(this.observed[i].idd,this.observed[i].colour)
      document.getElementById(this.observed[i].idd)!.style.fill=this.observed[i].colour
      document.getElementById("M0")!.style.fill="black"

    }})
    
  }
  clear(){
    this.shapes=[]
    this.counterQ=-1;
    this.machinecounter=-1
  }
  undo(){
    var id=this.shapes[this.shapes.length-1].id.charAt(0)
    if(id=='Q'){
      this.counterQ-=1;
    }
    else if(id='M'){
      this.machinecounter-=1
    }
    this.shapes.length= this.shapes.length-1;
  }
  move(){

  }


  

}
var timer=10
function time(){
 timer=timer-1
 var tt=''+timer;
 (<HTMLInputElement>document.getElementById("processStart")).placeholder=tt
 console.log(timer)
 if(timer!=0){
  setTimeout(time  ,1000)
 }
}
setTimeout(time  ,1000)