<template>

    <section class="py-5">
        <div class="container">
            <h1 class="h2">Crear Partido</h1>
            <hr class="mb-4">

            <div class="bg-light text-dark box-shadow p-3 p-sm-5">
                <form novalidate>

                    <h2 class="h5"><i class="bi bi-house-fill opacity-50 me-1"></i> Actividad y Dirección</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <div class="col-3">
                            <label class="h6">Actividad *</label>
                            <select class="form-select" required>
                                <option selected>Seleccionar</option>
                                <option value="1">Voley</option>
                                <option value="2">Fútbol</option>
                                <option value="3">Básquet</option>
                                <option value="4">Handball</option>
                                <option value="5">Hockey</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label class="h6">Lugar *</label>
                            <input type="text" class="form-control" placeholder="Lugar" required>
                        </div>
                        <div class="col-6">
                            <label class="h6">Dirección *</label>
                            <input type="text" class="form-control" placeholder="Dirección" required>
                        </div>
                    </div>

                    <h2 class="h5 mt-5"><i class="bi bi-calendar3-fill opacity-50 me-1"></i> Fecha y Hora</h2>
                    <hr class="mb-4">
                    <div class="row g-3">
                        <div class="col-4">
                            <label class="h6">Comienzo *</label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Fecha" required>
                                <input type="text" class="form-control" placeholder="Hora" required>
                            </div>
                            
                        </div>
                        <div class="col-4">
                            <label class="h6">Finalización *</label>
                            <div class="input-group">
                                <input type="text" class="form-control" placeholder="Fecha" required>
                                <input type="text" class="form-control" placeholder="Hora" required>
                            </div>
                        </div>
                    </div>

                    <h2 class="h5 mt-5"><i class="bi bi-info-circle-fill opacity-50 me-1"></i> Sobre el Partido</h2>
                    <hr class="mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-3">
                            <label class="h6">Cantidad mínima <br>de jugadores *</label>
                            <input type="text" class="form-control" placeholder="Mínimo" required>
                        </div>
                        <div class="col-3">
                            <label class="h6">Cantidad máxima <br>de jugadores *</label>
                            <input type="text" class="form-control" placeholder="Máximo" required>
                        </div>
                        <div class="col-3">
                            <label class="h6">Tipo *</label>
                            <select class="form-select" required>
                                <option selected>Seleccionar</option>
                                <option value="1">Recreativo</option>
                                <option value="2">Competitivo</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label class="h6">Genero/s *</label>
                            <select class="form-select" required>
                                <option selected>Seleccionar</option>
                                <option value="1">Masculino</option>
                                <option value="2">Femenino</option>
                                <option value="3">Mixto</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label class="h6">Nivel *</label>
                            <select class="form-select" required>
                                <option selected>Seleccionar</option>
                                <option value="1">Principiante</option>
                                <option value="2">Intermedio</option>
                                <option value="3">Avanzado</option>
                            </select>
                        </div>
                        <div class="col-3">
                            <label class="h6">Edad mínima <br>de los jugadores *</label>
                            <input type="text" class="form-control" placeholder="Mínimo" required>
                        </div>
                        <div class="col-3">
                            <label class="h6">Edad máxima <br>de los jugadores *</label>
                            <input type="text" class="form-control" placeholder="Máximo" required>
                        </div>
                    </div>

                    <h2 class="h5 mt-5"><i class="bi bi-link-45deg opacity-50 me-1"></i> Accesos al Partido</h2>
                    <hr class="mb-4">
                    <div class="row g-3 align-items-end">
                        <div class="col-6">
                            <label class="h6">URL *</label>
                            <input type="text" class="form-control" placeholder="URL" required>
                        </div>
                        <div class="col-4">
                            <label class="h6">Pin de Acceso *</label>
                            <div class="input-group">
                                <button class="btn btn-secondary" type="button">Generar Pin</button>
                                <input type="text" class="form-control" placeholder="Pin" readonly required>
                            </div>
                        </div>
                    </div>

                    <p class="small opacity-75 my-3">(*) Datos requeridos</p>

                    <div class="text-center">
                        <!-- Mostrar un spiner mientras se procesa el loging -->
                        <button class="btn btn-primary rounded-pill px-5 py-2" type="submit" :disabled="loading">

                            <template v-if="loading">
                                <span class="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                                Creando...
                            </template>

                            <template v-else>
                                <i class="bi bi-check-circle-fill opacity-75 me-1"></i> Crear Partido
                            </template>

                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>

</template>