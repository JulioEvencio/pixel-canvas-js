/*
	Deixando o canvas responsivo
*/
function redimensionarCanvas() {
	if (window.screen.width <= 600)
		document.querySelector('#tela').width = window.screen.width - 25
	else if (window.screen.width < 1000)
		document.querySelector('#tela').width = window.screen.width - 200
	else
		document.querySelector('#tela').width = 800

	document.querySelector('#tela').height = 400
}

redimensionarCanvas()

let addEvent = function(elem, type, eventHandle) {
    if (elem == null || typeof(elem) == 'undefined') return;
    if ( elem.addEventListener ) {
        elem.addEventListener( type, eventHandle, false );
    } else if ( elem.attachEvent ) {
        elem.attachEvent( "on" + type, eventHandle );
    } else {
        elem["on"+type]=eventHandle;
    }
};

addEvent(window, "resize", function(){
  redimensionarCanvas()
});

/*
	Inicio da logica para desenhar
*/
let corSelecionada = '#000000'
let canvas = document.querySelector('#tela')
let context = tela.getContext('2d')
let podeDesenhar = false
let mouseX = 0
let mouseY = 0

/*
	Evento que altera a cor selecionada
*/
document.querySelectorAll('.cores').forEach(elemento => {
	elemento.addEventListener('click', alterarCor)
})

function alterarCor(e) {
	corSelecionada = e.target.getAttribute('cor')

	document.querySelector('.cor-selecionada').classList.remove('cor-selecionada')
	e.target.classList.add('cor-selecionada')
}

/*
	Eventos que desenham na tela
*/
canvas.addEventListener('mousedown', mousePressionado)
canvas.addEventListener('mousemove', mouseMovimento)
canvas.addEventListener('mouseup', mouseSolto)

function mousePressionado(e) {
	podeDesenhar = true
	mouseX = e.pageX - canvas.offsetLeft
	mouseY = e.pageY - canvas.offsetTop
}

function mouseMovimento(e) {
	if (podeDesenhar) {
		let x = e.pageX - canvas.offsetLeft
		let y = e.pageY - canvas.offsetTop

		context.beginPath()
		context.lineWidth = 5
		context.lineJoin = 'round'
		context.moveTo(mouseX, mouseY)
		context.lineTo(x, y)
		context.closePath()

		context.strokeStyle = corSelecionada
		context.stroke()

		mouseX = x
		mouseY = y
	}
}

function mouseSolto() {
	podeDesenhar = false
}

/*
	Evento que limpa a tela
*/
document.querySelector('#botao-limpar-tela').addEventListener('click', limparTela)

function limparTela() {
	context.setTransform(1, 0, 0, 1, 0, 0)
	context.clearRect(0, 0, context.canvas.width, context.canvas.height)
}