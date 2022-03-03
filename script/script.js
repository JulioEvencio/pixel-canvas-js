document.querySelector('#menu-mobile').addEventListener('click', exibirMenu)

function exibirMenu() {
	if (document.querySelector('#menu').style.display == 'block')
		document.querySelector('#menu').style.display = 'none'
	else
		document.querySelector('#menu').style.display = 'block'
}