

let leadsArr=[];
const leadsTable=document.querySelectorAll('#lead');
/**
 * 
 *   
 */

 sortButton=document.querySelector('#sort');
 sortButton.onclick= async() => {
     await sort();
     render();
 }
var init = function() {

   
    for(let lead of leadsTable)
    {
        const fullName=lead.children[0].innerHTML;
        const email=lead.children[1].innerHTML;
        const phoneNumber=lead.children[2].innerHTML;
        leadsArr.push({fullName,email,phoneNumber});
    }

    
}
/**
 * 
 * @param {
 * } sortable 
 */
var sort = function() {

    leadsArr.sort((a, b) => (a.fullName > b.fullName) ? 1 : -1);

}
/**
 * 
 */
var render = function() {


    for(i=0;i<leadsArr.length;i++)
    {
        leadsTable[i].children[0].innerHTML=leadsArr[i].fullName;
        leadsTable[i].children[1].innerHTML=leadsArr[i].email;
        leadsTable[i].children[2].innerHTML=leadsArr[i].phoneNumber;
    }
}

init();

// console.log(leadsArr);

