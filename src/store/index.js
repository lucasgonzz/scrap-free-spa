import Vue from 'vue'
import Vuex from 'vuex'


import auth from '@/common-vue/store/auth'
import employee from '@/common-vue/store/employee'
import permission from '@/common-vue/store/permission'
import general from '@/common-vue/store/general'
import download_resources from '@/common-vue/store/download_resources'
import error from '@/common-vue/store/error'

import siniestro from '@/store/siniestro'
import aseguradora from '@/store/aseguradora'
import causa_siniestro from '@/store/causa_siniestro'
import estado_general_siniestro from '@/store/estado_general_siniestro'
import estado_siniestro from '@/store/estado_siniestro'
import localidad from '@/store/localidad'
import provincia from '@/store/provincia'
import tipo_orden_de_servicio from '@/store/tipo_orden_de_servicio'
import gestor_scrap_free from '@/store/gestor_scrap_free'
import gestor_aseguradora from '@/store/gestor_aseguradora'
import unidad_negocio from '@/store/unidad_negocio'
import bien from '@/store/bien'
import causa_bien from '@/store/causa_bien'
import estado_bien from '@/store/estado_bien'
import linea from '@/store/linea'
import sub_linea from '@/store/sub_linea'
import tecnico_asegurado from '@/store/tecnico_asegurado'
import tecnico_scrap_free from '@/store/tecnico_scrap_free'
import logistica from '@/store/logistica'
import cobertura from '@/store/cobertura'
import poliza from '@/store/poliza'
import tipo_producto_de_seguro from '@/store/tipo_producto_de_seguro'
import ramo from '@/store/ramo'
import asegurado from '@/store/asegurado'
import honorario_liquidacion from '@/store/honorario_liquidacion'
import transportista from '@/store/transportista'
import tipo_documento from '@/store/tipo_documento'
import centro_reparacion from '@/store/centro_reparacion'
import nota_importante from '@/store/nota_importante'
import color_siniestro from '@/store/color_siniestro'
import siniestro_metricas from '@/store/siniestro_metricas/index' 
import amortizacion from '@/store/amortizacion' 
import liquidacion from '@/store/liquidacion' 

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        auth,
        employee,
        permission,
        general,
        download_resources,
        error,
        
        siniestro,
        aseguradora,
        causa_siniestro,
        estado_general_siniestro,
        estado_siniestro,
        localidad,
        provincia,
        tipo_orden_de_servicio,
        gestor_scrap_free,
        gestor_aseguradora,
        unidad_negocio,
        bien,
        causa_bien,
        estado_bien,
        linea,
        sub_linea,
        tecnico_asegurado,
        tecnico_scrap_free,
        logistica,
        cobertura,
        poliza,
        tipo_producto_de_seguro,
        ramo,
        asegurado,
        honorario_liquidacion,
        transportista,
        tipo_documento,
        centro_reparacion,
        nota_importante,
        color_siniestro,
        siniestro_metricas,
        amortizacion,
        liquidacion,
    }
})
