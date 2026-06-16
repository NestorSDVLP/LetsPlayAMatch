<template>

    <section>
    
        <section class="py-5">
            <div class="container">
                <div class="card text-bg-dark box-shadow">
                    <div class="card-img-overlay d-flex align-items-end rounded-0" style="background: rgba(0,0,0,.4); z-index: 999;">
                        <div class="w-100 p-3 p-sm-5">
                            <div class="row justify-content-center">
                                <div class="col-lg-8 text-center">
                                    <h1 class="display-5 h1 lh-1 mb-3">¿Tenés ganas de jugar hoy? <br>Acá se arma el equipo</h1>
                                    <p class="opacity-75 m-0">Creá partidos de vóley, fútbol, básquet, handball o hockey en segundos.<br><strong>Compartís un link, confirman todos y vas a jugar</strong></p>
                                    
                                    <div v-if="!authStore.isAuthenticated">
                                        <router-link class="btn btn-primary rounded-pill px-5 mt-4" to="/login">Ingresar como entrenador <i class="bi bi-chevron-right"></i></router-link>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="card-img">
                    
                        <swiper v-bind="swiperOpts">
                            <swiper-slide v-for="heroImage in heroImages" :key="heroImage.id">

                                <img :src="heroImage.url" class="w-100">
                                
                            </swiper-slide>
                        </swiper>
                    
                    </div>
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
            delay: 6000,            
            disableOnInteraction: false,
            pauseOnMouseEnter: false,   
        },
    }
    

</script>