// Bootstrap principal de la demo Uber.
// La logica concreta vive en src/js; este archivo conecta modulos y estado.
;(function () {
  'use strict';

const {
  Subject,
  EstadoUiObserver,
  EstadoProgresoObserver,
  EstadoFlujoObserver,
  EstadoAccionesObserver,
  DriverFactory,
  RideCommand,
  LeafletMapAdapter,
  PagoStrategy
} = window.UberPatterns;

const {
  estadosPrincipales,
  estadosAlternos,
  todosLosEstados,
  estadosTerminales,
  estadosRegresoDirecto,
  estadosReinicioObligatorio,
  nombresEstado,
  tiposViaje,
  metodosPago
} = window.UberAppConfig;

const {
  centroMapa,
  origenInicial,
  destinoInicial,
  rutaInicial,
  rutasFlota
} = window.UberMapConfig;

const {
  estadoTitulo,
  estadoDescripcion,
  progressBar,
  precioMapa,
  resumenRuta,
  inputOrigen,
  inputDestino,
  paymentDropdown,
  selectedPaymentText,
  fareOptions,
  fareRouteText,
  paymentDecisionModal,
  paymentDecisionText,
  ratingModal,
  ratingStars,
  ratingError,
  originModeBtn,
  destinationModeBtn,
  estadoPaso,
  stateOptions,
  backStateBtn,
  cancelEventBtn,
  changeDestinationEventBtn,
  emergencyEventBtn,
  refundEventBtn,
  mapSection
} = window.UberDomElements;

const {
  limitarProgreso,
  suavizarMovimiento,
  normalizarLatLng,
  formatearCoordenadas,
  calcularDistanciaKm
} = window.UberUtils;

const {
  createMapUi,
  registerGlobalListeners,
  createFareUi,
  createEventButtonsUi,
  createStatePanelUi,
  createPaymentUi,
  createRatingUi
} = window.UberAppUi;

const {
  createVehicleAnimationService,
  createRideEventService,
  createDriverService,
  createRouteService,
  createRideFlowService,
  createStateService,
  createMapInteractionService,
  createStateObserverService,
  createRideCommandService
} = window.UberAppServices;

const {
  registerLifecycleCleanup,
  exposePublicApi,
  startRideApp,
  createRideAppModules,
  createMapRuntime,
  createUiActions,
  createServiceActions,
  createRideActions
} = window.UberAppRuntime;

const estadoSubject = new Subject();
let stateObserverService = null;
let rideCommandService = null;
let fareUi = null;
let eventButtonsUi = null;
let statePanelUi = null;
let paymentUi = null;
let ratingUi = null;
let vehicleAnimationService = null;
let rideEventService = null;
let driverService = null;
let routeService = null;
let rideFlowService = null;
let stateService = null;
let mapInteractionService = null;

let estadoActual = "PedidoIniciado";
let flujoActivo = false;
let indiceFlujo = 0;
let intervaloFlujo = null;
let historialEstados = [];
let modoMapa = "origen";
let metodoPagoSeleccionado = "Tarjeta **** 4242";
let tipoViajeSeleccionado = "UberX";
let pagoProcesadoConfirmado = false;
let calificacionCliente = 0;
let calificacionEnviada = false;
let rutaCalculando = false;
let rutaPorCallesDisponible = false;
let recalculoDestinoEnCurso = false;
let rutaCoords = [];
let progresoCarro = 0;
let animacionCarroId = null;
let animacionFlotaId = null;
let conductorAsignado = null;
let carMarker = null;
let flotaCarros = [];
let rutaInfo = {
  distanciaKm: 9.8,
  duracionMin: 20
};

let origenCoords = [...origenInicial];
let destinoCoords = [...destinoInicial];

const {
  toggleMetodoPago,
  cerrarMetodoPago,
  seleccionarMetodoPago,
  abrirModalProcesarPago,
  cerrarModalProcesarPago,
  decidirProcesarPago,
  reintentarProcesarPago,
  abrirModalCalificacion,
  cerrarModalCalificacion,
  seleccionarCalificacion,
  enviarCalificacion,
  actualizarPreciosPorRuta,
  calcularRangoPrecio,
  calcularPrecioFinal,
  actualizarResumenRuta
} = createUiActions({
  getPaymentUi: () => paymentUi,
  getRatingUi: () => ratingUi,
  getFareUi: () => fareUi,
  getTipoViajeSeleccionado: () => tipoViajeSeleccionado
});

const {
  crearFlotaCarros,
  crearIconoCarro,
  iniciarMovimientoFlota,
  asignarConductorMasCercano,
  anunciarConductor,
  liberarConductorAsignado,
  seleccionarModoMapa,
  actualizarPuntoMapa,
  limpiarCampo,
  actualizarRutaReal,
  aplicarRutaDirectaTemporal,
  moverCarro,
  moverCarroAPunto,
  moverCarroEnRuta,
  detenerAnimacionCarro,
  obtenerPuntoRuta,
  obtenerPuntoEnCoordenadas,
  calcularLongitudRuta,
  calcularLongitudCoordenadas
} = createServiceActions({
  getDriverService: () => driverService,
  getMapInteractionService: () => mapInteractionService,
  getRouteService: () => routeService,
  getVehicleAnimationService: () => vehicleAnimationService,
  getFlotaCarros: () => flotaCarros
});

const {
  registrarObservadoresEstado,
  registrarComandosEvento,
  ejecutarComandoEvento,
  mostrarEstado,
  cambiarEstado,
  formatearEstado,
  obtenerDescripcionEstado,
  iniciarFlujo,
  detenerFlujo,
  avanzarEstadoManual,
  moverCarroPorEstado,
  puedeCancelarCliente,
  puedeCambiarDestino,
  puedeReportarEmergencia,
  puedeSolicitarReembolso,
  marcarPedidoSinConductor,
  expirarPedido,
  cancelarPorConductor,
  marcarNoShow,
  solicitarCancelacion,
  solicitarCambioDestino,
  solicitarEmergencia,
  solicitarReembolso,
  cancelarCliente,
  cambiarDestino,
  emergencia,
  reembolso,
  actualizarBotonesEventos,
  configurarBotonEvento,
  obtenerIndiceEstado,
  obtenerPoliticaRegreso,
  puedeRegresarEstado,
  renderizarOpcionesEstado,
  obtenerAccionesEstado,
  regresarEstado
} = createRideActions({
  getStateObserverService: () => stateObserverService,
  getRideCommandService: () => rideCommandService,
  getStateService: () => stateService,
  getRideFlowService: () => rideFlowService,
  getRideEventService: () => rideEventService,
  getEventButtonsUi: () => eventButtonsUi,
  getStatePanelUi: () => statePanelUi
});

stateService = createStateService({
  nombresEstado,
  estadosPrincipales,
  todosLosEstados,
  estadosRegresoDirecto,
  estadosReinicioObligatorio,
  tiposViaje,
  estadoSubject,
  estadoDescripcion,
  progressBar,
  getEstadoActual: () => estadoActual,
  setEstadoActual: valor => {
    estadoActual = valor;
  },
  getHistorialEstados: () => historialEstados,
  getTipoViajeSeleccionado: () => tipoViajeSeleccionado,
  getMetodoPagoSeleccionado: () => metodoPagoSeleccionado,
  getPagoProcesadoConfirmado: () => pagoProcesadoConfirmado,
  getCalificacionEnviada: () => calificacionEnviada,
  calcularRangoPrecio,
  detenerFlujo,
  cerrarModalProcesarPago,
  cerrarModalCalificacion,
  onReiniciarPedido: () => {
    indiceFlujo = 0;
    intervaloFlujo = null;
    flujoActivo = false;
    pagoProcesadoConfirmado = false;
    calificacionCliente = 0;
    calificacionEnviada = false;
    recalculoDestinoEnCurso = false;
    progresoCarro = 0;
    liberarConductorAsignado();
    setTimeout(() => iniciarFlujo(), 0);
  }
});
stateObserverService = createStateObserverService({
  estadoSubject,
  EstadoUiObserver,
  EstadoProgresoObserver,
  EstadoFlujoObserver,
  EstadoAccionesObserver,
  estadoTitulo,
  estadoDescripcion,
  progressBar,
  formatearEstado,
  obtenerIndiceEstado,
  setIndiceFlujo: valor => {
    indiceFlujo = valor;
  },
  renderizarOpcionesEstado
});
rideCommandService = createRideCommandService({
  RideCommand,
  actualizarBotonesEventos,
  puedeCancelarCliente,
  cancelarCliente,
  puedeCambiarDestino,
  cambiarDestino,
  puedeReportarEmergencia,
  emergencia,
  puedeSolicitarReembolso,
  reembolso
});

registrarObservadoresEstado();
registrarComandosEvento();
registrarModulosUi();

const mapRuntime = createMapRuntime({
  createMapUi,
  createMapInteractionService,
  createVehicleAnimationService,
  createRouteService,
  createDriverService,
  L,
  LeafletMapAdapter,
  DriverFactory,
  centroMapa,
  origenCoords,
  destinoCoords,
  rutaInicial,
  rutasFlota,
  originModeBtn,
  destinationModeBtn,
  mapSection,
  inputOrigen,
  inputDestino,
  formatearCoordenadas,
  normalizarLatLng,
  progressBar,
  limitarProgreso,
  suavizarMovimiento,
  calcularDistanciaKm,
  estadoDescripcion,
  getModoMapa: () => modoMapa,
  setModoMapa: valor => {
    modoMapa = valor;
  },
  getFlujoActivo: () => flujoActivo,
  setIndiceFlujo: valor => {
    indiceFlujo = valor;
  },
  getRecalculoDestinoEnCurso: () => recalculoDestinoEnCurso,
  setRecalculoDestinoEnCurso: valor => {
    recalculoDestinoEnCurso = valor;
  },
  setOrigenCoords: valor => {
    origenCoords = valor;
  },
  setDestinoCoords: valor => {
    destinoCoords = valor;
  },
  detenerFlujo,
  actualizarRutaReal,
  getRutaPorCallesDisponible: () => rutaPorCallesDisponible,
  cambiarEstado,
  getCarMarker: () => carMarker,
  getAnimacionCarroId: () => animacionCarroId,
  setAnimacionCarroId: valor => {
    animacionCarroId = valor;
  },
  getProgresoCarro: () => progresoCarro,
  setProgresoCarro: valor => {
    progresoCarro = valor;
  },
  getRutaCoords: () => rutaCoords,
  getOrigenCoords: () => origenCoords,
  getDestinoCoords: () => destinoCoords,
  getConductorAsignado: () => conductorAsignado,
  setRutaCalculando: valor => {
    rutaCalculando = valor;
  },
  setRutaPorCallesDisponible: valor => {
    rutaPorCallesDisponible = valor;
  },
  setRutaCoords: valor => {
    rutaCoords = valor;
  },
  setRutaInfo: valor => {
    rutaInfo = valor;
  },
  moverCarroEnRuta,
  actualizarResumenRuta,
  actualizarPreciosPorRuta,
  mostrarEstado,
  obtenerDescripcionEstado,
  obtenerPuntoEnCoordenadas,
  setConductorAsignado: valor => {
    conductorAsignado = valor;
  },
  setCarMarker: valor => {
    carMarker = valor;
  },
  setAnimacionFlotaId: valor => {
    animacionFlotaId = valor;
  }
});
const { mapUi, mapAdapter } = mapRuntime;
mapInteractionService = mapRuntime.mapInteractionService;
vehicleAnimationService = mapRuntime.vehicleAnimationService;
routeService = mapRuntime.routeService;
driverService = mapRuntime.driverService;
flotaCarros = startRideApp({
  crearFlotaCarros,
  mapAdapter,
  iniciarMovimientoFlota,
  seleccionarModoMapa,
  actualizarPreciosPorRuta,
  renderizarOpcionesEstado,
  actualizarRutaReal,
  mapUi,
  actualizarPuntoMapa,
  getModoMapa: () => modoMapa,
  registerGlobalListeners,
  inputOrigen,
  inputDestino,
  paymentDropdown,
  ratingModal,
  cerrarMetodoPago,
  cerrarModalCalificacion,
  seleccionarCalificacion
});

function registrarModulosUi() {
  ({
    fareUi,
    rideEventService,
    eventButtonsUi,
    statePanelUi,
    ratingUi,
    paymentUi,
    rideFlowService
  } = createRideAppModules({
    createFareUi,
    createRideEventService,
    createEventButtonsUi,
    createStatePanelUi,
    createRatingUi,
    createPaymentUi,
    createRideFlowService,
    fareOptions,
    fareRouteText,
    precioMapa,
    resumenRuta,
    tiposViaje,
    estadoDescripcion,
    cancelEventBtn,
    changeDestinationEventBtn,
    emergencyEventBtn,
    refundEventBtn,
    estadoPaso,
    stateOptions,
    backStateBtn,
    estadosPrincipales,
    estadosAlternos,
    estadosTerminales,
    ratingModal,
    ratingStars,
    ratingError,
    paymentDropdown,
    selectedPaymentText,
    paymentDecisionModal,
    paymentDecisionText,
    metodosPago,
    PagoStrategy,
    inputOrigen,
    inputDestino,
    getRutaInfo: () => rutaInfo,
    getTipoViajeSeleccionado: () => tipoViajeSeleccionado,
    setTipoViajeSeleccionado: valor => {
      tipoViajeSeleccionado = valor;
    },
    getEstadoActual: () => estadoActual,
    setRecalculoDestinoEnCurso: valor => {
      recalculoDestinoEnCurso = valor;
    },
    detenerFlujo,
    cambiarEstado,
    seleccionarModoMapa,
    getComando: nombre => rideCommandService?.getComando(nombre),
    getHistorialEstadosLength: () => historialEstados.length,
    getRutaCalculando: () => rutaCalculando,
    getFlujoActivo: () => flujoActivo,
    getRutaPorCallesDisponible: () => rutaPorCallesDisponible,
    getPagoProcesadoConfirmado: () => pagoProcesadoConfirmado,
    getCalificacionEnviada: () => calificacionEnviada,
    obtenerIndiceEstado,
    obtenerPoliticaRegreso,
    puedeRegresarEstado,
    actualizarBotonesEventos,
    abrirModalProcesarPago,
    reintentarProcesarPago,
    abrirModalCalificacion,
    calcularPrecioFinal,
    avanzarEstadoManual,
    marcarPedidoSinConductor,
    expirarPedido,
    cancelarPorConductor,
    marcarNoShow,
    getCalificacionCliente: () => calificacionCliente,
    setCalificacionCliente: valor => {
      calificacionCliente = valor;
    },
    setCalificacionEnviada: valor => {
      calificacionEnviada = valor;
    },
    setFlujoActivo: valor => {
      flujoActivo = valor;
    },
    setIndiceFlujo: valor => {
      indiceFlujo = valor;
    },
    getMetodoPagoSeleccionado: () => metodoPagoSeleccionado,
    setMetodoPagoSeleccionado: valor => {
      metodoPagoSeleccionado = valor;
    },
    setPagoProcesadoConfirmado: valor => {
      pagoProcesadoConfirmado = valor;
    },
    obtenerDescripcionEstado,
    getIndiceFlujo: () => indiceFlujo,
    getConductorAsignado: () => conductorAsignado,
    getOrigenCoords: () => origenCoords,
    setProgresoCarro: valor => {
      progresoCarro = valor;
    },
    setIntervaloFlujo: valor => {
      intervaloFlujo = valor;
    },
    cerrarMetodoPago,
    detenerAnimacionCarro,
    liberarConductorAsignado,
    cerrarModalProcesarPago,
    cerrarModalCalificacion,
    asignarConductorMasCercano,
    moverCarroAPunto,
    moverCarroEnRuta
  }));
}

// Limpieza al salir: cancelar animaciones y timers activos.
registerLifecycleCleanup({
  getAnimacionFlotaId: () => animacionFlotaId,
  getAnimacionCarroId: () => animacionCarroId,
  detenerIntervalo: () => rideFlowService?.detenerIntervalo()
});

// Handlers publicos necesarios para compatibilidad con onclick inline.
exposePublicApi({
  iniciarFlujo,
  limpiarCampo,
  seleccionarModoMapa,
  toggleMetodoPago,
  seleccionarMetodoPago,
  decidirProcesarPago,
  reintentarProcesarPago,
  solicitarCancelacion,
  solicitarCambioDestino,
  solicitarEmergencia,
  solicitarReembolso,
  regresarEstado,
  abrirModalCalificacion,
  enviarCalificacion,
  seleccionarCalificacion,
  abrirModalProcesarPago
});

})(); // end IIFE
