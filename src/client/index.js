import { performAction } from './js/app'
import './styles/style.scss'

console.log(performAction);

//Add event listener
document.getElementById('generate').addEventListener('click', performAction);

export{
    performAction
}
