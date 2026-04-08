import http from 'k6/http';
import { check, sleep, group } from 'k6';

export const options = {
    stages: [
        { duration: '30s', target: 10 },
        { duration: '30s', target: 25 },
        { duration: '30s', target: 50 },
        { duration: '30s', target: 75 },
        { duration: '30s', target: 100 },
        { duration: '30s', target: 0 },
    ],
    thresholds: {
        http_req_failed: ['rate<0.05'],
        http_req_duration: ['p(95)<2000'],
    },
};

export default function () {
    group('home - tipos principales', () => {
        const tipos = http.get('http://localhost:8080/tipos');

        check(tipos, {
            'tipos home 200 o 304': (r) => r.status === 200 || r.status === 304,
        });
    });

    group('municipio - salento', () => {
        const tiposMunicipio = http.get(
            'http://localhost:8080/tipos/por-ubicacion/salento'
        );

        check(tiposMunicipio, {
            'tipos municipio 200 o 304': (r) => r.status === 200 || r.status === 304,
        });
    });

    group('establecimientos por categoria', () => {
        const establecimientos = http.get(
            'http://localhost:8080/establecimientos/salento/tipo/5'
        );

        check(establecimientos, {
            'establecimientos 200': (r) => r.status === 200,
        });
    });

    group('detalle establecimiento', () => {
        const resenas = http.get(
            'http://localhost:8080/establecimientos/5/resenas'
        );

        const imagenes = http.get(
            'http://localhost:8080/imagenes/lugares/5/imagenes'
        );

        /*
        const visualizacion = http.post(
            'http://localhost:8080/recomendaciones/registrar-visualizacion',
            JSON.stringify({
                establecimiento_id: 5,
            }),
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );
        */

        check(resenas, {
            'resenas 200': (r) => r.status === 200,
        });

        check(imagenes, {
            'imagenes 200 o 304': (r) => r.status === 200 || r.status === 304,
        });

        /*
        check(visualizacion, {
            'visualizacion 201': (r) => r.status === 201,
        });
        */
    });

    sleep(1)
}