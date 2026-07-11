<template>

    <section>
        <div class="card text-bg-dark border-0">
            <div class="card-img-overlay d-flex align-items-center rounded-0" style="background: radial-gradient(circle,rgba(0, 0, 0, 0.25) 25%, rgba(0, 0, 0, .9) 100%); z-index: 999;">
                <div class="w-100 p-2 p-sm-5">
                    <div class="container">
                        <div class="text-center">
                            <div class="row justify-content-center">                                
                                <h1 class="display-4 h1 lh-1 mt-5 mb-3">¿Tenés ganas de jugar hoy? <br class="d-none d-sm-block">Acá se arma el equipo</h1>
                                <div class="col-lg-6">
                                    <p class="m-0">Creá partidos de vóley, fútbol, básquet, handball o hockey en segundos. <strong>Compartís un link, los jugadores se inscriben y todos a jugar</strong></p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-img d-none d-lg-block">
            
                <swiper v-bind="swiperOpts">
                    <swiper-slide v-for="heroImageDesktop in heroImagesDesktop" :key="heroImageDesktop.id">

                        <img :src="heroImageDesktop.url" class="w-100 vh-100 img-cover">
                        
                    </swiper-slide>
                </swiper>
            
            </div>

            <div class="card-img d-block d-lg-none">
            
                <swiper v-bind="swiperOpts">
                    <swiper-slide v-for="heroImageMobile in heroImagesMobile" :key="heroImageMobile.id">

                        <img :src="heroImageMobile.url" class="w-100 vh-100 img-cover">
                        
                    </swiper-slide>
                </swiper>
            
            </div>
        </div>
    </section>

</template>

<script setup>

    import { ref } from 'vue'
    import { useAuthStore } from '@/features/auth/stores/auth.store'

    const authStore = useAuthStore()

    import volley_desktop from '@/assets/images/hero/desktop/volley.webp';
    import soccer_desktop from '@/assets/images/hero/desktop/soccer.webp';
    import basket_desktop from '@/assets/images/hero/desktop/basket.webp';
    import handball_desktop from '@/assets/images/hero/desktop/handball.webp';
    import hockey_desktop from '@/assets/images/hero/desktop/hockey.webp';

    import volley_mobile from '@/assets/images/hero/mobile/volley.webp';
    import soccer_mobile from '@/assets/images/hero/mobile/soccer.webp';
    import basket_mobile from '@/assets/images/hero/mobile/basket.webp';
    import handball_mobile from '@/assets/images/hero/mobile/handball.webp';
    import hockey_mobile from '@/assets/images/hero/mobile/hockey.webp';

    const heroImagesDesktop = ref([
        { id: 1, url: volley_desktop }, 
        { id: 2, url: soccer_desktop }, 
        { id: 3, url: basket_desktop }, 
        { id: 4, url: handball_desktop }, 
        { id: 5, url: hockey_desktop }
    ])

    const heroImagesMobile = ref([
        { id: 1, url: volley_mobile }, 
        { id: 2, url: soccer_mobile }, 
        { id: 3, url: basket_mobile }, 
        { id: 4, url: handball_mobile }, 
        { id: 5, url: hockey_mobile }
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
            delay: 2000,            
            disableOnInteraction: false,
            pauseOnMouseEnter: false,   
        },
    }
    

</script>