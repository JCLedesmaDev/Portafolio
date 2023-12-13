// window.onload = function () {
const root = document.createElement('div')
root.id = 'root'

const $refSplashWrapper = document.createElement('div')
$refSplashWrapper.innerHTML = `
        <div class="skeleton">
            <div class="card">
                <img class="spinnerGif" src="spinner.gif" />
                <div> Espere por favor...</div>
            </div>
      </div >
  `

document.body.appendChild($refSplashWrapper)
document.addEventListener('DOMContentLoaded', () => {
    $refSplashWrapper.style.display = 'none'
})
// }
