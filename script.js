const operations={
    'add':"+",
    'eq':"=",
    'mult':"*",
    'div':"/",
    'sub':"-",
    'mod':"%"
};

class Model{
    constructor(){
        this.operation="";
        this.result=0;
        this.resultString="";
        this.dotFlag=false;
        //this.operatorFlag=false;
    }

    setNumber(num){
        this.resultString+=num;
    }

    getResultString(){
         return this.resultString;
     }
 

    setOperation(operation){
        this.operation=operation;
        var len=this.resultString.length;
        //console.log(len);
        var c=this.resultString[len-1];
        this.dotFlag=false;
        //console.log(c);
        if(c>='0' && c<='9'){
            this.resultString += operations[this.operation];
            //console.log(this.resultString);
        }else if(len===0){
            this.resultString += operations[this.operation];
        }
    }

    setDot(dot){
        //console.log(this.resultString);
        this.dot=dot.value;
        var val=this.resultString.slice(-1);
        //console.log(this.dot);
        //if(Number.isInteger(val) && decimalAllowed===true){
            //if(!this.resultString.includes(this.dot)){
            if(this.dotFlag===false){
            this.resultString += this.dot;
            this.dotFlag=true;
            //console.log(this.resultString);
            }
            //}
           // decimalAllowed=false;
        //}else if(val==="+" || val==="-" || val==="*" || val==="/"){
            //decimalAllowed=true;
        //}
    }

    delete(value){
        let endCharacter=value.slice(-1);
        console.log(endCharacter);
        if(endCharacter==="."){
            this.dotFlag=false;
        }
        this.resultString=value.slice(0,-1);
        console.log(this.resultString);
    }

    clearScreen(){
        this.dotFlag=false;
        this.resultString="";
    }

    reset(){
        this.operation="";
        this.result=0;
        this.resultString="";
    }
    //resetDel(){
       // this.resultString=this.resultString.substring(0,this.resultString.length-1);
    //}

    performExpression(){
        this.result=eval(this.resultString);
        //parseFloat(this.result).toFixed(2);
        console.log(this.result);
        this.resultString=String(this.result);
        //this.resultString.toFixed(4);
    }
    
}

class View{
    constructor(){
        this.screen=document.getElementById('display');
        this.screen.value="0";
        this.operations=document.querySelectorAll('.operation');
        this.clearBtn=document.getElementById('AC');
        this.keys=document.querySelectorAll('.key');
        this.equal=document.getElementById('eq');
        this.delBtn=document.getElementById('C');
        this.dotBtn=document.getElementById('keyDot');
    }
    displayResult(value){
        this.screen.value=value;
    }
    // clearScreen(){
    //     this.screen.value="0";
    // }
    // delete(value){
    //     let endCharacter=value.slice(-1);
    //     console.log(endCharacter);
    //     if(endCharacter==="."){
    //         this.model
    //     }
       // var res=this.screen.value;
        //console.log(res);
       // this.screen.value=res.substring(0,res.length-1);
        //this.resultString=res.substring(0,res.length-1);        
   // }
}

class Controller{

    constructor(Model,View){
        this.model=new Model();
        this.view=new View();
    }

    keysListener(){
        this.view.keys.forEach((e) => e.addEventListener('click',()=>{
            this.model.setNumber(e.getAttribute('data-key'));
            this.view.displayResult(this.model.getResultString());
        }));
    }
    
    operationsListener(){
        this.view.operations.forEach((e) => e.addEventListener('click',()=>{
            this.model.setOperation(e.getAttribute('data-op'));
            this.view.displayResult(this.model.getResultString());
        }));
    }
    equalListener(){
        this.view.equal.addEventListener('click',()=>{
            this.model.performExpression();
            this.view.displayResult(this.model.getResultString());
        });
    }
    clearListener(){
        this.view.clearBtn.addEventListener('click',()=>{
            //this.model.reset();
            this.model.clearScreen();
            this.view.displayResult(this.model.getResultString());
        })
    }
    deleteListener(){
        this.view.delBtn.addEventListener('click', ()=>{
           // this.model.resetDel();
            this.model.delete(this.model.getResultString());
            this.view.displayResult(this.model.getResultString());
        })
    }
    dotListener(){
        this.view.dotBtn.addEventListener('click', ()=>{
            this.model.setDot(this.view.dotBtn);
            this.view.displayResult(this.model.getResultString());
        })
    }
}
class Calculator{
    constructor(Controller,Model,View){
        this.controller=new Controller(Model,View);
    }
    init(){
        this.controller.keysListener();
        this.controller.clearListener();
        this.controller.operationsListener();
        this.controller.equalListener();
        this.controller.deleteListener();
        this.controller.dotListener();
    }
}
const calculator=new Calculator(Controller,Model,View);
calculator.init();