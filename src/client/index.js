import { performAction } from './js/app'
import { updateUI } from './js/app'
import './styles/style.scss'

console.log(performAction);

document.getElementById('generate').addEventListener('click', performAction);
alert("I donot EXIST")
//console.log("CHANGE!!");

export{
    performAction
}
