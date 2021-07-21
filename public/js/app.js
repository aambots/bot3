import { html, render } from '../js/spux.js'
import Navbar from '../components/Navbar.js'
import '../js/dior.js'

const creditsUri = './webcredits/webcredits.json'
const ledgerUri = './webcredits/webledger.json'

console.log(di.data)

function renderAll() {
  render(
    html`
      <${Navbar} title="${di.data.name}" />
      <h5>Profile</h5>

      <div class="row">Name: ${di.data.name}</div>
      <div class="row">PublicKey: bUnZHeiSuxervBUWBGsKp73Nxj67RnHeri
      </div>


      <h5>Genesis</h5>

      <div class="row">Block: gitmark:8afb94f4dc1d3a65bdefb84fd02b957563a46f854a9393573325:0</div>
      <div class="row">Birth: 7/18/2021, 7:05:05 PM</div>

      <h5>Skills</h5>
      <div class="row">Profile: 0.0.1</div>
      <div class="row">Serve: 0.0.6</div>
      <div class="row">Updater: 0.0.4</div>
      <div class="row">Markserver: 0.0.2</div>
      <div class="row">Webcredits: 0.0.3</div>
      
      <h5>Vital Stats</h5>
      <div class="row">Energy: 994973 marks</div>


    `,
    document.body
  )
}

renderAll()
