<template>

    <div 
        :id="`matchPlayerRegistrationListItemModal-${player.id}`" 
        class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body bg-g8 text-light p-5">
                    <div class="text-end mb-2">
                        <button type="button" class="btn btn-outline-light btn-sm" data-bs-dismiss="modal">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <h5 class="opacity-75 mb-2">{{ player.matchPlayerName }}</h5>
                    <div class="row align-items-center">
                        <div class="col-8">
                            <h1 class="m-0">{{ player.matchPlayerPhone }}</h1>
                        </div>
                        <div class="col-4">
                            <div class="btn-group w-100">
                                <button 
                                    class="btn btn-outline-light" 
                                    type="button"
                                    @click="copyPlayerPhone(player.matchPlayerPhone)"
                                    title="Copiar teléfono">
                                    <i class="bi bi-copy"></i>
                                </button>
                                <button 
                                    class="btn btn-outline-light" 
                                    type="button"
                                    title="Enviar mensaje vía WhatsApp">
                                        <i class="bi bi-whatsapp"></i>
                                </button>
                                <button 
                                    class="btn btn-outline-light" 
                                    type="button"
                                    title="Llamar">
                                        <i class="bi bi-telephone-fill"></i>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>

    import Swal from 'sweetalert2'

    const props = defineProps({
        player: {
            type: Object,
            required: true
        },
    })

    /************************************* */

    const copyPlayerPhone = async (playerPhone) => {

        await navigator.clipboard.writeText(playerPhone)

        await Swal.fire({
            icon: 'success',
            title: 'Teléfono copiado',
            timer: 1200,
            showConfirmButton: false
        })

    }

</script>