const celeste = document.getElementById('celeste')
const violeta = document.getElementById('violeta')
const rojo = document.getElementById('rojo')
const verde = document.getElementById('verde')
const btnEmpezar = document.getElementById('btnEmpezar')
const ULTIMO_NIVEL = 10
const green = new Audio('audio/green.mp3')
const red = new Audio('audio/red.mp3')
const blue = new Audio('audio/blue.mp3')
const violet = new Audio('audio/violet.mp3')
const audioPerder = new Audio('audio/lose.mp3')
const puntuacion = 0

const sonidos = [blue, violet, red, green, audioPerder]

class Juego {
  constructor() {
    this.inicializar = this.inicializar.bind(this)
    this.inicializar()
    this.generarSecuencia()
    setTimeout(this.siguienteNivel, 500)
  }

  inicializar() {
    this.siguienteNivel = this.siguienteNivel.bind(this)
    this.elegirColor = this.elegirColor.bind(this)
    this.toggleBtnEmpezar()
    this.nivel = 1
    this.puntuacion = 0
    this.colores = {
      celeste, //celeste: celeste
      violeta,
      rojo,
      verde
    }
  }

  toggleBtnEmpezar() {
    if (btnEmpezar.classList.contains('hide')) {
      btnEmpezar.classList.remove('hide')
    } else {
      btnEmpezar.classList.add('hide')
    }
  }

  generarSecuencia() {
    this.secuencia = new Array(ULTIMO_NIVEL).fill(0).map(n => Math.floor(Math.random() * 4))
  }

  siguienteNivel() {
    this.subnivel = 0
    this.iluminarSecuencia()
    this.agregarEventosClick()
  }

  transformarNumeroAColor(numero) {
    switch (numero) {
      case 0:
        return 'celeste'
      case 1:
        return 'violeta'
      case 2:
        return 'rojo'
      case 3:
        return 'verde'
    }
  }

  transformarColorANumero(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'rojo':
        return 2
      case 'verde':
        return 3
    }
  }

  elegirAudio(color) {
    switch (color) {
      case 'celeste':
        return 0
      case 'violeta':
        return 1
      case 'rojo':
        return 2
      case 'verde':
        return 3
    }
  }

  iluminarSecuencia() {
    for (let i = 0; i < this.nivel; i++) {
      const color = this.transformarNumeroAColor(this.secuencia[i])
      const sonido = this.elegirAudio(color)
      setTimeout(() => this.iluminarColor(color, sonido), 1000 * i)
    }
  }

  iluminarColor(color, sonido) {
    this.colores[color].classList.add('light')
    sonidos[sonido].play()
    setTimeout(() => this.apagarColor(color), 350)
  }

  apagarColor(color) {
    this.colores[color].classList.remove('light')
  }

  agregarEventosClick() {
    this.colores.celeste.addEventListener('click', this.elegirColor)
    this.colores.verde.addEventListener('click', this.elegirColor)
    this.colores.violeta.addEventListener('click', this.elegirColor)
    this.colores.rojo.addEventListener('click', this.elegirColor)
  }

  eliminarEventosClick() {
    this.colores.celeste.removeEventListener('click', this.elegirColor)
    this.colores.verde.removeEventListener('click', this.elegirColor)
    this.colores.violeta.removeEventListener('click', this.elegirColor)
    this.colores.rojo.removeEventListener('click', this.elegirColor)
  }

  elegirColor(ev) {
    const nombreColor = ev.target.dataset.color
    const numeroColor = this.transformarColorANumero(nombreColor)
    const sonido = this.elegirAudio(nombreColor)
    this.iluminarColor(nombreColor, sonido)

    if (numeroColor ===  this.secuencia[this.subnivel]) {
      this.subnivel++
      this.puntuacion++
      if (this.subnivel === this.nivel) {
        this.nivel++
        this.eliminarEventosClick()
        if (this.nivel === (ULTIMO_NIVEL + 1)) {
          this.ganoElJuego()
        } else {
          swal("Bien!!!", `Puntuación: ${this.puntuacion} puntos \n Siguiente Nivel: ${this.nivel}`, "success")
          .then(() => setTimeout(this.siguienteNivel, 1000))
        }
      }
    } else {
      this.perdioElJuego()
    }
  }

  ganoElJuego() {
    swal('Platzi', `Felicitaciones, ganaste el juego! \n Puntuación Final: ${this.puntuacion}`, 'success')
      .then(this.inicializar)
  }

  perdioElJuego() {
    sonidos[4].play()
    swal('Platzi', `Lo lamentamos, perdiste :( \n Puntuación Final: ${this.puntuacion}`, 'error')
      .then(() => {
        this.eliminarEventosClick()
        this.inicializar()
      })
  }

}


function empezarJuego() {
  window.juego = new Juego()
}
