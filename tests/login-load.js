import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
    stages: [
        { duration: '20s', target: 5 },
        { duration: '20s', target: 10 },
        { duration: '20s', target: 20 },
        { duration: '20s', target: 30 },
        { duration: '20s', target: 40 },
        { duration: '20s', target: 50 },
        { duration: '20s', target: 0 },
    ],
    thresholds: {
        http_req_duration: ['p(95)<2000'],
        http_req_failed: ['rate<0.05'],
    },
};

export default function () {
    const res = http.post(
        'http://localhost:8080/auth/login',
        JSON.stringify({
            correo_usuario: 'usuario@test.com',
            password_u: '123456',
        }),
        {
            headers: {
                'Content-Type': 'application/json',
            },
        }
    );

    check(res, {
        'status 200': (r) => r.status === 200,
    });

    sleep(1);
}