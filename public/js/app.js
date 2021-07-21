import { html, render } from '../js/spux.js'
import Navbar from '../components/Navbar.js'
import '../js/dior.js'

const creditsUri = './webcredits/webcredits.json'
const ledgerUri = './webcredits/webledger.json'

console.log(di.data.dependencies)

function renderAll() {
  render(
    html`
      <${Navbar} title="${di.data.name}" />

      <h4>Profile</h4>

      <img width="120" height="120" src="./images/bot3.png" />

      <h5>Genesis</h5>

      <div class="row">PublicKey: bUnZHeiSuxervBUWBGsKp73Nxj67RnHeri
      </div>
      <div class="row">Block: gitmark:8afb94f4dc1d3a65bdefb84fd02b957563a46f854a9393573325:0</div>
      <div class="row">Birth: 18/7/2021, 19:05:05</div>

      <h5>Skills</h5>
      ${Object.entries(di.data.dependencies).map(i => {
      console.log(i)
      var skill = i[0].substring(6)
      skill = skill[0].toUpperCase() + skill.substring(1)
      return html`<div class="row">${skill} : <a href="https://npm.com/pakage/${i[1]}">${i[1]}</a></div>`
    })}
      
      <h5>Vital Stats</h5>
      <div class="row">Energy: 994973 marks</div>


    `,
    document.body
  )
}

renderAll()
