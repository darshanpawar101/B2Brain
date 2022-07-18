import data from "../data.js";
let newdata=data;


const buildJsonDiv = (jsondiv) => {
    
    // Create elements needed to build a card
    const div =  document.createElement("div");
    const img = document.createElement("img");
    const tempdiv = document.createElement("div");
    const temph2 = document.createElement("h2");
    const subdiv = document.createElement("div");
    const h2 = document.createElement("h2");
    const h6 = document.createElement("h6");
    const button = document.createElement("button");
    
    // Append newly created elements into the DOM

    const body = document.querySelector("#jsonresult");
    body.append(div);
    //console.log(jsondiv);
    if(jsondiv.logo==""){
        div.append(tempdiv);
        tempdiv.append(temph2);
    }else{
        div.append(img);
    }
   
    div.append(subdiv);
    subdiv.append(h2);
    subdiv.append(h6);
    div.append(button);

    
    // Set content and attributes
    if(jsondiv.logo==""){
        temph2.innerHTML = jsondiv.company[0];
        tempdiv.style = "background:"+jsondiv.color;
        tempdiv.setAttribute("class","jsondiv-tempdiv");
        temph2.setAttribute("class","jsondiv-temph2");
    }else{
        img.setAttribute("src", jsondiv.logo);
        img.setAttribute("class","jsondiv-img");
    }

    

    h2.innerHTML = jsondiv.company;
    h6.innerHTML = jsondiv.website;
    button.innerHTML = "Track";
    div.setAttribute("class","jsondiv-div")
    
    h2.setAttribute("class","jsondiv-h2");
    h6.setAttribute("class","jsondiv-h6");
    subdiv.setAttribute("class","jsondiv-subdiv");
    button.setAttribute("class","jsondiv-button");
    button.setAttribute("id",`${jsondiv.id}`);
    button.setAttribute("onclick",'trackfunction('+jsondiv.id+')');
  };

  window.trackfunction = function trackfunction(idvalue){

    let ans = newdata.find(item => {
   return item.id == idvalue;})
   console.log(ans.company+" "+ans.slug+" tracked at "+Date.now()+" "+ans.logo);
   var tempbutton = document.getElementById(idvalue);
   tempbutton.style = "border: 2px solid #1AAB2B; color: #1AAB2B;";
   tempbutton.innerHTML = "Tracking";
}

  function createResult(tempdata){
    tempdata.forEach(jsondiv => buildJsonDiv(jsondiv));
  }
  
  window.myFunc = function myFunc(){
    
    
        var searchval = document.getElementById("searchinputtext");
        if(searchval.value==""){
            removeElements();
            newdata=data;
            createResult(newdata);
            
            var element_home = document.getElementById("homepage");
            var element_head = document.getElementById("headings");
            var temp = document.getElementById("searchicon");
            temp.classList.remove("fa-search");
            temp.classList.add("fa-times");
            if (element_home.style.display === "block") {
                element_home.style.display = "none"; 
                element_head.style.display = "flex";  
            }
        }
        
    }

    function removeElements(){

        const boxes = document.querySelectorAll('.jsondiv-div');
        boxes.forEach(box => {
        box.remove();
        });
    
    }

    window.resetCross = function resetCross(){
        
        var element_home = document.getElementById("homepage");
        var element_head = document.getElementById("headings");
        var temp = document.getElementById("searchicon");
        document.getElementById("searchinputtext").value = "";
        temp.classList.remove("fa-times");
        temp.classList.add("fa-search");
        if (element_home.style.display === "none") {
            element_home.style.display = "block"; 
            element_head.style.display = "none";    
        }
        removeElements();
    }

    

    async function fetchApi(url){
        try {
            let res = await fetch(url);
            let changed = await res.json();
            for(let i=0;i<changed.length;i++){
                changed[i].id=7+i+1;
            }
            return changed;
        } catch (error) {
            console.log(error);
        }
    }


    window.mySearchFunction = async function mySearchFunction(searchvalue){
        removeElements();
        newdata=data;
        let url='https://tva.staging.b2brain.com/search/autocomplete_org_all/?q='+searchvalue;
        // console.log(searchvalue);
        // console.log(url);
        if(searchvalue!=""){
            const response = await fetchApi(url);
            if(response.length==0){
                alert("No Result Found!");
            }   
            newdata = newdata.concat(response);
            createResult(newdata);
        }
        
    } 

