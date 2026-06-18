<template>

    <section>
    
        <section>
            <div class="card text-bg-dark border-0">
                <div class="card-img-overlay d-flex align-items-center rounded-0" style="background: radial-gradient(circle,rgba(0, 0, 0, 0.5) 50%, rgba(0, 0, 0, 1) 100%); z-index: 999;">
                    <div class="w-100 p-3 p-sm-5">
                        <div class="container">
                            <div class="text-center">
                                <div class="row justify-content-center">                                
                                    <h1 class="display-4 h1 lh-1 mt-5 mb-3">¿Tenés ganas de jugar hoy? <br>Acá se arma el equipo</h1>
                                    <div class="col-lg-7">
                                        <p class="lead opacity-75 m-0">Creá partidos de vóley, fútbol, básquet, handball o hockey en segundos. <strong>Compartís un link, los jugadores se inscriben y todos a jugar</strong></p>
                                        
                                        <div v-if="!authStore.isAuthenticated">
                                            <router-link class="btn btn-light rounded-pill ps-4 pe-5 mt-5" to="/login">
                                                <i class="bi bi-person-fill opacity-75 me-1"></i> Ingresar como entrenador <i class="bi bi-chevron-right ms-1"></i>
                                            </router-link>
                                        </div>

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="card-img">
                
                    <swiper v-bind="swiperOpts">
                        <swiper-slide v-for="heroImage in heroImages" :key="heroImage.id">

                            <img :src="heroImage.url" class="w-100 vh-100 img-cover">
                            
                        </swiper-slide>
                    </swiper>
                
                </div>
            </div>
        </section>

    </section>

</template>

<script setup>

    import { ref } from 'vue'
    import { useAuthStore } from '@/features/auth/stores/auth.store'

    const authStore = useAuthStore()

    import volley from '@/assets/images/hero/volley.webp';
    import soccer from '@/assets/images/hero/soccer.webp';
    import basket from '@/assets/images/hero/basket.webp';
    import handball from '@/assets/images/hero/handball.webp';
    import hockey from '@/assets/images/hero/hockey.webp';

    const heroImages = ref([
        { id: 1, url: volley }, 
        { id: 2, url: soccer }, 
        { id: 3, url: basket }, 
        { id: 4, url: handball }, 
        { id: 5, url: hockey }
    ])

    /*
    * Swiperjs Carousel
    */

    import { Swiper, SwiperSlide } from 'swiper/vue';
    import { Autoplay, EffectFade } from 'swiper/modules'

    import 'swiper/css';
    import 'swiper/css/effect-fade';

    const swiperOpts = {
        modules: [Autoplay, EffectFade],
        loop: true,
        effect: 'fade',
        fadeEffect: { crossFade: true },
        speed: 800,
        loop: true,
        autoplay: {
            delay: 3000,            
            disableOnInteraction: false,
            pauseOnMouseEnter: false,   
        },
    }
    

</script>