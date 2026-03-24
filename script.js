let input = document.querySelector('#input-box input');
let buttons = document.querySelectorAll('.key');
let serial = document.querySelector(".serial")
let result = document.querySelector(".result")
let resWindow = document.querySelector(".result-scroll")
let totalCftBox = document.querySelector(".total")

const deleteLine = () => {
    let line = resWindow.querySelector(`#line${slno}`)
    line.remove()
    slno-=1
    totalCft-=cft
    if(slno == '0'){
        cft = 0;
    }
    else{
        cft= Number(document.querySelector(`#line${slno} .result`).innerText)
    }
    
    totalCftBox.innerHTML = totalCft.toFixed(2)
    
}


let slno = 0;
let totalCft = 0;
let string = "";
let arr = Array.from(buttons);
arr.forEach(button => {
    button.addEventListener('click', (e) =>{
        if(e.target.innerHTML == '='){
            calculateCft()
            string = "";
            input.value = string;
            resWindow.style.overflowX == "auto" ? resWindow.style.overflowX = "":resWindow.style.overflowX = "";

        }

        else if(e.target.id == 'allclear'){
            string = "";
            resWindow.innerHTML = string;
            input.value = string;
            totalCft = 0;
            totalCftBox.innerHTML = 'totalcft';
            slno = 0;
        }
        else if(e.target.id == 'clear'){
            string = string.substring(0, string.length-1);
            input.value = string;
        }
        else if(e.target.id == 'delete'){
            deleteLine()
        }
        else{
            string += e.target.innerHTML;
            input.value = string;
        }
        
    })
}) 
const divFun = () =>{
    let it = document.createElement("div");
    it.className = "line"
    it.id = `line${slno}`
    it.innerHTML = `<div class="serial">
                        ${slno}.
                    </div>
                    <div class="equation">${eqn} </div> 
                    <div class="result">
                        ${cft}
                    </div>`
    resWindow.append(it)

} 
const calculateCft = () =>{
    
    let inpArr =[]
    for (let x of string ){
        inpArr.push(Number(x))
    }
    if (inpArr.length < 4){
        return;   
    } else {
        slno+=1;    
    }
    if(inpArr.length == 5){
        inpArr[3] = Number(`${inpArr[3]}${inpArr[4]}`)
        inpArr.pop(inpArr[4])
    }
    h = inpArr[0] + (inpArr[1]/12)
    c = (inpArr[2]*12) + inpArr[3]
    cft = ((c*c*h)/2304).toFixed(2);

    totalCft+=Number(cft);
    eqn = `${inpArr[0]}-${inpArr[1]}-${inpArr[2]}-${inpArr[3]}`

    totalCftBox.innerHTML = totalCft.toFixed(2)
    divFun()
}

totalCftBox.addEventListener('click',()=>{
    resWindow.style.overflowX = "auto"
})

document.getElementById("#downloadButton").addEventListener("click", downloadDivAsJpg);

function downloadDivAsJpg() {

    let it = document.createElement("div");
    it.className = "line"
    it.id = `printTotal`
    it.innerHTML = `<div class="serial">
                        TOTAL
                    </div>
                    
                    <div class="result">
                        ${totalCft.toFixed(2)}
                    </div>`
    resWindow.append(it)

    const now = new Date();
    const fileName =
        now.getFullYear() + "-" +
        String(now.getMonth() + 1).padStart(2, '0') + "-" +
        String(now.getDate()).padStart(2, '0') + "_" +
        String(now.getHours()).padStart(2, '0') + "-" +
        String(now.getMinutes()).padStart(2, '0') + "-" +
        String(now.getSeconds()).padStart(2, '0') +
        ".jpg";

    html2canvas(resWindow).then(canvas => {
        const jpgData = canvas.toDataURL("image/jpeg", 0.9);

        const link = document.createElement("a");
        link.download = fileName;  
        link.href = jpgData;
        link.click();
    });

    document.getElementById("printTotal").remove();
}
