<template>

    <div 
        :id="`matchPlayerRegistrationListItemModal-${player.id}`" 
        class="modal fade" tabindex="-1">
        <div class="modal-dialog modal-dialog-centered">
            <div class="modal-content">
                <div class="modal-body bg-g8 text-light box-shadow px-5 pt-4 pb-5">
                    <div class="text-end">
                        <button type="button" class="btn btn-dark btn-sm" data-bs-dismiss="modal">
                            <i class="bi bi-x-lg"></i>
                        </button>
                    </div>
                    <p class="fs-10 opacity-75 mb-1">{{ player.matchPlayerName }}</p>
                    <div class="row g-0 align-items-center">
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

                                <a
                                    class="btn btn-outline-light"
                                    :href="whatsappUrl(player.matchPlayerPhone)"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    title="Enviar mensaje vía WhatsApp">
                                    <i class="bi bi-whatsapp"></i>
                                </a>

                                <a
                                    class="btn btn-outline-light"
                                    :href="phoneUrl(player.matchPlayerPhone)"
                                    title="Llamar">
                                    <i class="bi bi-telephone-fill"></i>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>


    import { normalizeWhatsappPhone } from '@/features/matches/utils/matches.phone.utils'

    import Swal from 'sweetalert2'

    const props = defineProps({
        player: {
            type: Object,
            required: true
        },
    })

    /************************************* */

    const copyPlayerPhone = async (playerPhone) => {

        if (!playerPhone)
            return

        await navigator.clipboard.writeText(playerPhone)

        await Swal.fire({
            icon: 'success',
            title: 'Teléfono copiado',
            timer: 1200,
            showConfirmButton: false
        })

    }

    /************************************* */

    function phoneUrl(phone) {

        return `tel:${phone.replace(/\D/g, '')}`

    }

    /************************************* */


    function whatsappUrl(phone) {

        if (!phone)
            return '#'

        return `https://wa.me/${normalizeWhatsappPhone(phone)}`

    }

</script>