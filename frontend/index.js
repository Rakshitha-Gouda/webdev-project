//alert("Connected to the server!");
//alert("this is from, javascript");
const users=[
    {
        "name": "Rakshitha",
        "gender": "Female",
        "image": "jane.png"
    },
    {
        "name": "John",
        "gender": "Male",
        "image": "john.png"
    }
]

var curIndex=0;
function toggle()
{
    if(curIndex==0)
        curIndex=1;
    else
        curIndex=0;
    document.getElementById("card-image").src=users[curIndex].image;
    document.getElementById("card-name").innerText=users[curIndex].name;
    document.getElementById("card-gender").innerText=users[curIndex].gender;
}
