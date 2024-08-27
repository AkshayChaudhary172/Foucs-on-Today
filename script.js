
const cheakboxlist=document.querySelectorAll(".user-cheack-box");
const inputlist=document.querySelectorAll(".input-value");
let myerror=document.querySelector(".error");
let complet=document.querySelector("#progress-complet-value");
let progres_val=document.querySelector(".progress-value")
let lebal=document.querySelector(".hed-pare");
let btn=document.querySelector(".remove-btn");


let lenth=cheakboxlist.length;
let allgoals=JSON.parse(localStorage.getItem('allgoals'))||{}

const alllebal=[
    'Raise the bar by completing your goals!',
    'well done your first goal is complete',
    'very nice your secound goal is complete',
    'Well begun is half done!',
    'Just a step away, keep going!',
    'Whoa! You just completed all the goals',
]

let count=()=>{
   return Object.values(allgoals).filter((goal)=>goal.completed).length;
}
count();

 progres_val.style.width=`${count()/lenth*100}%`;
 lebal.innerText=alllebal[count()];

cheakboxlist.forEach((cheackbox)=>{
       cheackbox.addEventListener('click',(e)=>{
         const cheack=[...inputlist].every((input)=>{
          //   console.log(input.value);
          return input.value     
    });

     if(cheack)
     {
       cheackbox.parentElement.classList.toggle("completed");
           const inputid=cheackbox.nextElementSibling.id;
           //    console.log(allgoals[inputid]);
           allgoals[inputid].completed= ! allgoals[inputid].completed;
           console.log(count());

          complet.innerText=`${count()}/${lenth} Completed`;
          complet.style.visibility="visible";

           progres_val.style.width=`${count()/lenth*100}%`;
           progres_val.style.visibility="visible";

          lebal.innerText=alllebal[count()];

         localStorage.setItem('allgoals',JSON.stringify(allgoals));

     } 
     else{
        myerror.style.display="block";
     }
            
   })
})

inputlist.forEach((input)=>{
    input.addEventListener('focus',(e)=>{
        myerror.style.display="none";
    })
     input.addEventListener('input',(e)=>{
          if(allgoals[input.id] && allgoals[input.id].completed)
            {
               input.value=allgoals[input.id].name
               return;
            }
               allgoals[input.id]={
               name:input.value,
               completed:false,
            }
         localStorage.setItem('allgoals',JSON.stringify(allgoals));
      })

           // console.log(allgoals[input.id]);
           if(allgoals[input.id]){
           input.value=allgoals[input.id].name;
 
           if(allgoals[input.id].completed)
             {
               input.parentElement.classList.add('completed');
             }
          }
})
btn.addEventListener('click',(e)=>{
        inputlist.forEach((input)=>{
        input.parentElement.classList.remove('completed');
        input.value="";
    })
    localStorage.clear();
})


